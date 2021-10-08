"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var AddMore = function AddMore(props) {
  var number = props.number,
      left = props.left,
      width = props.width,
      top = props.top,
      clickAction = props.clickAction,
      headerItem = props.headerItem,
      config = props.config;
  var content = '+' + number + 'more';
  return /*#__PURE__*/_react.default.createElement("a", {
    className: "timeline-event",
    style: {
      left: left,
      width: width,
      top: top
    },
    onClick: function onClick() {
      clickAction(headerItem);
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: config.eventItemHeight,
      color: '#999',
      textAlign: 'center'
    }
  }, content));
};

var _default = AddMore;
exports.default = _default;