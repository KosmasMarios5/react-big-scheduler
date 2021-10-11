"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _CellUnits = _interopRequireDefault(require("../../../types/CellUnits"));

var HeaderView = function HeaderView(props) {
  var headers = props.headers,
      cellUnit = props.cellUnit,
      config = props.config,
      localeMoment = props.localeMoment,
      tableHeaderHeight = props.tableHeaderHeight,
      contentCellWidth = props.contentCellWidth,
      minuteStepsInHour = props.minuteStepsInHour;
  var nonAgendaCellHeaderTemplateResolver = props.nonAgendaCellHeaderTemplateResolver;
  var headerHeight = tableHeaderHeight;
  var cellWidth = contentCellWidth;
  var headerList = [];
  var style = {};

  if (cellUnit === _CellUnits.default.Hour) {
    headers.forEach(function (item, index) {
      if (index % minuteStepsInHour === 0) {
        var datetime = localeMoment(item.time); // const isCurrentTime = datetime.isSame(new Date(), 'hour');

        style = !!item.nonWorkingTime ? {
          width: cellWidth * minuteStepsInHour,
          color: config.nonWorkingTimeHeadColor,
          backgroundColor: config.nonWorkingTimeHeadBgColor
        } : {
          width: cellWidth * minuteStepsInHour
        };
        if (index === headers.length - minuteStepsInHour) style = !!item.nonWorkingTime ? {
          color: config.nonWorkingTimeHeadColor,
          backgroundColor: config.nonWorkingTimeHeadBgColor
        } : {};
        var pFormattedList = config.nonAgendaDayCellHeaderFormat.split('|').map(function (item) {
          return datetime.format(item);
        });
        var element;

        if (typeof nonAgendaCellHeaderTemplateResolver === 'function') {
          element = nonAgendaCellHeaderTemplateResolver(item, pFormattedList, style);
        } else {
          var pList = pFormattedList.map(function (item, index) {
            return /*#__PURE__*/_react.default.createElement("div", {
              key: index
            }, item);
          });
          element = /*#__PURE__*/_react.default.createElement("th", {
            key: item.time,
            className: "rbc-header",
            style: style
          }, /*#__PURE__*/_react.default.createElement("div", null, pList));
        }

        headerList.push(element);
      }
    });
  } else {
    headerList = headers.map(function (item, index) {
      var datetime = localeMoment(item.time);
      style = !!item.nonWorkingTime ? {
        width: cellWidth,
        color: config.nonWorkingTimeHeadColor,
        backgroundColor: config.nonWorkingTimeHeadBgColor
      } : {
        width: cellWidth
      };
      if (index === headers.length - 1) style = !!item.nonWorkingTime ? {
        color: config.nonWorkingTimeHeadColor,
        backgroundColor: config.nonWorkingTimeHeadBgColor
      } : {};
      var pFormattedList = config.nonAgendaOtherCellHeaderFormat.split('|').map(function (item) {
        return datetime.format(item);
      });

      if (typeof nonAgendaCellHeaderTemplateResolver === 'function') {
        return nonAgendaCellHeaderTemplateResolver(item, pFormattedList, style);
      }

      var pList = pFormattedList.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement("div", {
          key: index
        }, item);
      });
      return /*#__PURE__*/_react.default.createElement("th", {
        key: item.time,
        className: "rbc-header",
        style: style
      }, /*#__PURE__*/_react.default.createElement("div", null, pList));
    });
  }

  return /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", {
    style: {
      height: headerHeight
    }
  }, headerList));
};

var _default = HeaderView;
exports.default = _default;