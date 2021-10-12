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

var _DnDTypes = require("../dnd/DnDTypes");

var _index = require("../../index");

var _CellUnits = _interopRequireDefault(require("../../types/CellUnits"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var supportTouch = ('ontouchstart' in window);

var EventItem = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EventItem, _Component);

  var _super = (0, _createSuper2.default)(EventItem);

  function EventItem(_props) {
    var _this;

    (0, _classCallCheck2.default)(this, EventItem);
    _this = _super.call(this, _props);

    _this.initStartDrag = function (ev) {
      var _this$props = _this.props,
          eventItem = _this$props.eventItem,
          getEventSlotId = _this$props.getEventSlotId,
          getSlotById = _this$props.getSlotById,
          isResizing = _this$props.isResizing,
          startResizing = _this$props.startResizing;
      var slotId = getEventSlotId(eventItem);
      var slot = getSlotById(slotId);
      if (!!slot && !!slot.groupOnly) return;
      if (isResizing) return;
      ev.stopPropagation();
      var clientX = 0;

      if (supportTouch) {
        if (ev.changedTouches.length === 0) return;
        var touch = ev.changedTouches[0];
        clientX = touch.pageX;
      } else {
        if (ev.buttons !== undefined && ev.buttons !== 1) return;
        clientX = ev.clientX;
      }

      _this.setState({
        startX: clientX
      });

      startResizing();

      if (supportTouch) {
        _this.startResizer.addEventListener('touchmove', _this.doStartDrag, false);

        _this.startResizer.addEventListener('touchend', _this.stopStartDrag, false);

        _this.startResizer.addEventListener('touchcancel', _this.cancelStartDrag, false);
      } else {
        document.documentElement.addEventListener('mousemove', _this.doStartDrag, false);
        document.documentElement.addEventListener('mouseup', _this.stopStartDrag, false);
      }

      document.onselectstart = function () {
        return false;
      };

      document.ondragstart = function () {
        return false;
      };
    };

    _this.doStartDrag = function (ev) {
      ev.stopPropagation();
      var clientX = 0;

      if (supportTouch) {
        if (ev.changedTouches.length === 0) return;
        var touch = ev.changedTouches[0];
        clientX = touch.pageX;
      } else {
        clientX = ev.clientX;
      }

      var _this$props2 = _this.props,
          left = _this$props2.left,
          width = _this$props2.width,
          leftIndex = _this$props2.leftIndex,
          rightIndex = _this$props2.rightIndex,
          contentCellWidth = _this$props2.contentCellWidth;
      var cellWidth = contentCellWidth;
      var offset = leftIndex > 0 ? 5 : 6;
      var minWidth = cellWidth - offset;
      var maxWidth = rightIndex * cellWidth - offset;
      var startX = _this.state.startX;
      var newLeft = left + clientX - startX;
      var newWidth = width + startX - clientX;

      if (newWidth < minWidth) {
        newWidth = minWidth;
        newLeft = (rightIndex - 1) * cellWidth + (rightIndex - 1 > 0 ? 2 : 3);
      } else if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newLeft = 3;
      }

      _this.setState({
        left: newLeft,
        width: newWidth
      });
    };

    _this.stopStartDrag = function (ev) {
      ev.stopPropagation();

      if (supportTouch) {
        _this.startResizer.removeEventListener('touchmove', _this.doStartDrag, false);

        _this.startResizer.removeEventListener('touchend', _this.stopStartDrag, false);

        _this.startResizer.removeEventListener('touchcancel', _this.cancelStartDrag, false);
      } else {
        document.documentElement.removeEventListener('mousemove', _this.doStartDrag, false);
        document.documentElement.removeEventListener('mouseup', _this.stopStartDrag, false);
      }

      document.onselectstart = null;
      document.ondragstart = null;
      var _this$props3 = _this.props,
          width = _this$props3.width,
          left = _this$props3.left,
          top = _this$props3.top,
          leftIndex = _this$props3.leftIndex,
          rightIndex = _this$props3.rightIndex,
          eventItem = _this$props3.eventItem,
          updateEventStart = _this$props3.updateEventStart,
          conflictOccurred = _this$props3.conflictOccurred,
          stopResizing = _this$props3.stopResizing,
          getEventSlotId = _this$props3.getEventSlotId,
          getSlotById = _this$props3.getSlotById;
      stopResizing();
      if (_this.state.width === width) return;
      var clientX = 0;

      if (supportTouch) {
        if (ev.changedTouches.length === 0) {
          _this.setState({
            left: left,
            top: top,
            width: width
          });

          return;
        }

        var touch = ev.changedTouches[0];
        clientX = touch.pageX;
      } else {
        clientX = ev.clientX;
      }

      var _this$props4 = _this.props,
          cellUnit = _this$props4.cellUnit,
          events = _this$props4.events,
          config = _this$props4.config,
          localeMoment = _this$props4.localeMoment,
          contentCellWidth = _this$props4.contentCellWidth;
      var cellWidth = contentCellWidth;
      var offset = leftIndex > 0 ? 5 : 6;
      var minWidth = cellWidth - offset;
      var maxWidth = rightIndex * cellWidth - offset;
      var startX = _this.state.startX;
      var newWidth = width + startX - clientX;
      var deltaX = clientX - startX;
      var sign = deltaX < 0 ? -1 : deltaX === 0 ? 0 : 1;
      var count = (sign > 0 ? Math.floor(Math.abs(deltaX) / cellWidth) : Math.ceil(Math.abs(deltaX) / cellWidth)) * sign;
      if (newWidth < minWidth) count = rightIndex - leftIndex - 1;else if (newWidth > maxWidth) count = -leftIndex;
      var newStart = localeMoment(eventItem.start).add(cellUnit === _CellUnits.default.Hour ? count * config.minuteStep : count, cellUnit === _CellUnits.default.Hour ? 'minutes' : 'days').format(_index.DATETIME_FORMAT);

      if (count !== 0 && cellUnit !== _CellUnits.default.Hour && config.displayWeekend === false) {
        if (count > 0) {
          var tempCount = 0,
              i = 0;

          while (true) {
            i++;
            var tempStart = localeMoment(eventItem.start).add(i, 'days');
            var dayOfWeek = tempStart.weekday();

            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
              tempCount++;

              if (tempCount === count) {
                newStart = tempStart.format(_index.DATETIME_FORMAT);
                break;
              }
            }
          }
        } else {
          var _tempCount = 0,
              _i = 0;

          while (true) {
            _i--;

            var _tempStart = localeMoment(eventItem.start).add(_i, 'days');

            var _dayOfWeek = _tempStart.weekday();

            if (_dayOfWeek !== 0 && _dayOfWeek !== 6) {
              _tempCount--;

              if (_tempCount === count) {
                newStart = _tempStart.format(_index.DATETIME_FORMAT);
                break;
              }
            }
          }
        }
      }

      var hasConflict = false;
      var slotId = getEventSlotId(eventItem);
      var slotName = undefined;
      var slot = getSlotById(slotId);
      if (!!slot) slotName = slot.name;

      if (config.checkConflict) {
        var start = localeMoment(newStart),
            end = localeMoment(eventItem.end);
        events.forEach(function (e) {
          if (getEventSlotId(e) === slotId && e.id !== eventItem.id) {
            var eStart = localeMoment(e.start),
                eEnd = localeMoment(e.end);
            if (start >= eStart && start < eEnd || end > eStart && end <= eEnd || eStart >= start && eStart < end || eEnd > start && eEnd <= end) hasConflict = true;
          }
        });
      }

      if (hasConflict) {
        _this.setState({
          left: left,
          top: top,
          width: width
        });

        if (typeof conflictOccurred !== "undefined") {
          conflictOccurred('StartResize', eventItem, _DnDTypes.DnDTypes.EVENT, slotId, slotName, newStart, eventItem.end);
        } else {
          console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
        }

        _this.subscribeResizeEvent(_this.props);
      } else {
        if (typeof updateEventStart !== "undefined") updateEventStart(eventItem, newStart);
      }
    };

    _this.cancelStartDrag = function (ev) {
      ev.stopPropagation();

      _this.startResizer.removeEventListener('touchmove', _this.doStartDrag, false);

      _this.startResizer.removeEventListener('touchend', _this.stopStartDrag, false);

      _this.startResizer.removeEventListener('touchcancel', _this.cancelStartDrag, false);

      document.onselectstart = null;
      document.ondragstart = null;
      var _this$props5 = _this.props,
          stopResizing = _this$props5.stopResizing,
          left = _this$props5.left,
          top = _this$props5.top,
          width = _this$props5.width;
      stopResizing();

      _this.setState({
        left: left,
        top: top,
        width: width
      });
    };

    _this.initEndDrag = function (ev) {
      var _this$props6 = _this.props,
          startResizing = _this$props6.startResizing,
          isResizing = _this$props6.isResizing,
          getEventSlotId = _this$props6.getEventSlotId,
          getSlotById = _this$props6.getSlotById,
          eventItem = _this$props6.eventItem;
      var slotId = getEventSlotId(eventItem);
      var slot = getSlotById(slotId);
      if (!!slot && !!slot.groupOnly) return;
      if (isResizing) return;
      ev.stopPropagation();
      var clientX = 0;

      if (supportTouch) {
        if (ev.changedTouches.length === 0) return;
        var touch = ev.changedTouches[0];
        clientX = touch.pageX;
      } else {
        if (ev.buttons !== undefined && ev.buttons !== 1) return;
        clientX = ev.clientX;
      }

      _this.setState({
        endX: clientX
      });

      startResizing();

      if (supportTouch) {
        _this.endResizer.addEventListener('touchmove', _this.doEndDrag, false);

        _this.endResizer.addEventListener('touchend', _this.stopEndDrag, false);

        _this.endResizer.addEventListener('touchcancel', _this.cancelEndDrag, false);
      } else {
        document.documentElement.addEventListener('mousemove', _this.doEndDrag, false);
        document.documentElement.addEventListener('mouseup', _this.stopEndDrag, false);
      }

      document.onselectstart = function () {
        return false;
      };

      document.ondragstart = function () {
        return false;
      };
    };

    _this.doEndDrag = function (ev) {
      ev.stopPropagation();
      var clientX = 0;

      if (supportTouch) {
        if (ev.changedTouches.length === 0) return;
        var touch = ev.changedTouches[0];
        clientX = touch.pageX;
      } else {
        clientX = ev.clientX;
      }

      var _this$props7 = _this.props,
          width = _this$props7.width,
          leftIndex = _this$props7.leftIndex,
          headers = _this$props7.headers,
          contentCellWidth = _this$props7.contentCellWidth;
      var cellWidth = contentCellWidth;
      var offset = leftIndex > 0 ? 5 : 6;
      var minWidth = cellWidth - offset;
      var maxWidth = (headers.length - leftIndex) * cellWidth - offset;
      var endX = _this.state.endX;
      var newWidth = width + clientX - endX;
      if (newWidth < minWidth) newWidth = minWidth;else if (newWidth > maxWidth) newWidth = maxWidth;

      _this.setState({
        width: newWidth
      });
    };

    _this.stopEndDrag = function (ev) {
      ev.stopPropagation();

      if (supportTouch) {
        _this.endResizer.removeEventListener('touchmove', _this.doEndDrag, false);

        _this.endResizer.removeEventListener('touchend', _this.stopEndDrag, false);

        _this.endResizer.removeEventListener('touchcancel', _this.cancelEndDrag, false);
      } else {
        document.documentElement.removeEventListener('mousemove', _this.doEndDrag, false);
        document.documentElement.removeEventListener('mouseup', _this.stopEndDrag, false);
      }

      document.onselectstart = null;
      document.ondragstart = null;
      var _this$props8 = _this.props,
          width = _this$props8.width,
          left = _this$props8.left,
          top = _this$props8.top,
          leftIndex = _this$props8.leftIndex,
          rightIndex = _this$props8.rightIndex,
          eventItem = _this$props8.eventItem,
          updateEventEnd = _this$props8.updateEventEnd,
          conflictOccurred = _this$props8.conflictOccurred,
          stopResizing = _this$props8.stopResizing,
          getEventSlotId = _this$props8.getEventSlotId,
          getSlotById = _this$props8.getSlotById;
      stopResizing();
      if (_this.state.width === width) return;
      var clientX = 0;

      if (supportTouch) {
        if (ev.changedTouches.length === 0) {
          _this.setState({
            left: left,
            top: top,
            width: width
          });

          return;
        }

        var touch = ev.changedTouches[0];
        clientX = touch.pageX;
      } else {
        clientX = ev.clientX;
      }

      var _this$props9 = _this.props,
          headers = _this$props9.headers,
          cellUnit = _this$props9.cellUnit,
          events = _this$props9.events,
          config = _this$props9.config,
          localeMoment = _this$props9.localeMoment,
          contentCellWidth = _this$props9.contentCellWidth;
      var cellWidth = contentCellWidth;
      var offset = leftIndex > 0 ? 5 : 6;
      var minWidth = cellWidth - offset;
      var maxWidth = (headers.length - leftIndex) * cellWidth - offset;
      var endX = _this.state.endX;
      var newWidth = width + clientX - endX;
      var deltaX = newWidth - width;
      var sign = deltaX < 0 ? -1 : deltaX === 0 ? 0 : 1;
      var count = (sign < 0 ? Math.floor(Math.abs(deltaX) / cellWidth) : Math.ceil(Math.abs(deltaX) / cellWidth)) * sign;
      if (newWidth < minWidth) count = leftIndex - rightIndex + 1;else if (newWidth > maxWidth) count = headers.length - rightIndex;
      var newEnd = localeMoment(eventItem.end).add(cellUnit === _CellUnits.default.Hour ? count * config.minuteStep : count, cellUnit === _CellUnits.default.Hour ? 'minutes' : 'days').format(_index.DATETIME_FORMAT);

      if (count !== 0 && cellUnit !== _CellUnits.default.Hour && config.displayWeekend === false) {
        if (count > 0) {
          var tempCount = 0,
              i = 0;

          while (true) {
            i++;
            var tempEnd = localeMoment(eventItem.end).add(i, 'days');
            var dayOfWeek = tempEnd.weekday();

            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
              tempCount++;

              if (tempCount === count) {
                newEnd = tempEnd.format(_index.DATETIME_FORMAT);
                break;
              }
            }
          }
        } else {
          var _tempCount2 = 0,
              _i2 = 0;

          while (true) {
            _i2--;

            var _tempEnd = localeMoment(eventItem.end).add(_i2, 'days');

            var _dayOfWeek2 = _tempEnd.weekday();

            if (_dayOfWeek2 !== 0 && _dayOfWeek2 !== 6) {
              _tempCount2--;

              if (_tempCount2 === count) {
                newEnd = _tempEnd.format(_index.DATETIME_FORMAT);
                break;
              }
            }
          }
        }
      }

      var hasConflict = false;
      var slotId = getEventSlotId(eventItem);
      var slotName = undefined;
      var slot = getSlotById(slotId);
      if (!!slot) slotName = slot.name;

      if (config.checkConflict) {
        var start = localeMoment(eventItem.start),
            end = localeMoment(newEnd);
        events.forEach(function (e) {
          if (getEventSlotId(e) === slotId && e.id !== eventItem.id) {
            var eStart = localeMoment(e.start),
                eEnd = localeMoment(e.end);
            if (start >= eStart && start < eEnd || end > eStart && end <= eEnd || eStart >= start && eStart < end || eEnd > start && eEnd <= end) hasConflict = true;
          }
        });
      }

      if (hasConflict) {
        _this.setState({
          left: left,
          top: top,
          width: width
        });

        if (typeof conflictOccurred !== "undefined") {
          conflictOccurred('EndResize', eventItem, _DnDTypes.DnDTypes.EVENT, slotId, slotName, eventItem.start, newEnd);
        } else {
          console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
        }

        _this.subscribeResizeEvent(_this.props);
      } else {
        if (typeof updateEventEnd !== "undefined") updateEventEnd(eventItem, newEnd);
      }
    };

    _this.cancelEndDrag = function (ev) {
      ev.stopPropagation();

      _this.endResizer.removeEventListener('touchmove', _this.doEndDrag, false);

      _this.endResizer.removeEventListener('touchend', _this.stopEndDrag, false);

      _this.endResizer.removeEventListener('touchcancel', _this.cancelEndDrag, false);

      document.onselectstart = null;
      document.ondragstart = null;
      var _this$props10 = _this.props,
          stopResizing = _this$props10.stopResizing,
          left = _this$props10.left,
          top = _this$props10.top,
          width = _this$props10.width;
      stopResizing();

      _this.setState({
        left: left,
        top: top,
        width: width
      });
    };

    _this.startResizable = function (props) {
      var eventItem = props.eventItem,
          config = props.config;
      return config.startResizable === true && (eventItem.resizable == undefined || eventItem.resizable !== false) && (eventItem.startResizable == undefined || eventItem.startResizable !== false);
    };

    _this.endResizable = function (props) {
      var eventItem = props.eventItem,
          config = props.config;
      return config.endResizable === true && (eventItem.resizable == undefined || eventItem.resizable !== false) && (eventItem.endResizable == undefined || eventItem.endResizable !== false);
    };

    _this.subscribeResizeEvent = function (props) {
      if (_this.startResizer != undefined) {
        if (supportTouch) {// this.startResizer.removeEventListener('touchstart', this.initStartDrag, false);
          // if (this.startResizable(props))
          //     this.startResizer.addEventListener('touchstart', this.initStartDrag, false);
        } else {
          _this.startResizer.removeEventListener('mousedown', _this.initStartDrag, false);

          if (_this.startResizable(props)) _this.startResizer.addEventListener('mousedown', _this.initStartDrag, false);
        }
      }

      if (_this.endResizer != undefined) {
        if (supportTouch) {// this.endResizer.removeEventListener('touchstart', this.initEndDrag, false);
          // if (this.endResizable(props))
          //     this.endResizer.addEventListener('touchstart', this.initEndDrag, false);
        } else {
          _this.endResizer.removeEventListener('mousedown', _this.initEndDrag, false);

          if (_this.endResizable(props)) _this.endResizer.addEventListener('mousedown', _this.initEndDrag, false);
        }
      }
    };

    var _left = _props.left,
        _top = _props.top,
        _width = _props.width;
    _this.state = {
      left: _left,
      top: _top,
      width: _width
    };
    _this.startResizer = null;
    _this.endResizer = null;
    return _this;
  }

  (0, _createClass2.default)(EventItem, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      var _this$props11 = this.props,
          left = _this$props11.left,
          top = _this$props11.top,
          width = _this$props11.width;

      if (prevProps.left !== left || prevProps.top !== top || prevProps.width !== width) {
        this.setState({
          left: left,
          top: top,
          width: width
        });
        this.subscribeResizeEvent(this.props);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.subscribeResizeEvent(this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props12 = this.props,
          eventItem = _this$props12.eventItem,
          isStart = _this$props12.isStart,
          isEnd = _this$props12.isEnd,
          eventItemClick = _this$props12.eventItemClick,
          isDragging = _this$props12.isDragging,
          connectDragSource = _this$props12.connectDragSource,
          connectDragPreview = _this$props12.connectDragPreview,
          eventItemTemplateResolver = _this$props12.eventItemTemplateResolver;
      var _this$props13 = this.props,
          config = _this$props13.config,
          behaviors = _this$props13.behaviors,
          resources = _this$props13.resources,
          isEventPerspective = _this$props13.isEventPerspective;
      var _this$state = this.state,
          left = _this$state.left,
          width = _this$state.width,
          top = _this$state.top;
      var bgColor = config.defaultEventBgColor;
      if (!!eventItem.bgColor) bgColor = eventItem.bgColor;
      var eventTitle = behaviors.getEventTextFunc(eventItem, resources, isEventPerspective);

      var startResizeDiv = /*#__PURE__*/_react.default.createElement("div", null);

      if (this.startResizable(this.props)) startResizeDiv = /*#__PURE__*/_react.default.createElement("div", {
        className: "event-resizer event-start-resizer",
        ref: function ref(_ref) {
          return _this2.startResizer = _ref;
        }
      });

      var endResizeDiv = /*#__PURE__*/_react.default.createElement("div", null);

      if (this.endResizable(this.props)) endResizeDiv = /*#__PURE__*/_react.default.createElement("div", {
        className: "event-resizer event-end-resizer",
        ref: function ref(_ref2) {
          return _this2.endResizer = _ref2;
        }
      });

      var eventItemTemplate = /*#__PURE__*/_react.default.createElement("div", {
        className: 'rbc-event',
        key: eventItem.id,
        style: {
          backgroundColor: bgColor
        }
      }, /*#__PURE__*/_react.default.createElement("span", null, eventTitle));

      if (typeof eventItemTemplateResolver !== "undefined") eventItemTemplate = eventItemTemplateResolver(eventItem, bgColor, isStart, isEnd, 'event-item', config.eventItemHeight, undefined);
      return isDragging ? null : /*#__PURE__*/_react.default.createElement("div", null, connectDragPreview(connectDragSource( /*#__PURE__*/_react.default.createElement("div", {
        className: "timeline-event",
        style: {
          left: left,
          width: width,
          top: top
        },
        onClick: function onClick() {
          if (!!eventItemClick) eventItemClick(eventItem);
        }
      }, eventItemTemplate, startResizeDiv, endResizeDiv))));
    }
  }]);
  return EventItem;
}(_react.Component);

var _default = EventItem;
exports.default = _default;