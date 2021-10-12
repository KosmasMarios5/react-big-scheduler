"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var SelectedArea = function SelectedArea(props) {
  var left = props.left,
      width = props.width;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "selected-area",
    style: {
      left: left,
      width: width,
      top: 0,
      bottom: 0,
      backgroundColor: props.background
    }
  });
};

var _default = SelectedArea;
exports.default = _default;