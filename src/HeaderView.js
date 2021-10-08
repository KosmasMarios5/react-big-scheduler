import React from 'react'
import {CellUnits} from './index_2'
import {PropTypes} from "prop-types";

const HeaderView = props => {
    const {headers, cellUnit, config, localeMoment, tableHeaderHeight,contentCellWidth,minuteStepsInHour} = props

    const {schedulerData, nonAgendaCellHeaderTemplateResolver} = props;
    let headerHeight = tableHeaderHeight;
    let cellWidth = contentCellWidth;

    let headerList = [];
    let style = {};
    if (cellUnit === CellUnits.Hour) {
        headers.forEach((item, index) => {
            if (index % minuteStepsInHour === 0) {
                let datetime = localeMoment(item.time);
                // const isCurrentTime = datetime.isSame(new Date(), 'hour');

                style = !!item.nonWorkingTime ? {
                    width: cellWidth * minuteStepsInHour,
                    color: config.nonWorkingTimeHeadColor,
                    backgroundColor: config.nonWorkingTimeHeadBgColor
                } : {width: cellWidth * minuteStepsInHour};

                if (index === headers.length - minuteStepsInHour)
                    style = !!item.nonWorkingTime ? {
                        color: config.nonWorkingTimeHeadColor,
                        backgroundColor: config.nonWorkingTimeHeadBgColor
                    } : {};

                let pFormattedList = config.nonAgendaDayCellHeaderFormat.split('|').map(item => datetime.format(item));
                let element;

                if (typeof nonAgendaCellHeaderTemplateResolver === 'function') {
                    element = nonAgendaCellHeaderTemplateResolver(schedulerData, item, pFormattedList, style)
                } else {
                    const pList = pFormattedList.map((item, index) => (
                        <div key={index}>{item}</div>
                    ));

                    element = (
                        <th key={item.time} className="header3-text" style={style}>
                            <div>
                                {pList}
                            </div>
                        </th>
                    );
                }

                headerList.push(element);
            }
        })
    } else {
        headerList = headers.map((item, index) => {
            let datetime = localeMoment(item.time);
            style = !!item.nonWorkingTime ? {
                width: cellWidth,
                color: config.nonWorkingTimeHeadColor,
                backgroundColor: config.nonWorkingTimeHeadBgColor
            } : {width: cellWidth};
            if (index === headers.length - 1)
                style = !!item.nonWorkingTime ? {
                    color: config.nonWorkingTimeHeadColor,
                    backgroundColor: config.nonWorkingTimeHeadBgColor
                } : {};

            let pFormattedList = config.nonAgendaOtherCellHeaderFormat.split('|').map(item => datetime.format(item));

            if (typeof nonAgendaCellHeaderTemplateResolver === 'function') {
                return nonAgendaCellHeaderTemplateResolver(schedulerData, item, pFormattedList, style)
            }

            const pList = pFormattedList.map((item, index) => (
                <div key={index}>{item}</div>
            ));

            return (
                <th key={item.time} className="header3-text" style={style}>
                    <div>
                        {pList}
                    </div>
                </th>
            );
        });
    }

    return (
        <thead>
        <tr style={{height: headerHeight}}>
            {headerList}
        </tr>
        </thead>
    );
};

HeaderView.propTypes = {
    nonAgendaCellHeaderTemplateResolver: PropTypes.func,
}

export default HeaderView
