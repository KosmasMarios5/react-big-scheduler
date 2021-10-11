"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var AgendaEventItem = function AgendaEventItem(props) {
  var eventItem = props.eventItem,
      isStart = props.isStart,
      isEnd = props.isEnd,
      eventItemClick = props.eventItemClick,
      eventItemTemplateResolver = props.eventItemTemplateResolver;
  var config = props.config,
      behaviors = props.behaviors;
  var roundCls = isStart ? isEnd ? 'round-all' : 'round-head' : isEnd ? 'round-tail' : 'round-none';
  var bgColor = config.defaultEventBgColor;
  if (!!eventItem.bgColor) bgColor = eventItem.bgColor;
  var titleText = behaviors.getEventTextFunc(eventItem);

  var eventItemTemplate = /*#__PURE__*/_react.default.createElement("div", {
    className: roundCls + ' rbc-event',
    key: eventItem.id,
    style: {
      maxWidth: config.agendaMaxEventWidth,
      backgroundColor: bgColor
    }
  }, /*#__PURE__*/_react.default.createElement("span", null, titleText));

  if (typeof eventItemTemplateResolver !== "undefined") eventItemTemplate = eventItemTemplateResolver(eventItem, bgColor, isStart, isEnd, 'event-item', config.eventItemHeight, config.agendaMaxEventWidth);
  return /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("a", {
    className: "day-event",
    onClick: function onClick() {
      if (!!eventItemClick) eventItemClick(eventItem);
    }
  }, eventItemTemplate));
};

var _default = AgendaEventItem;
exports.default = _default;