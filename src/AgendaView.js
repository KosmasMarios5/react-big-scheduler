import React from 'react'
import AgendaResourceEvents from './AgendaResourceEvents'
import {PropTypes} from "prop-types";

const AgendaView = props => {
    const {isEventPerspective, config, renderData, resourceTableWidth, tableHeaderHeight,} = props;
    let agendaResourceTableWidth = resourceTableWidth;
    let resourceEventsList = renderData.map((item) => {
        return <AgendaResourceEvents
            {...props}
            resourceEvents={item}
            key={item.slotId}/>
    });
    let resourceName = isEventPerspective ? config.taskName : config.resourceName;
    let agendaViewHeader = config.agendaViewHeader;

    return (
        <tr>
            <td>
                <table className="scheduler-table">
                    <thead>
                    <tr style={{height: tableHeaderHeight}}>
                        <th style={{width: agendaResourceTableWidth}} className="header3-text">{resourceName}</th>
                        <th className="header3-text">{agendaViewHeader}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {resourceEventsList}
                    </tbody>
                </table>
            </td>
        </tr>
    );
};

AgendaView.propTypes = {
    subtitleGetter: PropTypes.func,
    eventItemClick: PropTypes.func,
    viewEventClick: PropTypes.func,
    viewEventText: PropTypes.string,
    viewEvent2Click: PropTypes.func,
    viewEvent2Text: PropTypes.string,
    slotClickedFunc: PropTypes.func,
}

export default AgendaView