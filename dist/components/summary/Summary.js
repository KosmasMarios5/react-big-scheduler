"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _react = _interopRequireDefault(require("react"));

var _SummaryPos = _interopRequireDefault(require("../../types/SummaryPos"));

var Summary = function Summary(props) {
  var summary = props.summary,
      left = props.left,
      width = props.width,
      top = props.top,
      config = props.config;
  var color = config.summaryColor;
  if (typeof summary.color !== "undefined") color = summary.color;
  var textAlign = 'center';
  if (config.summaryPos === _SummaryPos.default.TopRight || config.summaryPos === _SummaryPos.default.BottomRight) textAlign = 'right';else if (config.summaryPos === _SummaryPos.default.TopLeft || config.summaryPos === _SummaryPos.default.BottomLeft) textAlign = 'left';
  var style = {
    height: config.eventItemHeight,
    color: color,
    textAlign: textAlign,
    marginLeft: '6px',
    marginRight: '6px'
  };
  if (typeof summary.fontSize !== "undefined") style = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
    fontSize: summary.fontSize
  });
  return /*#__PURE__*/_react.default.createElement("a", {
    className: "timeline-event header2-text",
    style: {
      left: left,
      width: width,
      top: top,
      cursor: 'default'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: style
  }, summary.text));
};

var _default = Summary;
exports.default = _default;