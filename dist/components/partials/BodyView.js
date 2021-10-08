"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _react = _interopRequireDefault(require("react"));

var BodyView = function BodyView(props) {
  var renderData = props.renderData,
      headers = props.headers,
      config = props.config,
      behaviors = props.behaviors,
      contentCellWidth = props.contentCellWidth;
  var cellWidth = contentCellWidth; // let displayRenderData = renderData.filter(o => o.expanded);
  // let displayRenderData = renderData.filter(o => o.expanded);

  var tableRows = renderData.map(function (item) {
    var rowCells = headers.map(function (header, index) {
      var key = item.slotId + '_' + header.time;
      var style = index === headers.length - 1 ? {} : {
        width: cellWidth
      };
      if (!!header.nonWorkingTime) style = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
        backgroundColor: config.nonWorkingTimeBodyBgColor
      });
      if (item.groupOnly) style = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
        backgroundColor: config.groupOnlySlotColor
      });

      if (!!behaviors.getNonAgendaViewBodyCellBgColorFunc) {
        var cellBgColor = behaviors.getNonAgendaViewBodyCellBgColorFunc(item.slotId, header);
        if (!!cellBgColor) style = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
          backgroundColor: cellBgColor
        });
      }

      return /*#__PURE__*/_react.default.createElement("td", {
        key: key,
        style: style
      }, /*#__PURE__*/_react.default.createElement("div", null));
    });
    return /*#__PURE__*/_react.default.createElement("tr", {
      key: item.slotId,
      style: {
        height: item.rowHeight
      }
    }, rowCells);
  });
  return /*#__PURE__*/_react.default.createElement("tbody", null, tableRows);
};

var _default = BodyView;
exports.default = _default;