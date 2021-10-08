"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _col = _interopRequireDefault(require("antd/lib/col"));

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/grid/style/index.css");

var _DnDSource = _interopRequireDefault(require("../dnd/DnDSource"));

var _icons = require("@ant-design/icons");

var AddMorePopover = function AddMorePopover(props) {
  var headerItem = props.headerItem,
      left = props.left,
      top = props.top,
      height = props.height,
      closeAction = props.closeAction;
  var config = props.config,
      localeMoment = props.localeMoment;
  var time = headerItem.time,
      start = headerItem.start,
      end = headerItem.end,
      events = headerItem.events;
  var header = localeMoment(time).format(config.addMorePopoverHeaderFormat);
  var durationStart = localeMoment(start);
  var durationEnd = localeMoment(end);
  var eventList = [];
  var i = 0;
  events.forEach(function (evt) {
    if (typeof evt !== "undefined") {
      i++;
      var eventStart = localeMoment(evt.eventItem.start);
      var eventEnd = localeMoment(evt.eventItem.end);
      var isStart = eventStart >= durationStart;
      var isEnd = eventEnd < durationEnd;
      var eventItemLeft = 10;
      var eventItemWidth = 138;
      var eventItemTop = 12 + i * config.eventItemLineHeight;

      var eventItem = /*#__PURE__*/_react.default.createElement(_DnDSource.default, Object.assign({}, props, {
        key: evt.eventItem.id,
        eventItem: evt.eventItem,
        leftIndex: 0,
        isInPopover: true,
        isStart: isStart,
        isEnd: isEnd,
        rightIndex: 1,
        left: eventItemLeft,
        width: eventItemWidth,
        top: eventItemTop
      }));

      eventList.push(eventItem);
    }
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "add-more-popover-overlay",
    style: {
      left: left,
      top: top,
      height: height,
      width: '170px'
    }
  }, /*#__PURE__*/_react.default.createElement(_row.default, {
    type: "flex",
    justify: "space-between",
    align: "middle"
  }, /*#__PURE__*/_react.default.createElement(_col.default, {
    span: "22"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "base-text"
  }, header)), /*#__PURE__*/_react.default.createElement(_col.default, {
    span: "2"
  }, /*#__PURE__*/_react.default.createElement("span", {
    onClick: function onClick() {
      closeAction(undefined);
    }
  }, /*#__PURE__*/_react.default.createElement(_icons.CloseSquareOutlined, null)))), eventList);
};

var _default = AddMorePopover;
exports.default = _default;