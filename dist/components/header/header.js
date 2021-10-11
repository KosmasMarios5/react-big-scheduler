"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var Header = function Header(props) {
  var onViewChange = props.onViewChange,
      dateLabel = props.dateLabel,
      messages = props.messages,
      views = props.views,
      viewType = props.viewType,
      showAgenda = props.showAgenda,
      isEventPerspective = props.isEventPerspective;
  var goBack = props.goBack,
      goNext = props.goNext;
  var defaultValue = "".concat(viewType).concat(showAgenda ? 1 : 0).concat(isEventPerspective ? 1 : 0);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "rbc-toolbar"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: 'rbc-btn-group'
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: goBack
  }, messages.previous), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: goNext
  }, messages.next)), /*#__PURE__*/_react.default.createElement("span", {
    className: "rbc-toolbar-label"
  }, dateLabel), /*#__PURE__*/_react.default.createElement("span", {
    className: 'rbc-btn-group'
  }, views.map(function (item) {
    var name = "".concat(item.viewType).concat(item.showAgenda ? 1 : 0).concat(item.isEventPerspective ? 1 : 0);
    return /*#__PURE__*/_react.default.createElement("button", {
      key: name,
      type: "button",
      className: defaultValue === name ? "rbc-active" : null,
      onClick: function onClick() {
        return onViewChange(item);
      }
    }, item.viewName);
  })));
};

var _default = Header;
exports.default = _default;