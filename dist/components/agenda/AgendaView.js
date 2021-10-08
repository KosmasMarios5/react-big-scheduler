"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _AgendaResourceEvents = _interopRequireDefault(require("./AgendaResourceEvents"));

var AgendaView = function AgendaView(props) {
  var isEventPerspective = props.isEventPerspective,
      config = props.config,
      renderData = props.renderData,
      resourceTableWidth = props.resourceTableWidth,
      tableHeaderHeight = props.tableHeaderHeight;
  var agendaResourceTableWidth = resourceTableWidth;
  var resourceEventsList = renderData.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_AgendaResourceEvents.default, Object.assign({}, props, {
      resourceEvents: item,
      key: item.slotId
    }));
  });
  var resourceName = isEventPerspective ? config.taskName : config.resourceName;
  var agendaViewHeader = config.agendaViewHeader;
  return /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement("table", {
    className: "scheduler-table"
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", {
    style: {
      height: tableHeaderHeight
    }
  }, /*#__PURE__*/_react.default.createElement("th", {
    style: {
      width: agendaResourceTableWidth
    },
    className: "header3-text"
  }, resourceName), /*#__PURE__*/_react.default.createElement("th", {
    className: "header3-text"
  }, agendaViewHeader))), /*#__PURE__*/_react.default.createElement("tbody", null, resourceEventsList))));
};

var _default = AgendaView;
exports.default = _default;