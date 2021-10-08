"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactDnd = require("react-dnd");

var _DnDTypes = require("./DnDTypes");

var _EventItem = _interopRequireDefault(require("../eventItem/EventItem"));

var _ViewTypes = _interopRequireDefault(require("../../types/ViewTypes"));

var _index = require("../../index");

var eventSource = {
  beginDrag: function beginDrag(props) {
    return props.eventItem;
  },
  endDrag: function endDrag(props, monitor, component) {
    if (!monitor.didDrop()) return;
    var item = monitor.getItem();
    var type = monitor.getItemType();
    var onMoveEvent = props.onMoveEvent;
    var events = props.events,
        config = props.config,
        viewType = props.viewType,
        localeMoment = props.localeMoment;
    var getEventSlotId = props.getEventSlotId,
        getSlotById = props.getSlotById;
    var dropResult = monitor.getDropResult();
    var slotId = dropResult.slotId,
        slotName = dropResult.slotName;
    var newStart = dropResult.start,
        newEnd = dropResult.end;
    var initialStart = dropResult.initialStart,
        initialEnd = dropResult.initialEnd;
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
        slotId = getEventSlotId(item);
        slotName = undefined;
        var slot = getSlotById(slotId);
        if (!!slot) slotName = slot.name;
      }

      action = 'Move';
    }

    var hasConflict = false;

    if (config.checkConflict) {
      var start = localeMoment(newStart),
          end = localeMoment(newEnd);
      events.forEach(function (e) {
        if (getEventSlotId(e) === slotId && (!isEvent || e.id !== item.id)) {
          var eStart = localeMoment(e.start),
              eEnd = localeMoment(e.end);
          if (start >= eStart && start < eEnd || end > eStart && end <= eEnd || eStart >= start && eStart < end || eEnd > start && eEnd <= end) hasConflict = true;
        }
      });
    }

    if (hasConflict) {
      var conflictOccurred = props.conflictOccurred;

      if (typeof conflictOccurred !== "undefined") {
        conflictOccurred(action, item, type, slotId, slotName, newStart, newEnd);
      } else {
        console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
      }
    } else {
      if (isEvent) {
        if (onMoveEvent !== undefined) {
          onMoveEvent(item, slotId, slotName, newStart, newEnd);
        }
      } else {
        if (onMoveEvent !== undefined) onMoveEvent(slotId, slotName, newStart, newEnd, type, item);
      }
    }
  },
  canDrag: function canDrag(props, monitor) {
    var config = props.config,
        eventItem = props.eventItem,
        isResizing = props.isResizing,
        resourceEvents = props.resourceEvents;
    if (isResizing) return false;
    return config.movable && (typeof resourceEvents === "undefined" || !resourceEvents.groupOnly) && (typeof eventItem.movable === "undefined" || eventItem.movable !== false);
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
  };
}

var _default = (0, _reactDnd.DragSource)(_DnDTypes.DnDTypes.EVENT, eventSource, collect)(_EventItem.default);

exports.default = _default;