import React, {useState} from 'react'
import {PropTypes} from 'prop-types'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Icon from 'antd/lib/icon'
import 'antd/lib/grid/style/index.css'
import DnDSource from './DnDSource'


const AddMorePopover = props => {
    const {headerItem, left, top, height, closeAction} = props;
    const {config, localeMoment} = props;
    const {time, start, end, events} = headerItem;
    let header = localeMoment(time).format(config.addMorePopoverHeaderFormat);
    let durationStart = localeMoment(start);
    let durationEnd = localeMoment(end);
    let eventList = [];
    let i = 0;
    events.forEach((evt) => {
        if (typeof evt !== "undefined") {
            i++;
            let eventStart = localeMoment(evt.eventItem.start);
            let eventEnd = localeMoment(evt.eventItem.end);
            let isStart = eventStart >= durationStart;
            let isEnd = eventEnd < durationEnd;
            let eventItemLeft = 10;
            let eventItemWidth = 138;
            let eventItemTop = 12 + i * config.eventItemLineHeight;
            let eventItem = <DnDSource
                {...props}
                key={evt.eventItem.id}
                eventItem={evt.eventItem}
                leftIndex={0}
                isInPopover={true}
                isStart={isStart}
                isEnd={isEnd}
                rightIndex={1}
                left={eventItemLeft}
                width={eventItemWidth}
                top={eventItemTop}
            />
            eventList.push(eventItem);
        }
    });

    return (
        <div className="add-more-popover-overlay" style={{left: left, top: top, height: height, width: '170px'}}>
            <Row type="flex" justify="space-between" align="middle">
                <Col span="22">
                    <span className="base-text">{header}</span>
                </Col>
                <Col span="2">
                    <span onClick={() => {
                        closeAction(undefined);
                    }}><Icon type="cross"/></span>
                </Col>
            </Row>
            {eventList}
        </div>
    );
};

AddMorePopover.propTypes = {
    headerItem: PropTypes.object.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    closeAction: PropTypes.func.isRequired,
    subtitleGetter: PropTypes.func,
    moveEvent: PropTypes.func,
    eventItemClick: PropTypes.func,
    viewEventClick: PropTypes.func,
    viewEventText: PropTypes.string,
    viewEvent2Click: PropTypes.func,
    viewEvent2Text: PropTypes.string,
    eventItemTemplateResolver: PropTypes.func,
}
export default AddMorePopover