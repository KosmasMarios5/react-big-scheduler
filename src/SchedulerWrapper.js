import React, {useCallback, useEffect, useState} from "react";
import Scheduler, {CellUnits, DATE_FORMAT, DATETIME_FORMAT, ViewTypes} from "./index_2";
import defaultConfig from "./config";
import defaultBehaviors from "./behaviors";
import {RRuleSet, rrulestr} from "rrule";


const SchedulerContext = React.createContext(null);

const SchedulerWrapper = (props) => {
    const {localeMoment, events, resources} = props

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
    const [endDate, setEndDate] = useState(null);
    const [selectDate, setSelectDate] = useState(null);

    const [eventGroups, setEventGroups] = useState([]);

    const [documentWidth, setDocumentWidth] = useState(0);

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
    const _setScrollToSpecialMoment = (scrollToSpecialMoment) => {
        if (config.scrollToSpecialMomentEnabled) {
            setScrollToSpecialMoment(scrollToSpecialMoment);
        }

    }
    const _validateMinuteStep = (minuteStep) => {
        if (60 % minuteStep !== 0) {
            console.error('Minute step is not set properly - 60 minutes must be divisible without remainder by this number');
            throw new Error('Minute step is not set properly - 60 minutes must be divisible without remainder by this number');
        }

    }

    const _resolveDate = useCallback((num, date) => {
        if (typeof date !== "undefined") {
            setSelectDate(localeMoment(date).format(DATE_FORMAT));
        }
        if (viewType === ViewTypes.Week) {
            const newStartDate = typeof date !== "undefined" ? localeMoment(date).startOf('week').format(DATE_FORMAT)
                : localeMoment(startDate).add(num, 'weeks').format(DATE_FORMAT);
            const newEndDate = localeMoment(newStartDate).endOf('week').format(DATE_FORMAT);
            setStartDate(newStartDate)
            setEndDate(newEndDate)
        } else if (viewType === ViewTypes.Day) {
            const newStartDate = typeof date !== "undefined" ? selectDate
                : localeMoment(startDate).add(num, 'days').format(DATE_FORMAT);
            setStartDate(newStartDate)
            setEndDate(newStartDate)
        } else if (viewType === ViewTypes.Month) {
            const newStartDate = typeof date !== "undefined" ? localeMoment(date).startOf('month').format(DATE_FORMAT)
                : localeMoment(startDate).add(num, 'months').format(DATE_FORMAT);
            const newEndDate = localeMoment(newStartDate).endOf('month').format(DATE_FORMAT);
            setStartDate(newStartDate)
            setEndDate(newEndDate)
        } else if (viewType === ViewTypes.Quarter) {
            const newStartDate = typeof date !== "undefined" ? localeMoment(date).startOf('quarter').format(DATE_FORMAT)
                : localeMoment(startDate).add(num, 'quarters').format(DATE_FORMAT);
            const newEndDate = localeMoment(newStartDate).endOf('quarter').format(DATE_FORMAT);
            setStartDate(newStartDate)
            setEndDate(newEndDate)
        } else if (viewType === ViewTypes.Year) {
            const newStartDate = typeof date !== "undefined" ? localeMoment(date).startOf('year').format(DATE_FORMAT)
                : localeMoment(startDate).add(num, 'years').format(DATE_FORMAT);
            const newEndDate = localeMoment(newStartDate).endOf('year').format(DATE_FORMAT);
            setStartDate(newStartDate)
            setEndDate(newEndDate)
        } else if (viewType === ViewTypes.Custom || viewType === ViewTypes.Custom1 || viewType === ViewTypes.Custom2) {
            if (typeof behaviors.getCustomDateFunc !== "undefined") {
                let customDate = behaviors.getCustomDateFunc(num, date);
                const newStartDate = customDate.startDate;
                const newEndDate = customDate.endDate;
                setStartDate(newStartDate)
                setEndDate(newEndDate)
                if (!!customDate.cellUnit)
                    setCellUnit(customDate.cellUnit)
            } else {
                throw new Error('This is custom view type, set behaviors.getCustomDateFunc func to resolve the time window(startDate and endDate) yourself');
            }
        }
    }, [behaviors, localeMoment, selectDate, startDate, viewType])
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

    const _validateEvents = (events) => {
        if (Object.prototype.toString.call(events) !== "[object Array]") {
            throw new Error('Events should be Array object');
        }
        events.forEach((e, index) => {
            if (typeof e === "undefined") {
                console.error(`Event undefined: ${index}`);
                throw new Error(`Event undefined: ${index}`);
            }
            if (typeof e.id === "undefined" || typeof e.resourceId === "undefined" || typeof e.title === "undefined" || typeof e.start === "undefined" || typeof e.end === "undefined") {
                console.error('Event property missed', index, e);
                throw new Error(`Event property undefined: ${index}`);
            }
        });
    };

    const _getEventGroupName = (event) => {
        return !!event.groupName ? event.groupName : event.title;
    }

    const _generateEventGroups = () => {
        let eventGroups = [];
        let set = new Set();
        events.forEach((item) => {
            let groupId = _getEventGroupId(item);
            let groupName = _getEventGroupName(item);
            if (!set.has(groupId)) {
                eventGroups.push({
                    id: groupId,
                    name: groupName,
                    state: item,
                });
                set.add(groupId);
            }
        })
        setEventGroups(eventGroups)
    }

    const isEventInTimeWindow = (eventStart, eventEnd, windowStart, windowEnd) => {
        return eventStart < windowEnd && eventEnd > windowStart;
    }

    const _handleRecurringEvents = () => {
        let recurringEvents = this.events.filter(x => !!x.rrule);
        recurringEvents.forEach((item) => {
            // this._detachEvent(item);
        });

        recurringEvents.forEach((item) => {
            let windowStart = localeMoment(startDate),
                windowEnd = localeMoment(endDate).add(1, 'days'),
                oldStart = localeMoment(item.start),
                oldEnd = localeMoment(item.end),
                rule = rrulestr(item.rrule),
                oldDtstart = undefined,
                oldUntil = rule.origOptions.until || windowEnd.toDate();
            if (!!rule.origOptions.dtstart) {
                oldDtstart = localeMoment(rule.origOptions.dtstart);
            }
            //rule.origOptions.dtstart = oldStart.toDate();
            if (windowEnd < oldUntil) {
                rule.origOptions.until = windowEnd.toDate();
            }

            //reload
            rule = rrulestr(rule.toString());
            if (item.exdates || item.exrule) {
                const rruleSet = new RRuleSet()
                rruleSet.rrule(rule);
                if (item.exrule) {
                    rruleSet.exrule(rrulestr(item.exrule));
                }
                if (item.exdates) {
                    item.exdates.forEach((exdate) => {
                        rruleSet.exdate(localeMoment(exdate).toDate());
                    });
                }
                rule = rruleSet;
            }

            let all = rule.all();
            let newEvents = all.map((time, index) => {
                return {
                    ...item,
                    recurringEventId: item.id,
                    recurringEventStart: item.start,
                    recurringEventEnd: item.end,
                    id: `${item.id}-${index}`,
                    start: rule.origOptions.tzid
                        ? localeMoment.utc(time).utcOffset(localeMoment().utcOffset(), true).format(DATETIME_FORMAT)
                        : localeMoment(time).format(DATETIME_FORMAT),
                    end: rule.origOptions.tzid
                        ? localeMoment.utc(time).utcOffset(localeMoment().utcOffset(), true).add(oldEnd.diff(oldStart), 'ms').add(localeMoment(oldUntil).utcOffset() - localeMoment(item.start).utcOffset(), "m").format(DATETIME_FORMAT)
                        : localeMoment(time).add(oldEnd.diff(oldStart), 'ms').format(DATETIME_FORMAT)
                };
            });
            newEvents.forEach((newEvent) => {
                let eventStart = localeMoment(newEvent.start),
                    eventEnd = localeMoment(newEvent.end);
                if (isEventInTimeWindow(eventStart, eventEnd, windowStart, windowEnd) && (!oldDtstart || eventStart >= oldDtstart)) {
                    // _attachEvent(newEvent); TODO
                }
            });
        });
    }


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

    const getScrollToSpecialMoment = () => {
        if (config.scrollToSpecialMomentEnabled)
            return scrollToSpecialMoment;
        return false;
    }

    const getResourceById = (resourceId) => {
        return resources.find((item) => (item.id === resourceId))
    }

    const getSlots = () => {
        return isEventPerspective ? eventGroups : resources;
    }

    const getSlotById = (slotId) => {
        let slots = getSlots();
        return slots.find((item) => (item.id === slotId))
    }

    // useEffect(() => {
    // const newEvents = props.events;
    // _validateEvents(newEvents);
    // _generateEventGroups();
    // if (config.recurringEventsEnabled) {
    //     // _handleRecurringEvents();
    // }
    // _createRenderData();
    // console.log('UPDATING EVENTS')
    // }, [_createRenderData, _generateEventGroups, config.recurringEventsEnabled, props.events])

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
        _resolveDate(0, localeMoment(props.date).format(DATE_FORMAT))
        // _resolveDate(0, props.date)

        _setDocumentWidth(document.documentElement.clientWidth);

        _validateResource();
        // _createHeaders();
        // _createRenderData();
        // _resolveDate(0, props.date)
        _setScrollToSpecialMoment(true)

        console.log('MOUNTING')
    }, [])


    useEffect(() => {
        console.log('CREATING RENDER DATA')
        // _createRenderData();
    }, [])

    const _compare = (event1, event2) => {
        let start1 = localeMoment(event1.start), start2 = localeMoment(event2.start);
        if (start1 !== start2) return start1 < start2 ? -1 : 1;

        let end1 = localeMoment(event1.end), end2 = localeMoment(event2.end);
        if (end1 !== end2) return end1 < end2 ? -1 : 1;

        return event1.id < event2.id ? -1 : 1;
    }

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

    const _isResizing = () => {
        return resizing
    }

    const _setViewType = (newViewType, showAgenda, isEventPerspective) => {
        setShowAgenda(showAgenda)
        setIsEventPerspective(isEventPerspective)
        setCellUnit(CellUnits.Day)

        if (viewType !== newViewType) {
            let date = startDate;
            if (newViewType === ViewTypes.Custom || newViewType === ViewTypes.Custom1 || newViewType === ViewTypes.Custom2) {
                setViewType(newViewType)
                _resolveDate(0, date)
            } else {
                if (viewType < newViewType) {
                    if (newViewType === ViewTypes.Week) {
                        const newStartDate = localeMoment(date).startOf('week').format(DATE_FORMAT)
                        const newEndDate = localeMoment(newStartDate).endOf('week').format(DATE_FORMAT)
                        setStartDate(newStartDate)
                        setEndDate(newEndDate)
                    } else if (newViewType === ViewTypes.Month) {
                        const newStartDate = localeMoment(date).startOf('month').format(DATE_FORMAT)
                        const newEndDate = localeMoment(newStartDate).endOf('month').format(DATE_FORMAT)
                        setStartDate(newStartDate)
                        setEndDate(newEndDate)
                    } else if (newViewType === ViewTypes.Quarter) {
                        const newStartDate = localeMoment(date).startOf('quarter').format(DATE_FORMAT)
                        const newEndDate = localeMoment(newStartDate).endOf('quarter').format(DATE_FORMAT)
                        setStartDate(newStartDate)
                        setEndDate(newEndDate)
                    } else if (newViewType === ViewTypes.Year) {
                        const newStartDate = localeMoment(date).startOf('year').format(DATE_FORMAT)
                        const newEndDate = localeMoment(newStartDate).endOf('year').format(DATE_FORMAT)
                        setStartDate(newStartDate)
                        setEndDate(newEndDate)
                    }
                } else {
                    let start = localeMoment(startDate);
                    let end = localeMoment(endDate).add(1, 'days');

                    if (typeof selectDate !== "undefined") {
                        let newSelectDate = localeMoment(selectDate);
                        if (newSelectDate >= start && newSelectDate < end) {
                            date = newSelectDate;
                        }
                    }
                    let now = localeMoment();
                    if (now >= start && now < end) {
                        date = now.format(DATE_FORMAT);
                    }
                    if (newViewType === ViewTypes.Day) {
                        setStartDate(date);
                        setEndDate(date)
                        setCellUnit(CellUnits.Hour)
                    } else if (newViewType === ViewTypes.Week) {
                        const newStartDate = localeMoment(date).startOf('week').format(DATE_FORMAT)
                        const newEndDate = localeMoment(newStartDate).endOf('week').format(DATE_FORMAT)
                        setStartDate(newStartDate)
                        setEndDate(newEndDate)
                    } else if (newViewType === ViewTypes.Month) {
                        const newStartDate = localeMoment(date).startOf('month').format(DATE_FORMAT)
                        const newEndDate = localeMoment(newStartDate).endOf('month').format(DATE_FORMAT)
                        setStartDate(newStartDate)
                        setEndDate(newEndDate)
                    } else if (newViewType === ViewTypes.Quarter) {
                        const newStartDate = localeMoment(date).startOf('quarter').format(DATE_FORMAT)
                        const newEndDate = localeMoment(newStartDate).endOf('quarter').format(DATE_FORMAT)
                        setStartDate(newStartDate)
                        setEndDate(newEndDate)
                    }
                }
                setViewType(newViewType)
                if (props.onViewChange) {
                    props.onViewChange({
                        viewType: newViewType,
                        showAgenda: showAgenda,
                        isEventPerspective: isEventPerspective
                    });
                }
            }
            _setScrollToSpecialMoment(true);
        }
    }

    const setDate = (date) => {
        _resolveDate(0, date);
        if (props.onSelectDate) {
            props.onSelectDate(date)
        }
    }

    const prev = () => {
        _resolveDate(-1);
        if (props.onPreviousClick) {
            props.onPreviousClick(selectDate);
        }
    }

    const next = () => {
        _resolveDate(1);
        if (props.onNextClick) {
            props.onNextClick(selectDate);
        }
    }

    const setSchedulerMaxHeight = (newSchedulerMaxHeight) => {
        setConfig({
            ...config,
            schedulerMaxHeight: newSchedulerMaxHeight
        })
    }

    const onSlotItemExpandToggle = (expanded, slotId) => {
        const newHiddenSlots = expanded ? hiddenSlots.filter(s => s !== slotId) : [...hiddenSlots, slotId]
        setHiddenSlots(newHiddenSlots)
        if (props.onSlotItemExpandToggle) {
            props.onSlotItemExpandToggle(expanded, slotId)
        }
    }

    console.log('RENDER WRAPPER')
    return (
        <SchedulerContext.Provider value={{}}>
            <Scheduler
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
                onSelectDate={setDate}
                onMoveEvent={props.onMoveEvent}
                onCellClick={props.onCellClick}
                onSlotItemExpandToggle={onSlotItemExpandToggle}

                prevClick={prev}
                nextClick={next}
            />
        </SchedulerContext.Provider>
    )
}

export default SchedulerWrapper