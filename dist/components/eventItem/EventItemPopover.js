"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _col2 = _interopRequireDefault(require("antd/lib/col"));

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/grid/style/index.css");

var EventItemPopover = function EventItemPopover(props) {
  var eventItem = props.eventItem,
      title = props.title,
      startTime = props.startTime,
      endTime = props.endTime,
      statusColor = props.statusColor,
      subtitleGetter = props.subtitleGetter,
      viewEventClick = props.viewEventClick,
      viewEventText = props.viewEventText,
      viewEvent2Click = props.viewEvent2Click,
      viewEvent2Text = props.viewEvent2Text,
      eventItemPopoverTemplateResolver = props.eventItemPopoverTemplateResolver;
  var localeMoment = props.localeMoment,
      config = props.config;
  var start = localeMoment(startTime),
      end = localeMoment(endTime);

  if (typeof eventItemPopoverTemplateResolver !== "undefined") {
    return eventItemPopoverTemplateResolver(eventItem, title, start, end, statusColor);
  } else {
    var subtitleRow = /*#__PURE__*/_react.default.createElement("div", null);

    if (typeof subtitleGetter !== "undefined") {
      var subtitle = subtitleGetter(eventItem);

      if (typeof subtitle !== "undefined") {
        subtitleRow = /*#__PURE__*/_react.default.createElement(_row.default, {
          type: "flex",
          align: "middle"
        }, /*#__PURE__*/_react.default.createElement(_col2.default, {
          span: 2
        }, /*#__PURE__*/_react.default.createElement("div", null)), /*#__PURE__*/_react.default.createElement(_col2.default, {
          span: 22,
          className: "overflow-text"
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "header2-text",
          title: subtitle
        }, subtitle)));
      }
    }

    var opsRow = /*#__PURE__*/_react.default.createElement("div", null);

    if (typeof viewEventText !== "undefined" && typeof viewEventClick !== "undefined" && (typeof eventItem.clickable1 === "undefined" || eventItem.clickable1)) {
      var col = /*#__PURE__*/_react.default.createElement(_col2.default, {
        span: 22
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "header2-text",
        style: {
          color: '#108EE9',
          cursor: 'pointer'
        },
        onClick: function onClick() {
          viewEventClick(eventItem);
        }
      }, viewEventText));

      if (typeof viewEvent2Text !== "undefined" && typeof viewEvent2Click !== "undefined" && (typeof eventItem.clickable2 === "undefined" || eventItem.clickable2)) {
        col = /*#__PURE__*/_react.default.createElement(_col2.default, {
          span: 22
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "header2-text",
          style: {
            color: '#108EE9',
            cursor: 'pointer'
          },
          onClick: function onClick() {
            viewEventClick(eventItem);
          }
        }, viewEventText), /*#__PURE__*/_react.default.createElement("span", {
          className: "header2-text",
          style: {
            color: '#108EE9',
            cursor: 'pointer',
            marginLeft: '16px'
          },
          onClick: function onClick() {
            viewEvent2Click(eventItem);
          }
        }, viewEvent2Text));
      }

      opsRow = /*#__PURE__*/_react.default.createElement(_row.default, {
        type: "flex",
        align: "middle"
      }, /*#__PURE__*/_react.default.createElement(_col2.default, {
        span: 2
      }, /*#__PURE__*/_react.default.createElement("div", null)), col);
    } else if (typeof viewEvent2Text !== "undefined" && typeof viewEvent2Click !== "undefined" && (typeof eventItem.clickable2 === "undefined" || eventItem.clickable2)) {
      var _col = /*#__PURE__*/_react.default.createElement(_col2.default, {
        span: 22
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "header2-text",
        style: {
          color: '#108EE9',
          cursor: 'pointer'
        },
        onClick: function onClick() {
          viewEvent2Click(eventItem);
        }
      }, viewEvent2Text));

      opsRow = /*#__PURE__*/_react.default.createElement(_row.default, {
        type: "flex",
        align: "middle"
      }, /*#__PURE__*/_react.default.createElement(_col2.default, {
        span: 2
      }, /*#__PURE__*/_react.default.createElement("div", null)), _col);
    }

    var dateFormat = config.eventItemPopoverDateFormat;
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: '300px'
      }
    }, /*#__PURE__*/_react.default.createElement(_row.default, {
      type: "flex",
      align: "middle"
    }, /*#__PURE__*/_react.default.createElement(_col2.default, {
      span: 2
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "status-dot",
      style: {
        backgroundColor: statusColor
      }
    })), /*#__PURE__*/_react.default.createElement(_col2.default, {
      span: 22,
      className: "overflow-text"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "header2-text",
      title: title
    }, title))), subtitleRow, /*#__PURE__*/_react.default.createElement(_row.default, {
      type: "flex",
      align: "middle"
    }, /*#__PURE__*/_react.default.createElement(_col2.default, {
      span: 2
    }, /*#__PURE__*/_react.default.createElement("div", null)), /*#__PURE__*/_react.default.createElement(_col2.default, {
      span: 22
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "header1-text"
    }, start.format('HH:mm')), /*#__PURE__*/_react.default.createElement("span", {
      className: "help-text",
      style: {
        marginLeft: '8px'
      }
    }, start.format(dateFormat)), /*#__PURE__*/_react.default.createElement("span", {
      className: "header2-text",
      style: {
        marginLeft: '8px'
      }
    }, "-"), /*#__PURE__*/_react.default.createElement("span", {
      className: "header1-text",
      style: {
        marginLeft: '8px'
      }
    }, end.format('HH:mm')), /*#__PURE__*/_react.default.createElement("span", {
      className: "help-text",
      style: {
        marginLeft: '8px'
      }
    }, end.format(dateFormat)))), opsRow);
  }
};

var _default = EventItemPopover;
exports.default = _default;