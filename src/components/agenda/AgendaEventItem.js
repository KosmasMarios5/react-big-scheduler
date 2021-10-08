import React from 'react'
import {PropTypes} from 'prop-types'
import Popover from 'antd/lib/popover'
import 'antd/lib/popover/style/index.css'
import EventItemPopover from '../eventItem/EventItemPopover'

const AgendaEventItem = props => {
    const {eventItem, isStart, isEnd, eventItemClick, eventItemTemplateResolver} = props;
    const {config,behaviors} = props;
    let roundCls = isStart ? (isEnd ? 'round-all' : 'round-head') : (isEnd ? 'round-tail' : 'round-none');
    let bgColor = config.defaultEventBgColor;
    if (!!eventItem.bgColor)
        bgColor = eventItem.bgColor;

    let titleText = behaviors.getEventTextFunc(eventItem);
    let content = (
        <EventItemPopover
            {...props}
            title={eventItem.title}
            startTime={eventItem.start}
            endTime={eventItem.end}
            statusColor={bgColor}
        />
    );

    let eventItemTemplate = (
        <div className={roundCls + ' event-item'} key={eventItem.id}
             style={{height: config.eventItemHeight, maxWidth: config.agendaMaxEventWidth, backgroundColor: bgColor}}>
            <span style={{marginLeft: '10px', lineHeight: `${config.eventItemHeight}px`}}>{titleText}</span>
        </div>
    );
    if (typeof eventItemTemplateResolver !== "undefined")
        eventItemTemplate = eventItemTemplateResolver(eventItem, bgColor, isStart, isEnd, 'event-item', config.eventItemHeight, config.agendaMaxEventWidth);

    return (config.eventItemPopoverEnabled ?
            <Popover placement="bottomLeft" content={content} trigger="hover">
                <a className="day-event" onClick={() => {
                    if (!!eventItemClick) eventItemClick(eventItem);
                }}>
                    {eventItemTemplate}
                </a>
            </Popover> :
            <span>
                    <a className="day-event" onClick={() => {
                        if (!!eventItemClick) eventItemClick(eventItem);
                    }}>
                        {eventItemTemplate}
                    </a>
                </span>
    );
};

AgendaEventItem.propTypes = {
    eventItem: PropTypes.object.isRequired,
    isStart: PropTypes.bool.isRequired,
    isEnd: PropTypes.bool.isRequired,
    subtitleGetter: PropTypes.func,
    eventItemClick: PropTypes.func,
    viewEventClick: PropTypes.func,
    viewEventText:PropTypes.string,
    viewEvent2Click: PropTypes.func,
    viewEvent2Text: PropTypes.string,
    eventItemTemplateResolver: PropTypes.func,
}

export default AgendaEventItem