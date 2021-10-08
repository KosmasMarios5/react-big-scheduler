"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.isNonWorkingTime = exports.getScrollSpecialMoment = exports.getEventText = exports.getDateLabel = void 0;

var _ViewTypes = _interopRequireDefault(require("../types/ViewTypes"));

var _CellUnits = _interopRequireDefault(require("../types/CellUnits"));

//getDateLabel func example
var getDateLabel = function getDateLabel(localeMoment, viewType, startDate, endDate) {
  var start = localeMoment(startDate);
  var end = localeMoment(endDate);
  var dateLabel = start.format('MMM D, YYYY');

  if (viewType === _ViewTypes.default.Week || start !== end && (viewType === _ViewTypes.default.Custom || viewType === _ViewTypes.default.Custom1 || viewType === _ViewTypes.default.Custom2)) {
    dateLabel = "".concat(start.format('MMM D'), "-").concat(end.format('D, YYYY'));
    if (start.month() !== end.month()) dateLabel = "".concat(start.format('MMM D'), "-").concat(end.format('MMM D, YYYY'));
    if (start.year() !== end.year()) dateLabel = "".concat(start.format('MMM D, YYYY'), "-").concat(end.format('MMM D, YYYY'));
  } else if (viewType === _ViewTypes.default.Month) {
    dateLabel = start.format('MMMM YYYY');
  } else if (viewType === _ViewTypes.default.Quarter) {
    dateLabel = "".concat(start.format('MMM D'), "-").concat(end.format('MMM D, YYYY'));
  } else if (viewType === _ViewTypes.default.Year) {
    dateLabel = start.format('YYYY');
  }

  return dateLabel;
};

exports.getDateLabel = getDateLabel;

var getEventText = function getEventText(event, resources, isEventPerspective) {
  if (!isEventPerspective) return event.title;
  var eventText = event.title;
  resources.forEach(function (item) {
    if (item.id === event.resourceId) {
      eventText = item.name;
    }
  });
  return eventText;
};

exports.getEventText = getEventText;

var getScrollSpecialMoment = function getScrollSpecialMoment(localeMoment, startMoment, endMoment) {
  // return endMoment;
  return localeMoment();
};

exports.getScrollSpecialMoment = getScrollSpecialMoment;

var isNonWorkingTime = function isNonWorkingTime(localeMoment, time, cellUnit) {
  if (cellUnit === _CellUnits.default.Hour) {
    var hour = localeMoment(time).hour();
    if (hour < 9 || hour > 18) return true;
  } else {
    var dayOfWeek = localeMoment(time).weekday();
    if (dayOfWeek === 0 || dayOfWeek === 6) return true;
  }

  return false;
};

exports.isNonWorkingTime = isNonWorkingTime;
var _default = {
  //getSummaryFunc: getSummary,
  getSummaryFunc: undefined,
  //getCustomDateFunc: getCustomDate,
  getCustomDateFunc: undefined,
  // getNonAgendaViewBodyCellBgColorFunc: getNonAgendaViewBodyCellBgColor,
  getNonAgendaViewBodyCellBgColorFunc: undefined,
  getScrollSpecialMomentFunc: getScrollSpecialMoment,
  getDateLabelFunc: getDateLabel,
  getEventTextFunc: getEventText,
  isNonWorkingTimeFunc: isNonWorkingTime
};
exports.default = _default;