"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ViewTypes = _interopRequireDefault(require("../types/ViewTypes"));

var _SummaryPos = _interopRequireDefault(require("../types/SummaryPos"));

var _default = {
  schedulerWidth: '100%',
  besidesWidth: 20,
  schedulerMaxHeight: 0,
  tableHeaderHeight: 40,
  agendaResourceTableWidth: 160,
  agendaMaxEventWidth: 100,
  dayResourceTableWidth: 160,
  weekResourceTableWidth: '16%',
  monthResourceTableWidth: 160,
  quarterResourceTableWidth: 160,
  yearResourceTableWidth: 160,
  customResourceTableWidth: 160,
  dayCellWidth: 30,
  weekCellWidth: '12%',
  monthCellWidth: 80,
  quarterCellWidth: 80,
  yearCellWidth: 80,
  customCellWidth: 80,
  dayMaxEvents: 99,
  weekMaxEvents: 99,
  monthMaxEvents: 99,
  quarterMaxEvents: 99,
  yearMaxEvents: 99,
  customMaxEvents: 99,
  eventItemHeight: 22,
  eventItemLineHeight: 24,
  nonAgendaSlotMinHeight: 0,
  dayStartFrom: 0,
  dayStopTo: 23,
  defaultEventBgColor: '#80C5F6',
  selectedAreaColor: '#214682',
  isSelectingAreaColor: '#7EC2F3',
  nonWorkingTimeHeadColor: '#999999',
  nonWorkingTimeHeadBgColor: '#fff0f6',
  nonWorkingTimeBodyBgColor: '#fff0f6',
  summaryColor: '#666',
  summaryPos: _SummaryPos.default.TopRight,
  groupOnlySlotColor: '#F8F8F8',
  startResizable: true,
  endResizable: true,
  movable: true,
  creatable: true,
  crossResourceMove: true,
  checkConflict: false,
  scrollToSpecialMomentEnabled: true,
  eventItemPopoverEnabled: true,
  calendarPopoverEnabled: true,
  recurringEventsEnabled: true,
  headerEnabled: true,
  displayWeekend: true,
  relativeMove: true,
  defaultExpanded: true,
  resourceName: 'Resource Name',
  taskName: 'Task Name',
  agendaViewHeader: 'Agenda',
  addMorePopoverHeaderFormat: 'MMM D, YYYY dddd',
  eventItemPopoverDateFormat: 'MMM D',
  nonAgendaDayCellHeaderFormat: 'ha',
  nonAgendaOtherCellHeaderFormat: 'ddd M/D',
  minuteStep: 30,
  messages: {
    previous: 'Previous',
    next: 'Next'
  },
  views: [{
    viewName: 'Day',
    viewType: _ViewTypes.default.Day,
    showAgenda: false,
    isEventPerspective: false
  }, {
    viewName: 'Week',
    viewType: _ViewTypes.default.Week,
    showAgenda: false,
    isEventPerspective: false
  }, {
    viewName: 'Month',
    viewType: _ViewTypes.default.Month,
    showAgenda: false,
    isEventPerspective: false
  }, {
    viewName: 'Quarter',
    viewType: _ViewTypes.default.Quarter,
    showAgenda: false,
    isEventPerspective: false
  }, {
    viewName: 'Year',
    viewType: _ViewTypes.default.Year,
    showAgenda: false,
    isEventPerspective: false
  }]
};
exports.default = _default;