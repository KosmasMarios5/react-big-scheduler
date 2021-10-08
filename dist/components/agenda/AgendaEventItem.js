"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _popover = _interopRequireDefault(require("antd/lib/popover"));

require("antd/lib/popover/style/index.css");

var _EventItemPopover = _interopRequireDefault(require("../eventItem/EventItemPopover"));

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

  var content = /*#__PURE__*/_react.default.createElement(_EventItemPopover.default, Object.assign({}, props, {
    title: eventItem.title,
    startTime: eventItem.start,
    endTime: eventItem.end,
    statusColor: bgColor
  }));

  var eventItemTemplate = /*#__PURE__*/_react.default.createElement("div", {
    className: roundCls + ' event-item',
    key: eventItem.id,
    style: {
      height: config.eventItemHeight,
      maxWidth: config.agendaMaxEventWidth,
      backgroundColor: bgColor
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      marginLeft: '10px',
      lineHeight: "".concat(config.eventItemHeight, "px")
    }
  }, titleText));

  if (typeof eventItemTemplateResolver !== "undefined") eventItemTemplate = eventItemTemplateResolver(eventItem, bgColor, isStart, isEnd, 'event-item', config.eventItemHeight, config.agendaMaxEventWidth);
  return config.eventItemPopoverEnabled ? /*#__PURE__*/_react.default.createElement(_popover.default, {
    placement: "bottomLeft",
    content: content,
    trigger: "hover"
  }, /*#__PURE__*/_react.default.createElement("a", {
    className: "day-event",
    onClick: function onClick() {
      if (!!eventItemClick) eventItemClick(eventItem);
    }
  }, eventItemTemplate)) : /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("a", {
    className: "day-event",
    onClick: function onClick() {
      if (!!eventItemClick) eventItemClick(eventItem);
    }
  }, eventItemTemplate));
};

var _default = AgendaEventItem;
exports.default = _default;