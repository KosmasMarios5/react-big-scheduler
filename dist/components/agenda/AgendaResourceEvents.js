"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _AgendaEventItem = _interopRequireDefault(require("./AgendaEventItem"));

var _index = require("../../index");

var AgendaResourceEvents = function AgendaResourceEvents(props) {
  var resourceEvents = props.resourceEvents,
      slotClickedFunc = props.slotClickedFunc,
      slotItemTemplateResolver = props.slotItemTemplateResolver;
  var startDate = props.startDate,
      endDate = props.endDate,
      config = props.config,
      localeMoment = props.localeMoment,
      resourceTableWidth = props.resourceTableWidth;
  var width = resourceTableWidth - 2;
  var events = [];
  resourceEvents.headerItems.forEach(function (item) {
    var start = localeMoment(startDate).format(_index.DATE_FORMAT),
        end = localeMoment(endDate).add(1, 'days').format(_index.DATE_FORMAT),
        headerStart = localeMoment(item.start).format(_index.DATE_FORMAT),
        headerEnd = localeMoment(item.end).format(_index.DATE_FORMAT);

    if (start === headerStart && end === headerEnd) {
      item.events.forEach(function (evt) {
        var durationStart = localeMoment(startDate);
        var durationEnd = localeMoment(endDate).add(1, 'days');
        var eventStart = localeMoment(evt.eventItem.start);
        var eventEnd = localeMoment(evt.eventItem.end);
        var isStart = eventStart >= durationStart;
        var isEnd = eventEnd < durationEnd;

        var eventItem = /*#__PURE__*/_react.default.createElement(_AgendaEventItem.default, Object.assign({}, props, {
          key: evt.eventItem.id,
          eventItem: evt.eventItem,
          isStart: isStart,
          isEnd: isEnd
        }));

        events.push(eventItem);
      });
    }
  });
  var a = typeof slotClickedFunc !== "undefined" ? /*#__PURE__*/_react.default.createElement("a", {
    onClick: function onClick() {
      slotClickedFunc(resourceEvents);
    }
  }, resourceEvents.slotName) : /*#__PURE__*/_react.default.createElement("span", null, resourceEvents.slotName);

  var slotItem = /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: width
    },
    title: resourceEvents.slotName,
    className: "overflow-text header2-text"
  }, a);

  if (!!slotItemTemplateResolver) {
    var temp = slotItemTemplateResolver(resourceEvents, slotClickedFunc, width, "overflow-text header2-text");
    if (!!temp) slotItem = temp;
  }

  return /*#__PURE__*/_react.default.createElement("tr", {
    style: {
      minHeight: config.eventItemLineHeight + 2
    }
  }, /*#__PURE__*/_react.default.createElement("td", {
    "data-resource-id": resourceEvents.slotId
  }, slotItem), /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "day-event-container"
  }, events)));
};

var _default = AgendaResourceEvents;
exports.default = _default;