import React from 'react'
import {PropTypes} from 'prop-types'
import AgendaEventItem from './AgendaEventItem'
import {DATE_FORMAT} from "../../index";

const AgendaResourceEvents = props => {
    const {resourceEvents, slotClickedFunc, slotItemTemplateResolver} = props;
    const {startDate, endDate, config, localeMoment, resourceTableWidth} = props;
    let width = resourceTableWidth - 2;

    let events = [];
    resourceEvents.headerItems.forEach((item) => {
        let start = localeMoment(startDate).format(DATE_FORMAT),
            end = localeMoment(endDate).add(1, 'days').format(DATE_FORMAT),
            headerStart = localeMoment(item.start).format(DATE_FORMAT),
            headerEnd = localeMoment(item.end).format(DATE_FORMAT);

        if (start === headerStart && end === headerEnd) {
            item.events.forEach((evt) => {
                let durationStart = localeMoment(startDate);
                let durationEnd = localeMoment(endDate).add(1, 'days');
                let eventStart = localeMoment(evt.eventItem.start);
                let eventEnd = localeMoment(evt.eventItem.end);
                let isStart = eventStart >= durationStart;
                let isEnd = eventEnd < durationEnd;
                let eventItem = <AgendaEventItem
                    {...props}
                    key={evt.eventItem.id}
                    eventItem={evt.eventItem}
                    isStart={isStart}
                    isEnd={isEnd}
                />;
                events.push(eventItem);
            });
        }
    });

    let a = typeof slotClickedFunc !== "undefined" ? <a onClick={() => {
            slotClickedFunc(resourceEvents);
        }}>{resourceEvents.slotName}</a>
        : <span>{resourceEvents.slotName}</span>;
    let slotItem = (
        <div style={{width: width}} title={resourceEvents.slotName} className="overflow-text header2-text">
            {a}
        </div>
    );
    if (!!slotItemTemplateResolver) {
        let temp = slotItemTemplateResolver(resourceEvents, slotClickedFunc, width, "overflow-text header2-text");
        if (!!temp)
            slotItem = temp;
    }

    return (
        <tr style={{minHeight: config.eventItemLineHeight + 2}}>
            <td data-resource-id={resourceEvents.slotId}>
                {slotItem}
            </td>
            <td>
                <div className="day-event-container">
                    {events}
                </div>
            </td>
        </tr>
    );
};

AgendaResourceEvents.propTypes = {
    resourceEvents: PropTypes.object.isRequired,
    subtitleGetter: PropTypes.func,
    eventItemClick: PropTypes.func,
    viewEventClick: PropTypes.func,
    viewEventText: PropTypes.string,
    viewEvent2Click: PropTypes.func,
    viewEvent2Text: PropTypes.string,
    slotClickedFunc: PropTypes.func,
    slotItemTemplateResolver: PropTypes.func
}

export default AgendaResourceEvents
