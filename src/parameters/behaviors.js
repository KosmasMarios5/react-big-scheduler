
//getDateLabel func example
import ViewTypes from "../types/ViewTypes";
import CellUnits from "../types/CellUnits";

export const getDateLabel = (localeMoment, viewType, startDate, endDate) => {
    let start = localeMoment(startDate);
    let end = localeMoment(endDate);
    let dateLabel = start.format('MMM D, YYYY');

    if (viewType === ViewTypes.Week ||
        (start !== end && (viewType === ViewTypes.Custom || viewType === ViewTypes.Custom1 || viewType === ViewTypes.Custom2))) {
        dateLabel = `${start.format('MMM D')}-${end.format('D, YYYY')}`;
        if (start.month() !== end.month())
            dateLabel = `${start.format('MMM D')}-${end.format('MMM D, YYYY')}`;
        if (start.year() !== end.year())
            dateLabel = `${start.format('MMM D, YYYY')}-${end.format('MMM D, YYYY')}`;
    } else if (viewType === ViewTypes.Month) {
        dateLabel = start.format('MMMM YYYY');
    } else if (viewType === ViewTypes.Quarter) {
        dateLabel = `${start.format('MMM D')}-${end.format('MMM D, YYYY')}`;
    } else if (viewType === ViewTypes.Year) {
        dateLabel = start.format('YYYY');
    }

    return dateLabel;
}

export const getEventText = (event, resources, isEventPerspective) => {
    if (!isEventPerspective) return event.title;

    let eventText = event.title;
    resources.forEach((item) => {
        if (item.id === event.resourceId) {
            eventText = item.name;
        }
    })

    return eventText;
}

export const getScrollSpecialMoment = (localeMoment, startMoment, endMoment) => {
    // return endMoment;
    return localeMoment();
}

export const isNonWorkingTime = (localeMoment, time, cellUnit) => {
    if (cellUnit === CellUnits.Hour) {
        let hour = localeMoment(time).hour();
        if (hour < 9 || hour > 18)
            return true;
    } else {
        let dayOfWeek = localeMoment(time).weekday();
        if (dayOfWeek === 0 || dayOfWeek === 6)
            return true;
    }
    return false;
}

export default {
    //getSummaryFunc: getSummary,
    getSummaryFunc: undefined,
    //getCustomDateFunc: getCustomDate,
    getCustomDateFunc: undefined,
    // getNonAgendaViewBodyCellBgColorFunc: getNonAgendaViewBodyCellBgColor,
    getNonAgendaViewBodyCellBgColorFunc: undefined,
    getScrollSpecialMomentFunc: getScrollSpecialMoment,
    getDateLabelFunc: getDateLabel,
    getEventTextFunc: getEventText,
    isNonWorkingTimeFunc: isNonWorkingTime,
}
