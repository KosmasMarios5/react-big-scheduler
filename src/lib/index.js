import React, {useCallback, useEffect, useState} from "react";
import SchedulerMain from "./SchedulerMain";
import defaultConfig from "./parameters/config";
import defaultBehaviors from "./parameters/behaviors";
import ViewTypes from "./types/ViewTypes";
import CellUnits from "./types/CellUnits";

const Scheduler = (props) => {
    const {localeMoment, events, resources, eventGroups} = props

    const [hiddenSlots, setHiddenSlots] = useState([]);
    const [viewType, setViewType] = useState(ViewTypes.Month);
    const [cellUnit, setCellUnit] = useState(CellUnits.Day);
    const [showAgenda, setShowAgenda] = useState(false);
    const [isEventPerspective, setIsEventPerspective] = useState(false);
    const [resizing, setResizing] = useState(false);
    const [scrollToSpecialMoment, setScrollToSpecialMoment] = useState(false);
    const [config, setConfig] = useState(defaultConfig);
    const [behaviors, setBehaviors] = useState(defaultBehaviors);

    const [startDate, setStartDate] = useState(null);
    const [startDateObj, setStartDateObj] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [endDateObj, setEndDateObj] = useState(null);
    const [selectDate, setSelectDate] = useState(null);
    const [selectDateObj, setSelectDateObj] = useState(null);

    const [documentWidth, setDocumentWidth] = useState(0);

    const [selectedSlot, setSelectedSlot] = useState(null);

    const getMinuteStepsInHour = useCallback(() => {
        return 60 / config.minuteStep;
    }, [config.minuteStep]);


    const _validateResource = useCallback(() => {
        if (Object.prototype.toString.call(resources) !== "[object Array]") {
            throw new Error('Resources should be Array object');
        }
        resources.forEach((item, index) => {
            if (typeof item === "undefined") {
                console.error(`Resource undefined: ${index}`);
                throw new Error(`Resource undefined: ${index}`);
            }
            if (typeof item.id === "undefined" || typeof item.name === "undefined") {
                console.error('Resource property missed', index, item);
                throw new Error(`Resource property undefined: ${index}`);
            }
        });
    }, [resources])

    const _setScrollToSpecialMoment = useCallback((scrollToSpecialMoment) => {
        if (config.scrollToSpecialMomentEnabled) {
            setScrollToSpecialMoment(scrollToSpecialMoment);
        }
    }, [config.scrollToSpecialMomentEnabled])

    const _validateMinuteStep = (minuteStep) => {
        if (60 % minuteStep !== 0) {
            console.error('Minute step is not set properly - 60 minutes must be divisible without remainder by this number');
            throw new Error('Minute step is not set properly - 60 minutes must be divisible without remainder by this number');
        }

    }

    const _resolveDate = useCallback((viewType, num, date) => {
        const setDates = (type) => {
            let newStartDate, newEndDate;
            newStartDate = typeof date !== "undefined" ?
                localeMoment(date).startOf(type)
                : num !== 0 ?
                    localeMoment(startDate).add(num, type + "s") :
                    localeMoment(startDate).startOf(type);

            newEndDate = localeMoment(newStartDate).endOf(type)
            setStartDate(newStartDate.format(DATE_FORMAT))
            setStartDateObj(newStartDate)
            setEndDate(newEndDate.format(DATE_FORMAT))
            setEndDateObj(newEndDate)

            let newSelectDate = typeof date !== "undefined" ?
                localeMoment(date) :
                selectDateObj.add(num, type + "s");

            if (!(newSelectDate >= newStartDate && newSelectDate <= newEndDate)) {
                newSelectDate = newStartDate
            }
            setSelectDate(newSelectDate.format(DATE_FORMAT));
            setSelectDateObj(newSelectDate);
        }
        switch (viewType) {
            case ViewTypes.Week:
                setDates("week")
                break
            case ViewTypes.Day:
                setDates("day")
                break
            case ViewTypes.Month:
                setDates("month")
                break
            case ViewTypes.Quarter:
                setDates("quarter")
                break
            case ViewTypes.Year:
                setDates("year")
                break
            default:
        }
    }, [localeMoment, selectDateObj, startDate])

    const _createHeaderEvent = (expanded, span, eventItem) => {
        return {
            expanded: expanded,
            span: span,
            eventItem: eventItem
        };

    }

    const _createHeaders = useCallback(() => {
        let headers = [],
            start = localeMoment(startDate),
            end = localeMoment(endDate),
            header = start;

        if (showAgenda) {
            headers.push({time: header.format(DATETIME_FORMAT), nonWorkingTime: false});
        } else {
            if (cellUnit === CellUnits.Hour) {
                start = start.add(config.dayStartFrom, 'hours');
                end = end.add(config.dayStopTo, 'hours');
                header = start;
                while (header >= start && header <= end) {
                    let minuteSteps = getMinuteStepsInHour();
                    for (let i = 0; i < minuteSteps; i++) {
                        let hour = header.hour();
                        if (hour >= config.dayStartFrom && hour <= config.dayStopTo) {
                            let time = header.format(DATETIME_FORMAT);
                            let nonWorkingTime = behaviors.isNonWorkingTimeFunc(localeMoment, time, cellUnit);
                            headers.push({time: time, nonWorkingTime: nonWorkingTime});
                        }
                        header = header.add(config.minuteStep, 'minutes');
                    }
                }
            } else {
                while (header >= start && header <= end) {
                    let time = header.format(DATETIME_FORMAT);
                    let dayOfWeek = header.weekday();
                    if (config.displayWeekend || (dayOfWeek !== 0 && dayOfWeek !== 6)) {
                        let nonWorkingTime = behaviors.isNonWorkingTimeFunc(localeMoment, time, cellUnit);
                        headers.push({time: time, nonWorkingTime: nonWorkingTime});
                    }
                    header = header.add(1, 'days');
                }
            }
        }
        return headers
    }, [behaviors, cellUnit, config.dayStartFrom, config.dayStopTo, config.displayWeekend, config.minuteStep, endDate, getMinuteStepsInHour, localeMoment, showAgenda, startDate])

    const _getSpan = useCallback((startTime, endTime) => {
        const headers = _createHeaders();
        if (showAgenda) return 1;
        let start = localeMoment(startTime),
            end = localeMoment(endTime),
            span = 0;
        for (let header of headers) {
            let spanStart = localeMoment(header.time),
                spanEnd = cellUnit === CellUnits.Hour ? localeMoment(header.time).add(config.minuteStep, 'minutes')
                    : localeMoment(header.time).add(1, 'days');

            if (spanStart < end && spanEnd > start) {
                span++;
            }
        }
        return span;
    }, [_createHeaders, cellUnit, config.minuteStep, localeMoment, showAgenda])
    const _getEventGroupId = (event) => {

        return !!event.groupId ? event.groupId.toString() : event.id.toString();

    }

    const _getEventSlotId = useCallback((event) => {
        return isEventPerspective ? _getEventGroupId(event) : event.resourceId;
    }, [isEventPerspective])

    const getCellMaxEvents = useCallback(() => {
        return viewType === ViewTypes.Week ? config.weekMaxEvents : (
            viewType === ViewTypes.Day ? config.dayMaxEvents : (
                viewType === ViewTypes.Month ? config.monthMaxEvents : (
                    viewType === ViewTypes.Year ? config.yearMaxEvents : (
                        viewType === ViewTypes.Quarter ? config.quarterMaxEvents :
                            config.customMaxEvents
                    )
                )
            )
        );
    }, [config.customMaxEvents, config.dayMaxEvents, config.monthMaxEvents, config.quarterMaxEvents, config.weekMaxEvents, config.yearMaxEvents, viewType])

    const _createInitHeaderEvents = useCallback((header) => {
        let start = localeMoment(header.time),
            startValue = start.format(DATETIME_FORMAT);
        let endValue = showAgenda ? (viewType === ViewTypes.Week ? start.add(1, 'weeks').format(DATETIME_FORMAT) : (
            viewType === ViewTypes.Day ? start.add(1, 'days').format(DATETIME_FORMAT) : (
                viewType === ViewTypes.Month ? start.add(1, 'months').format(DATETIME_FORMAT) : (
                    viewType === ViewTypes.Year ? start.add(1, 'years').format(DATETIME_FORMAT) : (
                        viewType === ViewTypes.Quarter ? start.add(1, 'quarters').format(DATETIME_FORMAT) :
                            localeMoment(endDate).add(1, 'days').format(DATETIME_FORMAT)
                    )
                )
            )
        )) : (cellUnit === CellUnits.Hour ? start.add(config.minuteStep, 'minutes').format(DATETIME_FORMAT)
            : start.add(1, 'days').format(DATETIME_FORMAT));
        // noinspection JSConsecutiveCommasInArrayLiteral
        return {
            time: header.time,
            nonWorkingTime: header.nonWorkingTime,
            start: startValue,
            end: endValue,
            count: 0,
            addMore: 0,
            addMoreIndex: 0,
            // eslint-disable-next-line no-sparse-arrays
            events: [, , ,],
        };
    }, [cellUnit, config.minuteStep, endDate, localeMoment, showAgenda, viewType])

    const _createInitRenderData = useCallback(() => {
        const headers = _createHeaders()
        let slots = isEventPerspective ? eventGroups : resources;
        let slotTree = [],
            slotMap = new Map();
        slots.forEach((slot) => {
            let headerEvents = headers.map((header) => _createInitHeaderEvents(header));
            const expanded = !hiddenSlots.includes(slot.id)
            let slotRenderData = {
                slotId: slot.id,
                slotName: slot.name,
                parentId: slot.parentId,
                groupOnly: slot.groupOnly,
                hasSummary: false,
                rowMaxCount: 0,
                rowHeight: config.nonAgendaSlotMinHeight !== 0 ? config.nonAgendaSlotMinHeight : config.eventItemLineHeight + 2,
                headerItems: headerEvents,
                indent: 0,
                hasChildren: false,
                expanded: expanded,
            };
            let id = slot.id;
            let value = undefined;
            if (slotMap.has(id)) {
                value = slotMap.get(id);
                value.data = slotRenderData;
            } else {
                value = {
                    data: slotRenderData,
                    children: [],
                };
                slotMap.set(id, value);
            }

            let parentId = slot.parentId;
            if (!parentId || parentId === id) {
                slotTree.push(value);
            } else {
                let parentValue = undefined;
                if (slotMap.has(parentId)) {
                    parentValue = slotMap.get(parentId);
                } else {
                    parentValue = {
                        data: undefined,
                        children: [],
                    };
                    slotMap.set(parentId, parentValue);
                }

                parentValue.children.push(value);
            }
        });

        let slotStack = [];
        let i;
        for (i = slotTree.length - 1; i >= 0; i--) {
            slotStack.push(slotTree[i]);
        }
        let initRenderData = [];
        let currentNode = undefined;
        while (slotStack.length > 0) {
            currentNode = slotStack.pop();
            if (currentNode.data.indent > 0) {
                currentNode.data.expanded = config.defaultExpanded;
            }
            if (currentNode.children.length > 0) {
                currentNode.data.hasChildren = true;
                currentNode.data.expanded = config.defaultExpanded;
            }
            initRenderData.push(currentNode.data);

            for (i = currentNode.children.length - 1; i >= 0; i--) {
                currentNode.children[i].data.indent = currentNode.data.indent + 1;
                slotStack.push(currentNode.children[i]);
            }
        }
        return initRenderData;
    }, [_createHeaders, _createInitHeaderEvents, config.defaultExpanded, config.eventItemLineHeight, config.nonAgendaSlotMinHeight, eventGroups, hiddenSlots, isEventPerspective, resources])

    const _createRenderData = useCallback(() => {
        let initRenderData = _createInitRenderData();
        //this.events.sort(this._compare);
        let cellMaxEventsCount = getCellMaxEvents();
        const cellMaxEventsCountValue = 30;

        events.forEach((item) => {
            let resourceEventsList = initRenderData.filter(x => x.slotId === _getEventSlotId(item));
            if (resourceEventsList.length > 0) {
                let resourceEvents = resourceEventsList[0];
                let span = _getSpan(item.start, item.end);
                let eventStart = localeMoment(item.start), eventEnd = localeMoment(item.end);
                let pos = -1;

                resourceEvents.headerItems.forEach((header, index) => {
                    let headerStart = localeMoment(header.start), headerEnd = localeMoment(header.end);
                    if (headerEnd > eventStart && headerStart < eventEnd) {
                        header.count = header.count + 1;
                        if (header.count > resourceEvents.rowMaxCount) {
                            resourceEvents.rowMaxCount = header.count;
                            let rowsCount = (cellMaxEventsCount <= cellMaxEventsCountValue && resourceEvents.rowMaxCount > cellMaxEventsCount) ? cellMaxEventsCount : resourceEvents.rowMaxCount;
                            let newRowHeight = rowsCount * config.eventItemLineHeight + (config.creatable && config.checkConflict === false ? 20 : 2);
                            if (newRowHeight > resourceEvents.rowHeight)
                                resourceEvents.rowHeight = newRowHeight;
                        }

                        if (pos === -1) {
                            let tmp = 0;
                            while (header.events[tmp] !== undefined)
                                tmp++;

                            pos = tmp;
                        }
                        let render = headerStart <= eventStart || index === 0;
                        if (render === false) {
                            let previousHeader = resourceEvents.headerItems[index - 1];
                            let previousHeaderStart = localeMoment(previousHeader.start),
                                previousHeaderEnd = localeMoment(previousHeader.end);
                            if (previousHeaderEnd <= eventStart || previousHeaderStart >= eventEnd)
                                render = true;
                        }
                        header.events[pos] = _createHeaderEvent(render, span, item);
                    }
                });
            }
        });

        if (cellMaxEventsCount <= cellMaxEventsCountValue || behaviors.getSummaryFunc !== undefined) {
            initRenderData.forEach((resourceEvents) => {
                let hasSummary = false;

                resourceEvents.headerItems.forEach((headerItem) => {
                    if (cellMaxEventsCount <= cellMaxEventsCountValue) {
                        let renderItemsCount = 0, addMoreIndex = 0, index = 0;
                        while (index < cellMaxEventsCount - 1) {
                            if (headerItem.events[index] !== undefined) {
                                renderItemsCount++;
                                addMoreIndex = index + 1;
                            }

                            index++;
                        }

                        if (headerItem.events[index] !== undefined) {
                            if (renderItemsCount + 1 < headerItem.count) {
                                headerItem.addMore = headerItem.count - renderItemsCount;
                                headerItem.addMoreIndex = addMoreIndex;
                            }
                        } else {
                            if (renderItemsCount < headerItem.count) {
                                headerItem.addMore = headerItem.count - renderItemsCount;
                                headerItem.addMoreIndex = addMoreIndex;
                            }
                        }
                    }

                    if (behaviors.getSummaryFunc !== undefined) {
                        let events = [];
                        headerItem.events.forEach((e) => {
                            if (!!e && !!e.eventItem)
                                events.push(e.eventItem);
                        });

                        headerItem.summary = behaviors.getSummaryFunc(events, resourceEvents.slotId, resourceEvents.slotName, headerItem.start, headerItem.end);
                        if (!!headerItem.summary && typeof headerItem.summary.text !== "undefined")
                            hasSummary = true;
                    }
                });

                resourceEvents.hasSummary = hasSummary;
                if (hasSummary) {
                    let rowsCount = (cellMaxEventsCount <= cellMaxEventsCountValue && resourceEvents.rowMaxCount > cellMaxEventsCount) ? cellMaxEventsCount : resourceEvents.rowMaxCount;
                    let newRowHeight = (rowsCount + 1) * config.eventItemLineHeight + (config.creatable && config.checkConflict === false ? 20 : 2);
                    if (newRowHeight > resourceEvents.rowHeight)
                        resourceEvents.rowHeight = newRowHeight;
                }
            });
        }

        return initRenderData
    }, [_createInitRenderData, _getEventSlotId, _getSpan, behaviors, config.checkConflict, config.creatable, config.eventItemLineHeight, events, getCellMaxEvents, localeMoment])

    const _setDocumentWidth = (documentWidth) => {
        if (documentWidth >= 0) {
            setDocumentWidth(documentWidth)
        }
    }

    const getDateLabel = useCallback(() => {
        let start = localeMoment(startDate);
        let end = localeMoment(endDate);
        let dateLabel = start.format('LL');

        if (start !== end) {
            dateLabel = `${start.format('LL')}-${end.format('LL')}`;
        }

        if (!!behaviors.getDateLabelFunc)
            dateLabel = behaviors.getDateLabelFunc(localeMoment, viewType, startDate, endDate);
        return dateLabel;
    }, [behaviors, endDate, localeMoment, startDate, viewType])

    const getTableHeaderHeight = () => {
        return config.tableHeaderHeight;
    }

    const getSchedulerContentDesiredHeight = () => {
        let height = 0;
        _createRenderData().forEach((item) => {
            if (item.expanded)
                height += item.rowHeight;
        });
        return height;
    }

    const getSlots = () => {
        return isEventPerspective ? eventGroups : resources;
    }

    const getSlotById = (slotId) => {
        let slots = getSlots();
        return slots.find((item) => (item.id === slotId))
    }

    useEffect(() => {
        if (props.config) {
            const newConfig = {...config, ...props.config}
            setConfig(newConfig)
            _validateMinuteStep(newConfig.minuteStep)
        }
        if (props.behaviors) {
            const newBehaviors = {...behaviors, ...props.behaviors}
            setBehaviors(newBehaviors)
        }
        _setDocumentWidth(document.documentElement.clientWidth);
        _validateResource();
        _setScrollToSpecialMoment(true)
    }, [])


    useEffect(() => {
        const newDate = localeMoment(props.date).format(DATE_FORMAT);
        if (newDate !== selectDate) {
            _resolveDate(viewType, 0, newDate)
        }
    }, [props.date])


    const isSchedulerResponsive = () => {
        return !!config.schedulerWidth.endsWith && config.schedulerWidth.endsWith("%");
    }

    const getSchedulerWidth = () => {
        let baseWidth = documentWidth - config.besidesWidth > 0 ? documentWidth - config.besidesWidth : 0;
        return isSchedulerResponsive() ? parseInt(baseWidth * Number(config.schedulerWidth.slice(0, -1)) / 100) : config.schedulerWidth;
    }

    const getContentCellConfigWidth = () => {
        return viewType === ViewTypes.Week ? config.weekCellWidth : (
            viewType === ViewTypes.Day ? config.dayCellWidth : (
                viewType === ViewTypes.Month ? config.monthCellWidth : (
                    viewType === ViewTypes.Year ? config.yearCellWidth : (
                        viewType === ViewTypes.Quarter ? config.quarterCellWidth :
                            config.customCellWidth
                    )
                )
            )
        );
    }

    const isContentViewResponsive = () => {
        let contentCellWidth = getContentCellConfigWidth();
        return !!contentCellWidth.endsWith && contentCellWidth.endsWith("%");
    }

    const getContentCellWidth = () => {
        let contentCellConfigWidth = getContentCellConfigWidth();
        let schedulerWidth = getSchedulerWidth();
        return isContentViewResponsive() ? parseInt(schedulerWidth * Number(contentCellConfigWidth.slice(0, -1)) / 100) : contentCellConfigWidth;
    }

    const getContentTableWidth = () => {
        return _createHeaders().length * (getContentCellWidth());
    }

    const isResourceViewResponsive = () => {
        let resourceTableWidth = getResourceTableConfigWidth();
        return !!resourceTableWidth.endsWith && resourceTableWidth.endsWith("%");
    }

    const getResourceTableConfigWidth = () => {
        if (showAgenda) return config.agendaResourceTableWidth;
        return viewType === ViewTypes.Week ? config.weekResourceTableWidth : (
            viewType === ViewTypes.Day ? config.dayResourceTableWidth : (
                viewType === ViewTypes.Month ? config.monthResourceTableWidth : (
                    viewType === ViewTypes.Year ? config.yearResourceTableWidth : (
                        viewType === ViewTypes.Quarter ? config.quarterResourceTableWidth :
                            config.customResourceTableWidth
                    )
                )
            )
        );
    }

    const getResourceTableWidth = () => {
        let resourceTableConfigWidth = getResourceTableConfigWidth();
        let schedulerWidth = getSchedulerWidth();
        let resourceTableWidth = isResourceViewResponsive() ? parseInt(schedulerWidth * Number(resourceTableConfigWidth.slice(0, -1)) / 100)
            : resourceTableConfigWidth;
        if (isSchedulerResponsive() && (getContentTableWidth() + resourceTableWidth < schedulerWidth))
            resourceTableWidth = schedulerWidth - getContentTableWidth();
        return resourceTableWidth;
    }

    const _startResizing = () => {
        setResizing(true)
    }

    const _stopResizing = () => {
        setResizing(false)
    }

    const _setViewType = (newViewType, showAgenda, isEventPerspective) => {
        if (viewType === newViewType) return;

        _resolveDate(newViewType, 0)
        _setScrollToSpecialMoment(true);

        if (newViewType === ViewTypes.Day) {
            setCellUnit(CellUnits.Hour)
        } else {
            setCellUnit(CellUnits.Day)
        }
        setShowAgenda(showAgenda)
        setIsEventPerspective(isEventPerspective)
        setViewType(newViewType)
        if (props.onViewChange) {
            props.onViewChange({
                viewType: newViewType,
                showAgenda: showAgenda,
                isEventPerspective: isEventPerspective
            });
        }
    }

    const prev = () => {
        _resolveDate(viewType, -1);
        if (props.onNavigate) {
            props.onNavigate(selectDateObj.toDate(), startDateObj.toDate(), endDateObj.toDate());
        }
    }

    const next = () => {
        _resolveDate(viewType, 1);
        if (props.onNavigate) {
            props.onNavigate(selectDateObj.toDate(), startDateObj.toDate(), endDateObj.toDate());
        }
    }

    const onSlotItemExpandToggle = (expanded, slotId) => {
        const newHiddenSlots = expanded ? hiddenSlots.filter(s => s !== slotId) : [...hiddenSlots, slotId]
        setHiddenSlots(newHiddenSlots)
        if (props.onSlotItemExpandToggle) {
            props.onSlotItemExpandToggle(expanded, slotId)
        }
    }

    const clearSelection = () => {
        setSelectedSlot(null)
    }

    const onSelection = (slotId, slotName, startTime, endTime, selectionLeft, selectionWidth) => {
        setSelectedSlot({
            slotId,
            left: selectionLeft,
            width: selectionWidth
        })
        if (props.onSelection) {
            props.onSelection(slotId, slotName, startTime, endTime, clearSelection);
        }
    }

    return (
        <>
            <SchedulerMain
                {...props}
                headers={_createHeaders()}
                renderData={_createRenderData()}
                cellUnit={cellUnit}

                viewType={viewType}
                config={config}
                behaviors={behaviors}
                showAgenda={showAgenda}
                isEventPerspective={isEventPerspective}

                isResizing={resizing}
                startResizing={_startResizing}
                stopResizing={_stopResizing}

                dateLabel={getDateLabel()}

                width={getSchedulerWidth()}
                tableHeaderHeight={getTableHeaderHeight()}
                contentCellWidth={getContentCellWidth()}
                cellMaxEvents={getCellMaxEvents()}
                minuteStepsInHour={getMinuteStepsInHour()}
                resourceTableWidth={getResourceTableWidth()}
                // schedulerWidth={getContentTableWidth() - 1}
                schedulerWidth={getContentTableWidth()}
                contentHeight={getSchedulerContentDesiredHeight()}
                isSchedulerResponsive={isSchedulerResponsive()}
                setDocumentWidth={_setDocumentWidth}

                scrollToSpecialMoment={scrollToSpecialMoment}
                setScrollToSpecialMoment={setScrollToSpecialMoment}

                localeMoment={localeMoment}

                startDate={startDate}
                endDate={endDate}


                getEventSlotId={_getEventSlotId}
                getSlotById={getSlotById}
                onViewChange={_setViewType}

                onMoveEvent={props.onMoveEvent}

                selectedSlot={selectedSlot}
                onSelection={onSelection}
                onSlotItemExpandToggle={onSlotItemExpandToggle}

                onClickPrevious={prev}
                onClickNext={next}
            />
        </>
    )
}

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export {ViewTypes, CellUnits}

export default Scheduler