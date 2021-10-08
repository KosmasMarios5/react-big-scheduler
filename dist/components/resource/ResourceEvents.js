"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _AddMore = _interopRequireDefault(require("../addMore/AddMore"));

var _Summary = _interopRequireDefault(require("../summary/Summary"));

var _SelectedArea = _interopRequireDefault(require("./SelectedArea"));

var _Util = require("../../helpers/Util");

var _DnDTypes = require("../dnd/DnDTypes");

var _DnDSource = _interopRequireDefault(require("../dnd/DnDSource"));

var _CellUnits = _interopRequireDefault(require("../../types/CellUnits"));

var _SummaryPos = _interopRequireDefault(require("../../types/SummaryPos"));

var _index = require("../../index");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var supportTouch = ('ontouchstart' in window);

var ResourceEvents = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(ResourceEvents, _Component);

  var _super = (0, _createSuper2.default)(ResourceEvents);

  function ResourceEvents(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ResourceEvents);
    _this = _super.call(this, props);

    _this.initDrag = function (ev) {
      var isSelecting = _this.state.isSelecting;
      if (isSelecting) return;
      if ((ev.srcElement || ev.target) !== _this.eventContainer) return;
      ev.stopPropagation();
      var _this$props = _this.props,
          resourceEvents = _this$props.resourceEvents,
          contentCellWidth = _this$props.contentCellWidth;
      if (resourceEvents.groupOnly) return;
      var clientX = 0;

      if (supportTouch) {
        if (ev.changedTouches.length === 0) return;
        var touch = ev.changedTouches[0];
        clientX = touch.pageX;
      } else {
        if (ev.buttons !== undefined && ev.buttons !== 1) return;
        clientX = ev.clientX;
      }

      var cellWidth = contentCellWidth;
      var pos = (0, _Util.getPos)(_this.eventContainer);
      var startX = clientX - pos.x;
      var leftIndex = Math.floor(startX / cellWidth);
      var left = leftIndex * cellWidth;
      var rightIndex = Math.ceil(startX / cellWidth);
      var width = (rightIndex - leftIndex) * cellWidth;

      _this.setState({
        startX: startX,
        left: left,
        leftIndex: leftIndex,
        width: width,
        rightIndex: rightIndex,
        isSelecting: true
      });

      if (supportTouch) {
        document.documentElement.addEventListener('touchmove', _this.doDrag, false);
        document.documentElement.addEventListener('touchend', _this.stopDrag, false);
        document.documentElement.addEventListener('touchcancel', _this.cancelDrag, false);
      } else {
        document.documentElement.addEventListener('mousemove', _this.doDrag, false);
        document.documentElement.addEventListener('mouseup', _this.stopDrag, false);
      }

      document.onselectstart = function () {
        return false;
      };

      document.ondragstart = function () {
        return false;
      };
    };

    _this.doDrag = function (ev) {
      ev.stopPropagation();
      var clientX = 0;

      if (supportTouch) {
        if (ev.changedTouches.length === 0) return;
        var touch = ev.changedTouches[0];
        clientX = touch.pageX;
      } else {
        clientX = ev.clientX;
      }

      var startX = _this.state.startX;
      var _this$props2 = _this.props,
          headers = _this$props2.headers,
          contentCellWidth = _this$props2.contentCellWidth;
      var cellWidth = contentCellWidth;
      var pos = (0, _Util.getPos)(_this.eventContainer);
      var currentX = clientX - pos.x;
      var leftIndex = Math.floor(Math.min(startX, currentX) / cellWidth);
      leftIndex = leftIndex < 0 ? 0 : leftIndex;
      var left = leftIndex * cellWidth;
      var rightIndex = Math.ceil(Math.max(startX, currentX) / cellWidth);
      rightIndex = rightIndex > headers.length ? headers.length : rightIndex;
      var width = (rightIndex - leftIndex) * cellWidth;

      _this.setState({
        leftIndex: leftIndex,
        left: left,
        rightIndex: rightIndex,
        width: width,
        isSelecting: true
      });
    };

    _this.stopDrag = function (ev) {
      ev.stopPropagation();
      var _this$props3 = _this.props,
          onCellClick = _this$props3.onCellClick,
          resourceEvents = _this$props3.resourceEvents;
      var _this$props4 = _this.props,
          headers = _this$props4.headers,
          events = _this$props4.events,
          config = _this$props4.config,
          cellUnit = _this$props4.cellUnit,
          localeMoment = _this$props4.localeMoment;
      var _this$state = _this.state,
          leftIndex = _this$state.leftIndex,
          rightIndex = _this$state.rightIndex;

      if (supportTouch) {
        document.documentElement.removeEventListener('touchmove', _this.doDrag, false);
        document.documentElement.removeEventListener('touchend', _this.stopDrag, false);
        document.documentElement.removeEventListener('touchcancel', _this.cancelDrag, false);
      } else {
        document.documentElement.removeEventListener('mousemove', _this.doDrag, false);
        document.documentElement.removeEventListener('mouseup', _this.stopDrag, false);
      }

      document.onselectstart = null;
      document.ondragstart = null;
      var startTime = headers[leftIndex].time;
      var endTime = resourceEvents.headerItems[rightIndex - 1].end;
      if (cellUnit !== _CellUnits.default.Hour) endTime = localeMoment(resourceEvents.headerItems[rightIndex - 1].start).hour(23).minute(59).second(59).format(_index.DATETIME_FORMAT);
      var slotId = resourceEvents.slotId;
      var slotName = resourceEvents.slotName;

      _this.setState({
        startX: 0,
        leftIndex: 0,
        left: 0,
        rightIndex: 0,
        width: 0,
        isSelecting: false
      });

      var hasConflict = false;

      if (config.checkConflict) {
        var start = localeMoment(startTime),
            end = localeMoment(endTime);
        var getEventSlotId = _this.props.getEventSlotId;
        events.forEach(function (e) {
          if (getEventSlotId(e) === slotId) {
            var eStart = localeMoment(e.start),
                eEnd = localeMoment(e.end);
            if (start >= eStart && start < eEnd || end > eStart && end <= eEnd || eStart >= start && eStart < end || eEnd > start && eEnd <= end) hasConflict = true;
          }
        });
      }

      if (hasConflict) {
        var conflictOccurred = _this.props.conflictOccurred;

        if (typeof conflictOccurred !== "undefined") {
          conflictOccurred('New', {
            id: undefined,
            start: startTime,
            end: endTime,
            slotId: slotId,
            slotName: slotName,
            title: undefined
          }, _DnDTypes.DnDTypes.EVENT, slotId, slotName, startTime, endTime);
        } else {
          console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
        }
      } else {
        if (typeof onCellClick !== "undefined") onCellClick(slotId, slotName, startTime, endTime);
      }
    };

    _this.cancelDrag = function (ev) {
      ev.stopPropagation();
      var isSelecting = _this.state.isSelecting;

      if (isSelecting) {
        document.documentElement.removeEventListener('touchmove', _this.doDrag, false);
        document.documentElement.removeEventListener('touchend', _this.stopDrag, false);
        document.documentElement.removeEventListener('touchcancel', _this.cancelDrag, false);
        document.onselectstart = null;
        document.ondragstart = null;

        _this.setState({
          startX: 0,
          leftIndex: 0,
          left: 0,
          rightIndex: 0,
          width: 0,
          isSelecting: false
        });
      }
    };

    _this.onAddMoreClick = function (headerItem) {
      var _this$props5 = _this.props,
          onSetAddMoreState = _this$props5.onSetAddMoreState,
          resourceEvents = _this$props5.resourceEvents,
          config = _this$props5.config,
          contentCellWidth = _this$props5.contentCellWidth;

      if (!!onSetAddMoreState) {
        var cellWidth = contentCellWidth;
        var index = resourceEvents.headerItems.indexOf(headerItem);

        if (index !== -1) {
          var left = index * (cellWidth - 1);
          var pos = (0, _Util.getPos)(_this.eventContainer);
          left = left + pos.x;
          var top = pos.y;
          var height = (headerItem.count + 1) * config.eventItemLineHeight + 20;
          onSetAddMoreState({
            headerItem: headerItem,
            left: left,
            top: top,
            height: height
          });
        }
      }
    };

    _this.eventContainerRef = function (element) {
      _this.eventContainer = element;
    };

    _this.state = {
      isSelecting: false,
      left: 0,
      width: 0
    };
    return _this;
  }

  (0, _createClass2.default)(ResourceEvents, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var config = this.props.config;

      if (config.creatable === true) {
        if (supportTouch) {// this.eventContainer.addEventListener('touchstart', this.initDrag, false);
        } else {
          this.eventContainer.addEventListener('mousedown', this.initDrag, false);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (supportTouch) {// this.eventContainer.removeEventListener('touchstart', this.initDrag, false);
      } else {
        this.eventContainer.removeEventListener('mousedown', this.initDrag, false);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props6 = this.props,
          resourceEvents = _this$props6.resourceEvents,
          connectDropTarget = _this$props6.connectDropTarget;
      var _this$props7 = this.props,
          cellUnit = _this$props7.cellUnit,
          startDate = _this$props7.startDate,
          endDate = _this$props7.endDate,
          config = _this$props7.config,
          localeMoment = _this$props7.localeMoment,
          contentCellWidth = _this$props7.contentCellWidth,
          cellMaxEvents = _this$props7.cellMaxEvents,
          schedulerWidth = _this$props7.schedulerWidth;
      var _this$state2 = this.state,
          isSelecting = _this$state2.isSelecting,
          left = _this$state2.left,
          width = _this$state2.width;
      var cellWidth = contentCellWidth;
      var rowWidth = schedulerWidth + 1;
      var selectedArea = isSelecting ? /*#__PURE__*/_react.default.createElement(_SelectedArea.default, Object.assign({}, this.props, {
        left: left,
        width: width
      })) : /*#__PURE__*/_react.default.createElement("div", null);
      var eventList = [];
      resourceEvents.headerItems.forEach(function (headerItem, index) {
        if (headerItem.count > 0 || typeof headerItem.summary !== "undefined") {
          var isTop = config.summaryPos === _SummaryPos.default.TopRight || config.summaryPos === _SummaryPos.default.Top || config.summaryPos === _SummaryPos.default.TopLeft;
          var marginTop = resourceEvents.hasSummary && isTop ? 1 + config.eventItemLineHeight : 1;
          var renderEventsMaxIndex = headerItem.addMore === 0 ? cellMaxEvents : headerItem.addMoreIndex;
          headerItem.events.forEach(function (evt, idx) {
            if (idx < renderEventsMaxIndex && evt !== undefined && evt.expanded) {
              var durationStart = localeMoment(startDate);
              var durationEnd = localeMoment(endDate).add(1, 'days');

              if (cellUnit === _CellUnits.default.Hour) {
                durationStart = localeMoment(startDate).add(config.dayStartFrom, 'hours');
                durationEnd = localeMoment(endDate).add(config.dayStopTo + 1, 'hours');
              }

              var eventStart = localeMoment(evt.eventItem.start);
              var eventEnd = localeMoment(evt.eventItem.end);
              var isStart = eventStart >= durationStart;
              var isEnd = eventEnd <= durationEnd;

              var _left = index * cellWidth + (index > 0 ? 2 : 3);

              var _width = evt.span * cellWidth - (index > 0 ? 5 : 6) > 0 ? evt.span * cellWidth - (index > 0 ? 5 : 6) : 0;

              var top = marginTop + idx * config.eventItemLineHeight;

              var eventItem = /*#__PURE__*/_react.default.createElement(_DnDSource.default, Object.assign({}, _this2.props, {
                key: evt.eventItem.id,
                eventItem: evt.eventItem,
                isStart: isStart,
                isEnd: isEnd,
                isInPopover: false,
                left: _left,
                width: _width,
                top: top,
                leftIndex: index,
                rightIndex: index + evt.span
              }));

              eventList.push(eventItem);
            }
          });

          if (headerItem.addMore > 0) {
            var _left2 = index * cellWidth + (index > 0 ? 2 : 3);

            var _width2 = cellWidth - (index > 0 ? 5 : 6);

            var top = marginTop + headerItem.addMoreIndex * config.eventItemLineHeight;

            var addMoreItem = /*#__PURE__*/_react.default.createElement(_AddMore.default, Object.assign({}, _this2.props, {
              key: headerItem.time,
              headerItem: headerItem,
              number: headerItem.addMore,
              left: _left2,
              width: _width2,
              top: top,
              clickAction: _this2.onAddMoreClick
            }));

            eventList.push(addMoreItem);
          }

          if (typeof headerItem.summary !== "undefined") {
            var _top = isTop ? 1 : resourceEvents.rowHeight - config.eventItemLineHeight + 1;

            var _left3 = index * cellWidth + (index > 0 ? 2 : 3);

            var _width3 = cellWidth - (index > 0 ? 5 : 6);

            var key = "".concat(resourceEvents.slotId, "_").concat(headerItem.time);

            var summary = /*#__PURE__*/_react.default.createElement(_Summary.default, {
              key: key,
              config: config,
              summary: headerItem.summary,
              left: _left3,
              width: _width3,
              top: _top
            });

            eventList.push(summary);
          }
        }
      });
      return /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
        style: {
          width: rowWidth
        }
      }, connectDropTarget( /*#__PURE__*/_react.default.createElement("div", {
        ref: this.eventContainerRef,
        className: "event-container",
        style: {
          height: resourceEvents.rowHeight
        }
      }, selectedArea, eventList))));
    }
  }]);
  return ResourceEvents;
}(_react.Component);

var _default = ResourceEvents;
exports.default = _default;