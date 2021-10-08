import React from 'react'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import 'antd/lib/grid/style/index.css'
import {PropTypes} from "prop-types";

const EventItemPopover = props => {
    const {
        eventItem,
        title,
        startTime,
        endTime,
        statusColor,
        subtitleGetter,
        viewEventClick,
        viewEventText,
        viewEvent2Click,
        viewEvent2Text,
        eventItemPopoverTemplateResolver
    } = props;
    const {localeMoment, config} = props;
    let start = localeMoment(startTime), end = localeMoment(endTime);

    if (typeof eventItemPopoverTemplateResolver !== "undefined") {
        return eventItemPopoverTemplateResolver(eventItem, title, start, end, statusColor);
    } else {
        let subtitleRow = <div/>;
        if (typeof subtitleGetter !== "undefined") {
            let subtitle = subtitleGetter(eventItem);
            if (typeof subtitle !== "undefined") {
                subtitleRow = (
                    <Row type="flex" align="middle">
                        <Col span={2}>
                            <div/>
                        </Col>
                        <Col span={22} className="overflow-text">
                            <span className="header2-text" title={subtitle}>{subtitle}</span>
                        </Col>
                    </Row>
                );
            }
        }

        let opsRow = <div/>;
        if (typeof viewEventText !== "undefined" && typeof viewEventClick !== "undefined" && (typeof eventItem.clickable1 === "undefined" || eventItem.clickable1)) {
            let col = (
                <Col span={22}>
                    <span className="header2-text" style={{color: '#108EE9', cursor: 'pointer'}} onClick={() => {
                        viewEventClick(eventItem);
                    }}>{viewEventText}</span>
                </Col>
            );
            if (typeof viewEvent2Text !== "undefined" && typeof viewEvent2Click !== "undefined" && (typeof eventItem.clickable2 === "undefined" || eventItem.clickable2)) {
                col = (
                    <Col span={22}>
                        <span className="header2-text" style={{color: '#108EE9', cursor: 'pointer'}} onClick={() => {
                            viewEventClick(eventItem);
                        }}>{viewEventText}</span><span className="header2-text"
                                                       style={{color: '#108EE9', cursor: 'pointer', marginLeft: '16px'}}
                                                       onClick={() => {
                                                           viewEvent2Click(eventItem);
                                                       }}>{viewEvent2Text}</span>
                    </Col>
                )
            }
            opsRow = (
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div/>
                    </Col>
                    {col}
                </Row>
            );
        } else if (typeof viewEvent2Text !== "undefined" && typeof viewEvent2Click !== "undefined" && (typeof eventItem.clickable2 === "undefined" || eventItem.clickable2)) {
            let col = (
                <Col span={22}>
                    <span className="header2-text" style={{color: '#108EE9', cursor: 'pointer'}} onClick={() => {
                        viewEvent2Click(eventItem);
                    }}>{viewEvent2Text}</span>
                </Col>
            );
            opsRow = (
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div/>
                    </Col>
                    {col}
                </Row>
            );
        }

        let dateFormat = config.eventItemPopoverDateFormat;
        return (
            <div style={{width: '300px'}}>
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div className="status-dot" style={{backgroundColor: statusColor}}/>
                    </Col>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" title={title}>{title}</span>
                    </Col>
                </Row>
                {subtitleRow}
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div/>
                    </Col>
                    <Col span={22}>
                        <span className="header1-text">{start.format('HH:mm')}</span><span className="help-text"
                                                                                           style={{marginLeft: '8px'}}>{start.format(dateFormat)}</span><span
                        className="header2-text" style={{marginLeft: '8px'}}>-</span><span className="header1-text"
                                                                                           style={{marginLeft: '8px'}}>{end.format('HH:mm')}</span><span
                        className="help-text" style={{marginLeft: '8px'}}>{end.format(dateFormat)}</span>
                    </Col>
                </Row>
                {opsRow}
            </div>
        );
    }
};

EventItemPopover.propTypes = {
    eventItem: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    statusColor: PropTypes.string.isRequired,
    subtitleGetter: PropTypes.func,
    viewEventClick: PropTypes.func,
    viewEventText: PropTypes.string,
    viewEvent2Click: PropTypes.func,
    viewEvent2Text: PropTypes.string,
    eventItemPopoverTemplateResolver: PropTypes.func
}

export default EventItemPopover
