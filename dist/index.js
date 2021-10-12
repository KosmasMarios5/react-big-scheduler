"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ViewTypes", {
  enumerable: true,
  get: function get() {
    return _ViewTypes.default;
  }
});
Object.defineProperty(exports, "CellUnits", {
  enumerable: true,
  get: function get() {
    return _CellUnits.default;
  }
});
exports.default = exports.DATETIME_FORMAT = exports.DATE_FORMAT = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _createForOfIteratorHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createForOfIteratorHelper"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _SchedulerMain = _interopRequireDefault(require("./SchedulerMain"));

var _config = _interopRequireDefault(require("./parameters/config"));

var _behaviors = _interopRequireDefault(require("./parameters/behaviors"));

var _ViewTypes = _interopRequireDefault(require("./types/ViewTypes"));

var _CellUnits = _interopRequireDefault(require("./types/CellUnits"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Scheduler = function Scheduler(props) {
  var localeMoment = props.localeMoment,
      events = props.events,
      resources = props.resources,
      eventGroups = props.eventGroups;

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      hiddenSlots = _useState2[0],
      setHiddenSlots = _useState2[1];

  var _useState3 = (0, _react.useState)(_ViewTypes.default.Month),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      viewType = _useState4[0],
      setViewType = _useState4[1];

  var _useState5 = (0, _react.useState)(_CellUnits.default.Day),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      cellUnit = _useState6[0],
      setCellUnit = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      showAgenda = _useState8[0],
      setShowAgenda = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      isEventPerspective = _useState10[0],
      setIsEventPerspective = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      resizing = _useState12[0],
      setResizing = _useState12[1];

  var _useState13 = (0, _react.useState)(false),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      scrollToSpecialMoment = _useState14[0],
      setScrollToSpecialMoment = _useState14[1];

  var _useState15 = (0, _react.useState)(_config.default),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      config = _useState16[0],
      setConfig = _useState16[1];

  var _useState17 = (0, _react.useState)(_behaviors.default),
      _useState18 = (0, _slicedToArray2.default)(_useState17, 2),
      behaviors = _useState18[0],
      setBehaviors = _useState18[1];

  var _useState19 = (0, _react.useState)(null),
      _useState20 = (0, _slicedToArray2.default)(_useState19, 2),
      startDate = _useState20[0],
      setStartDate = _useState20[1];

  var _useState21 = (0, _react.useState)(null),
      _useState22 = (0, _slicedToArray2.default)(_useState21, 2),
      startDateObj = _useState22[0],
      setStartDateObj = _useState22[1];

  var _useState23 = (0, _react.useState)(null),
      _useState24 = (0, _slicedToArray2.default)(_useState23, 2),
      endDate = _useState24[0],
      setEndDate = _useState24[1];

  var _useState25 = (0, _react.useState)(null),
      _useState26 = (0, _slicedToArray2.default)(_useState25, 2),
      endDateObj = _useState26[0],
      setEndDateObj = _useState26[1];

  var _useState27 = (0, _react.useState)(null),
      _useState28 = (0, _slicedToArray2.default)(_useState27, 2),
      selectDate = _useState28[0],
      setSelectDate = _useState28[1];

  var _useState29 = (0, _react.useState)(null),
      _useState30 = (0, _slicedToArray2.default)(_useState29, 2),
      selectDateObj = _useState30[0],
      setSelectDateObj = _useState30[1];

  var _useState31 = (0, _react.useState)(0),
      _useState32 = (0, _slicedToArray2.default)(_useState31, 2),
      documentWidth = _useState32[0],
      setDocumentWidth = _useState32[1];

  var _useState33 = (0, _react.useState)(null),
      _useState34 = (0, _slicedToArray2.default)(_useState33, 2),
      selectedSlot = _useState34[0],
      setSelectedSlot = _useState34[1];

  var getMinuteStepsInHour = (0, _react.useCallback)(function () {
    return 60 / config.minuteStep;
  }, [config.minuteStep]);

  var _validateResource = (0, _react.useCallback)(function () {
    if (Object.prototype.toString.call(resources) !== "[object Array]") {
      throw new Error('Resources should be Array object');
    }

    resources.forEach(function (item, index) {
      if (typeof item === "undefined") {
        console.error("Resource undefined: ".concat(index));
        throw new Error("Resource undefined: ".concat(index));
      }

      if (typeof item.id === "undefined" || typeof item.name === "undefined") {
        console.error('Resource property missed', index, item);
        throw new Error("Resource property undefined: ".concat(index));
      }
    });
  }, [resources]);

  var _setScrollToSpecialMoment = (0, _react.useCallback)(function (scrollToSpecialMoment) {
    if (config.scrollToSpecialMomentEnabled) {
      setScrollToSpecialMoment(scrollToSpecialMoment);
    }
  }, [config.scrollToSpecialMomentEnabled]);

  var _validateMinuteStep = function _validateMinuteStep(minuteStep) {
    if (60 % minuteStep !== 0) {
      console.error('Minute step is not set properly - 60 minutes must be divisible without remainder by this number');
      throw new Error('Minute step is not set properly - 60 minutes must be divisible without remainder by this number');
    }
  };

  var _resolveDate = (0, _react.useCallback)(function (viewType, num, date) {
    var setDates = function setDates(type) {
      var newStartDate, newEndDate;
      newStartDate = typeof date !== "undefined" ? localeMoment(date).startOf(type) : num !== 0 ? localeMoment(startDate).add(num, type + "s") : localeMoment(startDate).startOf(type);
      newEndDate = localeMoment(newStartDate).endOf(type);
      setStartDate(newStartDate.format(DATE_FORMAT));
      setStartDateObj(newStartDate);
      setEndDate(newEndDate.format(DATE_FORMAT));
      setEndDateObj(newEndDate);
      var newSelectDate = typeof date !== "undefined" ? localeMoment(date) : selectDateObj.add(num, type + "s");

      if (!(newSelectDate >= newStartDate && newSelectDate <= newEndDate)) {
        newSelectDate = newStartDate;
      }

      setSelectDate(newSelectDate.format(DATE_FORMAT));
      setSelectDateObj(newSelectDate);
    };

    switch (viewType) {
      case _ViewTypes.default.Week:
        setDates("week");
        break;

      case _ViewTypes.default.Day:
        setDates("day");
        break;

      case _ViewTypes.default.Month:
        setDates("month");
        break;

      case _ViewTypes.default.Quarter:
        setDates("quarter");
        break;

      case _ViewTypes.default.Year:
        setDates("year");
        break;

      default:
    }
  }, [localeMoment, selectDateObj, startDate]);

  var _createHeaderEvent = function _createHeaderEvent(expanded, span, eventItem) {
    return {
      expanded: expanded,
      span: span,
      eventItem: eventItem
    };
  };

  var _createHeaders = (0, _react.useCallback)(function () {
    var headers = [],
        start = localeMoment(startDate),
        end = localeMoment(endDate),
        header = start;

    if (showAgenda) {
      headers.push({
        time: header.format(DATETIME_FORMAT),
        nonWorkingTime: false
      });
    } else {
      if (cellUnit === _CellUnits.default.Hour) {
        start = start.add(config.dayStartFrom, 'hours');
        end = end.add(config.dayStopTo, 'hours');
        header = start;

        while (header >= start && header <= end) {
          var minuteSteps = getMinuteStepsInHour();

          for (var i = 0; i < minuteSteps; i++) {
            var hour = header.hour();

            if (hour >= config.dayStartFrom && hour <= config.dayStopTo) {
              var time = header.format(DATETIME_FORMAT);
              var nonWorkingTime = behaviors.isNonWorkingTimeFunc(localeMoment, time, cellUnit);
              headers.push({
                time: time,
                nonWorkingTime: nonWorkingTime
              });
            }

            header = header.add(config.minuteStep, 'minutes');
          }
        }
      } else {
        while (header >= start && header <= end) {
          var _time = header.format(DATETIME_FORMAT);

          var dayOfWeek = header.weekday();

          if (config.displayWeekend || dayOfWeek !== 0 && dayOfWeek !== 6) {
            var _nonWorkingTime = behaviors.isNonWorkingTimeFunc(localeMoment, _time, cellUnit);

            headers.push({
              time: _time,
              nonWorkingTime: _nonWorkingTime
            });
          }

          header = header.add(1, 'days');
        }
      }
    }

    return headers;
  }, [behaviors, cellUnit, config.dayStartFrom, config.dayStopTo, config.displayWeekend, config.minuteStep, endDate, getMinuteStepsInHour, localeMoment, showAgenda, startDate]);

  var _getSpan = (0, _react.useCallback)(function (startTime, endTime) {
    var headers = _createHeaders();

    if (showAgenda) return 1;
    var start = localeMoment(startTime),
        end = localeMoment(endTime),
        span = 0;

    var _iterator = (0, _createForOfIteratorHelper2.default)(headers),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var header = _step.value;
        var spanStart = localeMoment(header.time),
            spanEnd = cellUnit === _CellUnits.default.Hour ? localeMoment(header.time).add(config.minuteStep, 'minutes') : localeMoment(header.time).add(1, 'days');

        if (spanStart < end && spanEnd > start) {
          span++;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return span;
  }, [_createHeaders, cellUnit, config.minuteStep, localeMoment, showAgenda]);

  var _getEventGroupId = function _getEventGroupId(event) {
    return !!event.groupId ? event.groupId.toString() : event.id.toString();
  };

  var _getEventSlotId = (0, _react.useCallback)(function (event) {
    return isEventPerspective ? _getEventGroupId(event) : event.resourceId;
  }, [isEventPerspective]);

  var getCellMaxEvents = (0, _react.useCallback)(function () {
    return viewType === _ViewTypes.default.Week ? config.weekMaxEvents : viewType === _ViewTypes.default.Day ? config.dayMaxEvents : viewType === _ViewTypes.default.Month ? config.monthMaxEvents : viewType === _ViewTypes.default.Year ? config.yearMaxEvents : viewType === _ViewTypes.default.Quarter ? config.quarterMaxEvents : config.customMaxEvents;
  }, [config.customMaxEvents, config.dayMaxEvents, config.monthMaxEvents, config.quarterMaxEvents, config.weekMaxEvents, config.yearMaxEvents, viewType]);

  var _createInitHeaderEvents = (0, _react.useCallback)(function (header) {
    var start = localeMoment(header.time),
        startValue = start.format(DATETIME_FORMAT);
    var endValue = showAgenda ? viewType === _ViewTypes.default.Week ? start.add(1, 'weeks').format(DATETIME_FORMAT) : viewType === _ViewTypes.default.Day ? start.add(1, 'days').format(DATETIME_FORMAT) : viewType === _ViewTypes.default.Month ? start.add(1, 'months').format(DATETIME_FORMAT) : viewType === _ViewTypes.default.Year ? start.add(1, 'years').format(DATETIME_FORMAT) : viewType === _ViewTypes.default.Quarter ? start.add(1, 'quarters').format(DATETIME_FORMAT) : localeMoment(endDate).add(1, 'days').format(DATETIME_FORMAT) : cellUnit === _CellUnits.default.Hour ? start.add(config.minuteStep, 'minutes').format(DATETIME_FORMAT) : start.add(1, 'days').format(DATETIME_FORMAT); // noinspection JSConsecutiveCommasInArrayLiteral

    return {
      time: header.time,
      nonWorkingTime: header.nonWorkingTime,
      start: startValue,
      end: endValue,
      count: 0,
      addMore: 0,
      addMoreIndex: 0,
      // eslint-disable-next-line no-sparse-arrays
      events: [,,,]
    };
  }, [cellUnit, config.minuteStep, endDate, localeMoment, showAgenda, viewType]);

  var _createInitRenderData = (0, _react.useCallback)(function () {
    var headers = _createHeaders();

    var slots = isEventPerspective ? eventGroups : resources;
    var slotTree = [],
        slotMap = new Map();
    slots.forEach(function (slot) {
      var headerEvents = headers.map(function (header) {
        return _createInitHeaderEvents(header);
      });
      var expanded = !hiddenSlots.includes(slot.id);
      var slotRenderData = {
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
        expanded: expanded
      };
      var id = slot.id;
      var value = undefined;

      if (slotMap.has(id)) {
        value = slotMap.get(id);
        value.data = slotRenderData;
      } else {
        value = {
          data: slotRenderData,
          children: []
        };
        slotMap.set(id, value);
      }

      var parentId = slot.parentId;

      if (!parentId || parentId === id) {
        slotTree.push(value);
      } else {
        var parentValue = undefined;

        if (slotMap.has(parentId)) {
          parentValue = slotMap.get(parentId);
        } else {
          parentValue = {
            data: undefined,
            children: []
          };
          slotMap.set(parentId, parentValue);
        }

        parentValue.children.push(value);
      }
    });
    var slotStack = [];
    var i;

    for (i = slotTree.length - 1; i >= 0; i--) {
      slotStack.push(slotTree[i]);
    }

    var initRenderData = [];
    var currentNode = undefined;

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
  }, [_createHeaders, _createInitHeaderEvents, config.defaultExpanded, config.eventItemLineHeight, config.nonAgendaSlotMinHeight, eventGroups, hiddenSlots, isEventPerspective, resources]);

  var _createRenderData = (0, _react.useCallback)(function () {
    var initRenderData = _createInitRenderData(); //this.events.sort(this._compare);


    var cellMaxEventsCount = getCellMaxEvents();
    var cellMaxEventsCountValue = 30;
    events.forEach(function (item) {
      var resourceEventsList = initRenderData.filter(function (x) {
        return x.slotId === _getEventSlotId(item);
      });

      if (resourceEventsList.length > 0) {
        var resourceEvents = resourceEventsList[0];

        var span = _getSpan(item.start, item.end);

        var eventStart = localeMoment(item.start),
            eventEnd = localeMoment(item.end);
        var pos = -1;
        resourceEvents.headerItems.forEach(function (header, index) {
          var headerStart = localeMoment(header.start),
              headerEnd = localeMoment(header.end);

          if (headerEnd > eventStart && headerStart < eventEnd) {
            header.count = header.count + 1;

            if (header.count > resourceEvents.rowMaxCount) {
              resourceEvents.rowMaxCount = header.count;
              var rowsCount = cellMaxEventsCount <= cellMaxEventsCountValue && resourceEvents.rowMaxCount > cellMaxEventsCount ? cellMaxEventsCount : resourceEvents.rowMaxCount;
              var newRowHeight = rowsCount * config.eventItemLineHeight + (config.creatable && config.checkConflict === false ? 20 : 2);
              if (newRowHeight > resourceEvents.rowHeight) resourceEvents.rowHeight = newRowHeight;
            }

            if (pos === -1) {
              var tmp = 0;

              while (header.events[tmp] !== undefined) {
                tmp++;
              }

              pos = tmp;
            }

            var render = headerStart <= eventStart || index === 0;

            if (render === false) {
              var previousHeader = resourceEvents.headerItems[index - 1];
              var previousHeaderStart = localeMoment(previousHeader.start),
                  previousHeaderEnd = localeMoment(previousHeader.end);
              if (previousHeaderEnd <= eventStart || previousHeaderStart >= eventEnd) render = true;
            }

            header.events[pos] = _createHeaderEvent(render, span, item);
          }
        });
      }
    });

    if (cellMaxEventsCount <= cellMaxEventsCountValue || behaviors.getSummaryFunc !== undefined) {
      initRenderData.forEach(function (resourceEvents) {
        var hasSummary = false;
        resourceEvents.headerItems.forEach(function (headerItem) {
          if (cellMaxEventsCount <= cellMaxEventsCountValue) {
            var renderItemsCount = 0,
                addMoreIndex = 0,
                index = 0;

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
            var _events = [];
            headerItem.events.forEach(function (e) {
              if (!!e && !!e.eventItem) _events.push(e.eventItem);
            });
            headerItem.summary = behaviors.getSummaryFunc(_events, resourceEvents.slotId, resourceEvents.slotName, headerItem.start, headerItem.end);
            if (!!headerItem.summary && typeof headerItem.summary.text !== "undefined") hasSummary = true;
          }
        });
        resourceEvents.hasSummary = hasSummary;

        if (hasSummary) {
          var rowsCount = cellMaxEventsCount <= cellMaxEventsCountValue && resourceEvents.rowMaxCount > cellMaxEventsCount ? cellMaxEventsCount : resourceEvents.rowMaxCount;
          var newRowHeight = (rowsCount + 1) * config.eventItemLineHeight + (config.creatable && config.checkConflict === false ? 20 : 2);
          if (newRowHeight > resourceEvents.rowHeight) resourceEvents.rowHeight = newRowHeight;
        }
      });
    }

    return initRenderData;
  }, [_createInitRenderData, _getEventSlotId, _getSpan, behaviors, config.checkConflict, config.creatable, config.eventItemLineHeight, events, getCellMaxEvents, localeMoment]);

  var _setDocumentWidth = function _setDocumentWidth(documentWidth) {
    if (documentWidth >= 0) {
      setDocumentWidth(documentWidth);
    }
  };

  var getDateLabel = (0, _react.useCallback)(function () {
    var start = localeMoment(startDate);
    var end = localeMoment(endDate);
    var dateLabel = start.format('LL');

    if (start !== end) {
      dateLabel = "".concat(start.format('LL'), "-").concat(end.format('LL'));
    }

    if (!!behaviors.getDateLabelFunc) dateLabel = behaviors.getDateLabelFunc(localeMoment, viewType, startDate, endDate);
    return dateLabel;
  }, [behaviors, endDate, localeMoment, startDate, viewType]);

  var getTableHeaderHeight = function getTableHeaderHeight() {
    return config.tableHeaderHeight;
  };

  var getSchedulerContentDesiredHeight = function getSchedulerContentDesiredHeight() {
    var height = 0;

    _createRenderData().forEach(function (item) {
      if (item.expanded) height += item.rowHeight;
    });

    return height;
  };

  var getSlots = function getSlots() {
    return isEventPerspective ? eventGroups : resources;
  };

  var getSlotById = function getSlotById(slotId) {
    var slots = getSlots();
    return slots.find(function (item) {
      return item.id === slotId;
    });
  };

  (0, _react.useEffect)(function () {
    if (props.config) {
      var newConfig = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, config), props.config);
      setConfig(newConfig);

      _validateMinuteStep(newConfig.minuteStep);
    }

    if (props.behaviors) {
      var newBehaviors = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, behaviors), props.behaviors);
      setBehaviors(newBehaviors);
    }

    _setDocumentWidth(document.documentElement.clientWidth);

    _validateResource();

    _setScrollToSpecialMoment(true);
  }, []);
  (0, _react.useEffect)(function () {
    var newDate = localeMoment(props.date).format(DATE_FORMAT);

    if (newDate !== selectDate) {
      _resolveDate(viewType, 0, newDate);
    }
  }, [props.date]);

  var isSchedulerResponsive = function isSchedulerResponsive() {
    return !!config.schedulerWidth.endsWith && config.schedulerWidth.endsWith("%");
  };

  var getSchedulerWidth = function getSchedulerWidth() {
    var baseWidth = documentWidth - config.besidesWidth > 0 ? documentWidth - config.besidesWidth : 0;
    return isSchedulerResponsive() ? parseInt(baseWidth * Number(config.schedulerWidth.slice(0, -1)) / 100) : config.schedulerWidth;
  };

  var getContentCellConfigWidth = function getContentCellConfigWidth() {
    return viewType === _ViewTypes.default.Week ? config.weekCellWidth : viewType === _ViewTypes.default.Day ? config.dayCellWidth : viewType === _ViewTypes.default.Month ? config.monthCellWidth : viewType === _ViewTypes.default.Year ? config.yearCellWidth : viewType === _ViewTypes.default.Quarter ? config.quarterCellWidth : config.customCellWidth;
  };

  var isContentViewResponsive = function isContentViewResponsive() {
    var contentCellWidth = getContentCellConfigWidth();
    return !!contentCellWidth.endsWith && contentCellWidth.endsWith("%");
  };

  var getContentCellWidth = function getContentCellWidth() {
    var contentCellConfigWidth = getContentCellConfigWidth();
    var schedulerWidth = getSchedulerWidth();
    return isContentViewResponsive() ? parseInt(schedulerWidth * Number(contentCellConfigWidth.slice(0, -1)) / 100) : contentCellConfigWidth;
  };

  var getContentTableWidth = function getContentTableWidth() {
    return _createHeaders().length * getContentCellWidth();
  };

  var isResourceViewResponsive = function isResourceViewResponsive() {
    var resourceTableWidth = getResourceTableConfigWidth();
    return !!resourceTableWidth.endsWith && resourceTableWidth.endsWith("%");
  };

  var getResourceTableConfigWidth = function getResourceTableConfigWidth() {
    if (showAgenda) return config.agendaResourceTableWidth;
    return viewType === _ViewTypes.default.Week ? config.weekResourceTableWidth : viewType === _ViewTypes.default.Day ? config.dayResourceTableWidth : viewType === _ViewTypes.default.Month ? config.monthResourceTableWidth : viewType === _ViewTypes.default.Year ? config.yearResourceTableWidth : viewType === _ViewTypes.default.Quarter ? config.quarterResourceTableWidth : config.customResourceTableWidth;
  };

  var getResourceTableWidth = function getResourceTableWidth() {
    var resourceTableConfigWidth = getResourceTableConfigWidth();
    var schedulerWidth = getSchedulerWidth();
    var resourceTableWidth = isResourceViewResponsive() ? parseInt(schedulerWidth * Number(resourceTableConfigWidth.slice(0, -1)) / 100) : resourceTableConfigWidth;
    if (isSchedulerResponsive() && getContentTableWidth() + resourceTableWidth < schedulerWidth) resourceTableWidth = schedulerWidth - getContentTableWidth();
    return resourceTableWidth;
  };

  var _startResizing = function _startResizing() {
    setResizing(true);
  };

  var _stopResizing = function _stopResizing() {
    setResizing(false);
  };

  var _setViewType = function _setViewType(newViewType, showAgenda, isEventPerspective) {
    if (viewType === newViewType) return;

    _resolveDate(newViewType, 0);

    _setScrollToSpecialMoment(true);

    if (newViewType === _ViewTypes.default.Day) {
      setCellUnit(_CellUnits.default.Hour);
    } else {
      setCellUnit(_CellUnits.default.Day);
    }

    setShowAgenda(showAgenda);
    setIsEventPerspective(isEventPerspective);
    setViewType(newViewType);

    if (props.onViewChange) {
      props.onViewChange({
        viewType: newViewType,
        showAgenda: showAgenda,
        isEventPerspective: isEventPerspective
      });
    }
  };

  var prev = function prev() {
    _resolveDate(viewType, -1);

    if (props.onNavigate) {
      props.onNavigate(selectDateObj.toDate(), startDateObj.toDate(), endDateObj.toDate());
    }
  };

  var next = function next() {
    _resolveDate(viewType, 1);

    if (props.onNavigate) {
      props.onNavigate(selectDateObj.toDate(), startDateObj.toDate(), endDateObj.toDate());
    }
  };

  var onSlotItemExpandToggle = function onSlotItemExpandToggle(expanded, slotId) {
    var newHiddenSlots = expanded ? hiddenSlots.filter(function (s) {
      return s !== slotId;
    }) : [].concat((0, _toConsumableArray2.default)(hiddenSlots), [slotId]);
    setHiddenSlots(newHiddenSlots);

    if (props.onSlotItemExpandToggle) {
      props.onSlotItemExpandToggle(expanded, slotId);
    }
  };

  var clearSelection = function clearSelection() {
    setSelectedSlot(null);
  };

  var onSelection = function onSelection(slotId, slotName, startTime, endTime, selectionLeft, selectionWidth) {
    setSelectedSlot({
      slotId: slotId,
      left: selectionLeft,
      width: selectionWidth
    });

    if (props.onSelection) {
      props.onSelection(slotId, slotName, startTime, endTime, clearSelection);
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_SchedulerMain.default, Object.assign({}, props, {
    headers: _createHeaders(),
    renderData: _createRenderData(),
    cellUnit: cellUnit,
    viewType: viewType,
    config: config,
    behaviors: behaviors,
    showAgenda: showAgenda,
    isEventPerspective: isEventPerspective,
    isResizing: resizing,
    startResizing: _startResizing,
    stopResizing: _stopResizing,
    dateLabel: getDateLabel(),
    width: getSchedulerWidth(),
    tableHeaderHeight: getTableHeaderHeight(),
    contentCellWidth: getContentCellWidth(),
    cellMaxEvents: getCellMaxEvents(),
    minuteStepsInHour: getMinuteStepsInHour(),
    resourceTableWidth: getResourceTableWidth() // schedulerWidth={getContentTableWidth() - 1}
    ,
    schedulerWidth: getContentTableWidth(),
    contentHeight: getSchedulerContentDesiredHeight(),
    isSchedulerResponsive: isSchedulerResponsive(),
    setDocumentWidth: _setDocumentWidth,
    scrollToSpecialMoment: scrollToSpecialMoment,
    setScrollToSpecialMoment: setScrollToSpecialMoment,
    localeMoment: localeMoment,
    startDate: startDate,
    endDate: endDate,
    getEventSlotId: _getEventSlotId,
    getSlotById: getSlotById,
    onViewChange: _setViewType,
    onMoveEvent: props.onMoveEvent,
    selectedSlot: selectedSlot,
    onSelection: onSelection,
    onSlotItemExpandToggle: onSlotItemExpandToggle,
    onClickPrevious: prev,
    onClickNext: next
  })));
};

var DATE_FORMAT = 'YYYY-MM-DD';
exports.DATE_FORMAT = DATE_FORMAT;
var DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
exports.DATETIME_FORMAT = DATETIME_FORMAT;
var _default = Scheduler;
exports.default = _default;