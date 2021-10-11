import React from 'react'
import {PropTypes} from 'prop-types'

const AgendaEventItem = props => {
    const {eventItem, isStart, isEnd, eventItemClick, eventItemTemplateResolver} = props;
    const {config, behaviors} = props;
    let roundCls = isStart ? (isEnd ? 'round-all' : 'round-head') : (isEnd ? 'round-tail' : 'round-none');
    let bgColor = config.defaultEventBgColor;
    if (!!eventItem.bgColor)
        bgColor = eventItem.bgColor;

    let titleText = behaviors.getEventTextFunc(eventItem);

    let eventItemTemplate = (
        <div className={roundCls + ' rbc-event'} key={eventItem.id}
             style={{maxWidth: config.agendaMaxEventWidth, backgroundColor: bgColor}}>
            <span>{titleText}</span>
        </div>
    );
    if (typeof eventItemTemplateResolver !== "undefined")
        eventItemTemplate = eventItemTemplateResolver(eventItem, bgColor, isStart, isEnd, 'event-item', config.eventItemHeight, config.agendaMaxEventWidth);

    return (
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
    viewEventText: PropTypes.string,
    viewEvent2Click: PropTypes.func,
    viewEvent2Text: PropTypes.string,
    eventItemTemplateResolver: PropTypes.func,
}

export default AgendaEventItem