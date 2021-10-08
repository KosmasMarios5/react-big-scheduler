"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactDnd = require("react-dnd");

var _Util = require("../../helpers/Util");

var _DnDTypes = require("./DnDTypes");

var _ViewTypes = _interopRequireDefault(require("../../types/ViewTypes"));

var _ResourceEvents = _interopRequireDefault(require("../resource/ResourceEvents"));

var _CellUnits = _interopRequireDefault(require("../../types/CellUnits"));

var _index = require("../../index");

var eventTarget = {
  canDrop: function canDrop(props, monitor) {
    var resourceEvents = props.resourceEvents,
        isResizing = props.isResizing,
        config = props.config;
    var item = monitor.getItem();
    if (isResizing) return false;
    return config.movable && !resourceEvents.groupOnly && (typeof item.movable === "undefined" || item.movable !== false);
  },
  hover: function hover(props, monitor, component) {
    var resourceEvents = props.resourceEvents,
        movingEvent = props.movingEvent;
    var cellUnit = props.cellUnit,
        config = props.config,
        viewType = props.viewType,
        localeMoment = props.localeMoment,
        contentCellWidth = props.contentCellWidth;
    var item = monitor.getItem();
    var type = monitor.getItemType();
    var pos = (0, _Util.getPos)(component.eventContainer);
    var cellWidth = contentCellWidth;
    var initialStart = null,
        initialEnd = null;

    if (type === _DnDTypes.DnDTypes.EVENT) {
      var initialPoint = monitor.getInitialClientOffset();
      var initialLeftIndex = Math.floor((initialPoint.x - pos.x) / cellWidth);
      initialStart = resourceEvents.headerItems[initialLeftIndex].start;
      initialEnd = resourceEvents.headerItems[initialLeftIndex].end;
      if (cellUnit !== _CellUnits.default.Hour) initialEnd = localeMoment(resourceEvents.headerItems[initialLeftIndex].start).hour(23).minute(59).second(59).format(_index.DATETIME_FORMAT);
    }

    var point = monitor.getClientOffset();
    var leftIndex = Math.floor((point.x - pos.x) / cellWidth);

    if (!resourceEvents.headerItems[leftIndex]) {
      return;
    }

    var newStart = resourceEvents.headerItems[leftIndex].start;
    var newEnd = resourceEvents.headerItems[leftIndex].end;
    if (cellUnit !== _CellUnits.default.Hour) newEnd = localeMoment(resourceEvents.headerItems[leftIndex].start).hour(23).minute(59).second(59).format(_index.DATETIME_FORMAT);
    var slotId = resourceEvents.slotId,
        slotName = resourceEvents.slotName;
    var action = 'New';
    var isEvent = type === _DnDTypes.DnDTypes.EVENT;

    if (isEvent) {
      var event = item;

      if (config.relativeMove) {
        newStart = localeMoment(event.start).add(localeMoment(newStart).diff(localeMoment(initialStart)), 'ms').format(_index.DATETIME_FORMAT);
      } else {
        if (viewType !== _ViewTypes.default.Day) {
          var tmpMoment = localeMoment(newStart);
          newStart = localeMoment(event.start).year(tmpMoment.year()).month(tmpMoment.month()).date(tmpMoment.date()).format(_index.DATETIME_FORMAT);
        }
      }

      newEnd = localeMoment(newStart).add(localeMoment(event.end).diff(localeMoment(event.start)), 'ms').format(_index.DATETIME_FORMAT); //if crossResourceMove disabled, slot returns old value

      if (config.crossResourceMove === false) {
        var getEventSlotId = props.getEventSlotId,
            getSlotById = props.getSlotById;
        slotId = getEventSlotId(item);
        slotName = undefined;
        var slot = getSlotById(slotId);
        if (!!slot) slotName = slot.name;
      }

      action = 'Move';
    }

    if (!!movingEvent) {
      movingEvent(slotId, slotName, newStart, newEnd, action, type, item);
    }
  },
  drop: function drop(props, monitor, component) {
    var resourceEvents = props.resourceEvents;
    var cellUnit = props.cellUnit,
        localeMoment = props.localeMoment,
        contentCellWidth = props.contentCellWidth;
    var type = monitor.getItemType();
    var pos = (0, _Util.getPos)(component.eventContainer);
    var cellWidth = contentCellWidth;
    var initialStartTime = null,
        initialEndTime = null;

    if (type === _DnDTypes.DnDTypes.EVENT) {
      var initialPoint = monitor.getInitialClientOffset();
      var initialLeftIndex = Math.floor((initialPoint.x - pos.x) / cellWidth);
      initialStartTime = resourceEvents.headerItems[initialLeftIndex].start;
      initialEndTime = resourceEvents.headerItems[initialLeftIndex].end;
      if (cellUnit !== _CellUnits.default.Hour) initialEndTime = localeMoment(resourceEvents.headerItems[initialLeftIndex].start).hour(23).minute(59).second(59).format(_index.DATETIME_FORMAT);
    }

    var point = monitor.getClientOffset();
    var leftIndex = Math.floor((point.x - pos.x) / cellWidth);
    var startTime = resourceEvents.headerItems[leftIndex].start;
    var endTime = resourceEvents.headerItems[leftIndex].end;
    if (cellUnit !== _CellUnits.default.Hour) endTime = localeMoment(resourceEvents.headerItems[leftIndex].start).hour(23).minute(59).second(59).format(_index.DATETIME_FORMAT);
    return {
      slotId: resourceEvents.slotId,
      slotName: resourceEvents.slotName,
      start: startTime,
      end: endTime,
      initialStart: initialStartTime,
      initialEnd: initialEndTime
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

var _default = (0, _reactDnd.DropTarget)(_DnDTypes.DnDTypes.EVENT, eventTarget, collect)(_ResourceEvents.default);

exports.default = _default;