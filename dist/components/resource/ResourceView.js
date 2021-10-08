"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _slotItem = _interopRequireDefault(require("../slotItem/slotItem"));

var ResourceView = function ResourceView(props) {
  var renderData = props.renderData,
      resourceTableWidth = props.resourceTableWidth,
      config = props.config,
      contentScrollbarHeight = props.contentScrollbarHeight,
      slotClickedFunc = props.slotClickedFunc,
      slotItemTemplateResolver = props.slotItemTemplateResolver,
      onSlotItemExpandToggle = props.onSlotItemExpandToggle;
  var width = resourceTableWidth - 2;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      paddingBottom: contentScrollbarHeight
    }
  }, /*#__PURE__*/_react.default.createElement("table", {
    className: "resource-table"
  }, /*#__PURE__*/_react.default.createElement("tbody", null, renderData.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_slotItem.default, {
      key: item.slotId,
      config: config,
      item: item,
      width: width,
      slotClickedFunc: slotClickedFunc,
      slotItemTemplateResolver: slotItemTemplateResolver,
      onSlotItemExpandToggle: onSlotItemExpandToggle
    });
  }))));
};

var _default = ResourceView;
exports.default = _default;