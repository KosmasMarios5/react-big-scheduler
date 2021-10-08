"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _col = _interopRequireDefault(require("antd/lib/col"));

var _row = _interopRequireDefault(require("antd/lib/row"));

var _radio = _interopRequireDefault(require("antd/lib/radio"));

var _popover = _interopRequireDefault(require("antd/lib/popover"));

var _calendar = _interopRequireDefault(require("antd/lib/calendar"));

var _DnDSource = _interopRequireDefault(require("./components/dnd/DnDSource"));

var _DnDContext = _interopRequireDefault(require("./components/dnd/DnDContext"));

var _ResourceView = _interopRequireDefault(require("./components/resource/ResourceView"));

var _HeaderView = _interopRequireDefault(require("./components/partials/header/HeaderView"));

var _BodyView = _interopRequireDefault(require("./components/partials/BodyView"));

var _AgendaView = _interopRequireDefault(require("./components/agenda/AgendaView"));

var _AddMorePopover = _interopRequireDefault(require("./components/addMore/AddMorePopover"));

var _ViewTypes = _interopRequireDefault(require("./types/ViewTypes"));

var _CellUnits = _interopRequireDefault(require("./types/CellUnits"));

var _SummaryPos = _interopRequireDefault(require("./types/SummaryPos"));

var _DemoData = _interopRequireDefault(require("../DemoData"));

require("antd/dist/antd.css");

require("./css/style.css");

var _icons = require("@ant-design/icons");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var RadioButton = _radio.default.Button;
var RadioGroup = _radio.default.Group;

var SchedulerMain = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(SchedulerMain, _Component);

  var _super = (0, _createSuper2.default)(SchedulerMain);

  function SchedulerMain(props) {
    var _this;

    (0, _classCallCheck2.default)(this, SchedulerMain);
    _this = _super.call(this, props);

    _this.onWindowResize = function (e) {
      var setDocumentWidth = _this.props.setDocumentWidth;
      setDocumentWidth(document.documentElement.clientWidth);

      _this.setState({
        documentWidth: document.documentElement.clientWidth,
        documentHeight: document.documentElement.clientHeight
      });
    };

    _this.resolveScrollbarSize = function () {
      var contentScrollbarHeight = 17,
          contentScrollbarWidth = 17,
          resourceScrollbarHeight = 17,
          resourceScrollbarWidth = 17,
          contentHeight = _this.props.contentHeight;

      if (!!_this.schedulerContent) {
        contentScrollbarHeight = _this.schedulerContent.offsetHeight - _this.schedulerContent.clientHeight;
        contentScrollbarWidth = _this.schedulerContent.offsetWidth - _this.schedulerContent.clientWidth;
      }

      if (!!_this.schedulerResource) {
        resourceScrollbarHeight = _this.schedulerResource.offsetHeight - _this.schedulerResource.clientHeight;
        resourceScrollbarWidth = _this.schedulerResource.offsetWidth - _this.schedulerResource.clientWidth;
      }

      if (!!_this.schedulerContentBgTable && !!_this.schedulerContentBgTable.offsetHeight) {
        contentHeight = _this.schedulerContentBgTable.offsetHeight;
      }

      var tmpState = {};
      var needSet = false;

      if (contentScrollbarHeight !== _this.state.contentScrollbarHeight) {
        tmpState = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, tmpState), {}, {
          contentScrollbarHeight: contentScrollbarHeight
        });
        needSet = true;
      }

      if (contentScrollbarWidth !== _this.state.contentScrollbarWidth) {
        tmpState = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, tmpState), {}, {
          contentScrollbarWidth: contentScrollbarWidth
        });
        needSet = true;
      }

      if (contentHeight !== _this.state.contentHeight) {
        tmpState = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, tmpState), {}, {
          contentHeight: contentHeight
        });
        needSet = true;
      }

      if (resourceScrollbarHeight !== _this.state.resourceScrollbarHeight) {
        tmpState = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, tmpState), {}, {
          resourceScrollbarHeight: resourceScrollbarHeight
        });
        needSet = true;
      }

      if (resourceScrollbarWidth !== _this.state.resourceScrollbarWidth) {
        tmpState = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, tmpState), {}, {
          resourceScrollbarWidth: resourceScrollbarWidth
        });
        needSet = true;
      }

      if (needSet) _this.setState(tmpState);
    };

    _this.schedulerHeadRef = function (element) {
      _this.schedulerHead = element;
    };

    _this.onSchedulerHeadMouseOver = function () {
      _this.currentArea = 2;
    };

    _this.onSchedulerHeadMouseOut = function () {
      _this.currentArea = -1;
    };

    _this.onSchedulerHeadScroll = function (proxy, event) {
      if ((_this.currentArea === 2 || _this.currentArea === -1) && _this.schedulerContent.scrollLeft != _this.schedulerHead.scrollLeft) _this.schedulerContent.scrollLeft = _this.schedulerHead.scrollLeft;
    };

    _this.schedulerResourceRef = function (element) {
      _this.schedulerResource = element;
    };

    _this.onSchedulerResourceMouseOver = function () {
      _this.currentArea = 1;
    };

    _this.onSchedulerResourceMouseOut = function () {
      _this.currentArea = -1;
    };

    _this.onSchedulerResourceScroll = function (proxy, event) {
      if ((_this.currentArea === 1 || _this.currentArea === -1) && _this.schedulerContent.scrollTop != _this.schedulerResource.scrollTop) _this.schedulerContent.scrollTop = _this.schedulerResource.scrollTop;
    };

    _this.schedulerContentRef = function (element) {
      _this.schedulerContent = element;
    };

    _this.schedulerContentBgTableRef = function (element) {
      _this.schedulerContentBgTable = element;
    };

    _this.onSchedulerContentMouseOver = function () {
      _this.currentArea = 0;
    };

    _this.onSchedulerContentMouseOut = function () {
      _this.currentArea = -1;
    };

    _this.onSchedulerContentScroll = function (proxy, event) {
      if (_this.currentArea === 0 || _this.currentArea === -1) {
        if (_this.schedulerHead.scrollLeft !== _this.schedulerContent.scrollLeft) _this.schedulerHead.scrollLeft = _this.schedulerContent.scrollLeft;
        if (_this.schedulerResource.scrollTop !== _this.schedulerContent.scrollTop) _this.schedulerResource.scrollTop = _this.schedulerContent.scrollTop;
      }

      var _this$props = _this.props,
          onScrollLeft = _this$props.onScrollLeft,
          onScrollRight = _this$props.onScrollRight,
          onScrollTop = _this$props.onScrollTop,
          onScrollBottom = _this$props.onScrollBottom;
      var _this$state = _this.state,
          scrollLeft = _this$state.scrollLeft,
          scrollTop = _this$state.scrollTop;

      if (_this.schedulerContent.scrollLeft !== scrollLeft) {
        if (_this.schedulerContent.scrollLeft === 0 && typeof onScrollLeft !== "undefined") {
          onScrollLeft(_this.schedulerContent, _this.schedulerContent.scrollWidth - _this.schedulerContent.clientWidth);
        }

        if (_this.schedulerContent.scrollLeft === _this.schedulerContent.scrollWidth - _this.schedulerContent.clientWidth && onScrollRight != undefined) {
          onScrollRight(_this.schedulerContent, _this.schedulerContent.scrollWidth - _this.schedulerContent.clientWidth);
        }
      } else if (_this.schedulerContent.scrollTop !== scrollTop) {
        if (_this.schedulerContent.scrollTop === 0 && typeof onScrollTop !== "undefined") {
          onScrollTop(_this.schedulerContent, _this.schedulerContent.scrollHeight - _this.schedulerContent.clientHeight);
        }

        if (_this.schedulerContent.scrollTop === _this.schedulerContent.scrollHeight - _this.schedulerContent.clientHeight && onScrollBottom != undefined) {
          onScrollBottom(_this.schedulerContent, _this.schedulerContent.scrollHeight - _this.schedulerContent.clientHeight);
        }
      }

      _this.setState({
        scrollLeft: _this.schedulerContent.scrollLeft,
        scrollTop: _this.schedulerContent.scrollTop
      });
    };

    _this.onViewChange = function (e) {
      var onViewChange = _this.props.onViewChange;
      var viewType = parseInt(e.target.value.charAt(0));
      var showAgenda = e.target.value.charAt(1) === '1';
      var isEventPerspective = e.target.value.charAt(2) === '1';
      onViewChange(viewType, showAgenda, isEventPerspective);
    };

    _this.goNext = function () {
      var nextClick = _this.props.nextClick;
      nextClick();
    };

    _this.goBack = function () {
      var prevClick = _this.props.prevClick;
      prevClick();
    };

    _this.handleVisibleChange = function (visible) {
      _this.setState({
        visible: visible
      });
    };

    _this.onSelect = function (date) {
      _this.setState({
        visible: false
      });

      var onSelectDate = _this.props.onSelectDate;
      onSelectDate(date);
    };

    var _contentHeight = props.contentHeight,
        isSchedulerResponsive = props.isSchedulerResponsive;
    _this.currentArea = -1;
    _this.state = {
      visible: false,
      contentHeight: _contentHeight,
      contentScrollbarHeight: 17,
      contentScrollbarWidth: 17,
      resourceScrollbarHeight: 17,
      resourceScrollbarWidth: 17,
      scrollLeft: 0,
      scrollTop: 0,
      documentWidth: document.documentElement.clientWidth,
      documentHeight: document.documentElement.clientHeight
    };
    if (isSchedulerResponsive) window.onresize = _this.onWindowResize;
    return _this;
  }

  (0, _createClass2.default)(SchedulerMain, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.resolveScrollbarSize();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state, s) {
      this.resolveScrollbarSize();
      var _this$props2 = this.props,
          headers = _this$props2.headers,
          localeMoment = _this$props2.localeMoment,
          behaviors = _this$props2.behaviors,
          scrollToSpecialMoment = _this$props2.scrollToSpecialMoment,
          setScrollToSpecialMoment = _this$props2.setScrollToSpecialMoment,
          startDate = _this$props2.startDate,
          endDate = _this$props2.endDate,
          contentCellWidth = _this$props2.contentCellWidth;

      if (scrollToSpecialMoment && !!behaviors.getScrollSpecialMomentFunc) {
        if (!!this.schedulerContent && this.schedulerContent.scrollWidth > this.schedulerContent.clientWidth) {
          var start = localeMoment(startDate).startOf('day'),
              end = localeMoment(endDate).endOf('day'),
              specialMoment = behaviors.getScrollSpecialMomentFunc(localeMoment, start, end);

          if (specialMoment >= start && specialMoment <= end) {
            var index = 0;
            headers.forEach(function (item) {
              var header = localeMoment(item.time);
              if (specialMoment >= header) index++;
            });
            this.schedulerContent.scrollLeft = (index - 1) * contentCellWidth;
            setScrollToSpecialMoment(false);
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          leftCustomHeader = _this$props3.leftCustomHeader,
          rightCustomHeader = _this$props3.rightCustomHeader;
      var _this$props4 = this.props,
          width = _this$props4.width,
          dateLabel = _this$props4.dateLabel,
          renderData = _this$props4.renderData,
          viewType = _this$props4.viewType,
          showAgenda = _this$props4.showAgenda,
          isEventPerspective = _this$props4.isEventPerspective,
          config = _this$props4.config;
      var calendarPopoverEnabled = config.calendarPopoverEnabled;
      var defaultValue = "".concat(viewType).concat(showAgenda ? 1 : 0).concat(isEventPerspective ? 1 : 0);
      var radioButtonList = config.views.map(function (item) {
        return /*#__PURE__*/_react.default.createElement(RadioButton, {
          key: "".concat(item.viewType).concat(item.showAgenda ? 1 : 0).concat(item.isEventPerspective ? 1 : 0),
          value: "".concat(item.viewType).concat(item.showAgenda ? 1 : 0).concat(item.isEventPerspective ? 1 : 0)
        }, /*#__PURE__*/_react.default.createElement("span", {
          style: {
            margin: "0px 8px"
          }
        }, item.viewName));
      });

      var tbodyContent = /*#__PURE__*/_react.default.createElement("tr", null);

      if (showAgenda) {
        tbodyContent = /*#__PURE__*/_react.default.createElement(_AgendaView.default, this.props);
      } else {
        var _this$props5 = this.props,
            resourceTableWidth = _this$props5.resourceTableWidth,
            schedulerWidth = _this$props5.schedulerWidth;
        var schedulerContainerWidth = width - resourceTableWidth + 1;
        var contentScrollbarHeight = this.state.contentScrollbarHeight,
            contentScrollbarWidth = this.state.contentScrollbarWidth,
            resourceScrollbarHeight = this.state.resourceScrollbarHeight,
            resourceScrollbarWidth = this.state.resourceScrollbarWidth,
            contentHeight = this.state.contentHeight;
        var resourcePaddingBottom = resourceScrollbarHeight === 0 ? contentScrollbarHeight : 0;
        var contentPaddingBottom = contentScrollbarHeight === 0 ? resourceScrollbarHeight : 0;
        var schedulerContentStyle = {
          overflow: 'auto',
          margin: "0px",
          position: "relative",
          paddingBottom: contentPaddingBottom
        };
        var resourceContentStyle = {
          overflowX: "auto",
          overflowY: "auto",
          width: resourceTableWidth + resourceScrollbarWidth - 2,
          margin: "0px -".concat(contentScrollbarWidth, "px 0px 0px")
        };

        if (config.schedulerMaxHeight > 0) {
          schedulerContentStyle = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, schedulerContentStyle), {}, {
            maxHeight: config.schedulerMaxHeight - config.tableHeaderHeight
          });
          resourceContentStyle = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, resourceContentStyle), {}, {
            maxHeight: config.schedulerMaxHeight - config.tableHeaderHeight
          });
        }

        var resourceName = isEventPerspective ? config.taskName : config.resourceName;
        tbodyContent = /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
          style: {
            width: resourceTableWidth,
            verticalAlign: 'top'
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "resource-view"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            overflow: "hidden",
            borderBottom: "1px solid #e9e9e9",
            height: config.tableHeaderHeight
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            overflowX: "scroll",
            overflowY: "hidden",
            margin: "0px 0px -".concat(contentScrollbarHeight, "px")
          }
        }, /*#__PURE__*/_react.default.createElement("table", {
          className: "resource-table"
        }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", {
          style: {
            height: config.tableHeaderHeight
          }
        }, /*#__PURE__*/_react.default.createElement("th", {
          className: "header3-text"
        }, resourceName)))))), /*#__PURE__*/_react.default.createElement("div", {
          style: resourceContentStyle,
          ref: this.schedulerResourceRef,
          onMouseOver: this.onSchedulerResourceMouseOver,
          onMouseOut: this.onSchedulerResourceMouseOut,
          onScroll: this.onSchedulerResourceScroll
        }, /*#__PURE__*/_react.default.createElement(_ResourceView.default, Object.assign({}, this.props, {
          contentScrollbarHeight: resourcePaddingBottom
        }))))), /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement("div", {
          className: "scheduler-view",
          style: {
            width: schedulerContainerWidth,
            verticalAlign: 'top'
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            overflow: "hidden",
            borderBottom: "1px solid #e9e9e9",
            height: config.tableHeaderHeight
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            overflowX: "scroll",
            overflowY: "hidden",
            margin: "0px 0px -".concat(contentScrollbarHeight, "px")
          },
          ref: this.schedulerHeadRef,
          onMouseOver: this.onSchedulerHeadMouseOver,
          onMouseOut: this.onSchedulerHeadMouseOut,
          onScroll: this.onSchedulerHeadScroll
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            paddingRight: "".concat(contentScrollbarWidth, "px"),
            width: schedulerWidth + contentScrollbarWidth
          }
        }, /*#__PURE__*/_react.default.createElement("table", {
          className: "scheduler-bg-table"
        }, /*#__PURE__*/_react.default.createElement(_HeaderView.default, this.props))))), /*#__PURE__*/_react.default.createElement("div", {
          style: schedulerContentStyle,
          ref: this.schedulerContentRef,
          onMouseOver: this.onSchedulerContentMouseOver,
          onMouseOut: this.onSchedulerContentMouseOut,
          onScroll: this.onSchedulerContentScroll
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            width: schedulerWidth,
            height: contentHeight
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "scheduler-content"
        }, /*#__PURE__*/_react.default.createElement("table", {
          className: "scheduler-content-table"
        }, /*#__PURE__*/_react.default.createElement("tbody", null, renderData // .filter(o => o.expanded)
        .map(function (item) {
          return /*#__PURE__*/_react.default.createElement(_DnDContext.default, Object.assign({}, _this2.props, {
            key: item.slotId,
            resourceEvents: item
          }));
        })))), /*#__PURE__*/_react.default.createElement("div", {
          className: "scheduler-bg"
        }, /*#__PURE__*/_react.default.createElement("table", {
          className: "scheduler-bg-table",
          style: {
            width: schedulerWidth
          },
          ref: this.schedulerContentBgTableRef
        }, /*#__PURE__*/_react.default.createElement(_BodyView.default, this.props))))))));
      }

      var schedulerHeader = /*#__PURE__*/_react.default.createElement("div", null);

      var selectedDate = this.props.selectedDate;

      if (config.headerEnabled) {
        schedulerHeader = /*#__PURE__*/_react.default.createElement(_row.default, {
          type: "flex",
          align: "middle",
          justify: "space-between",
          style: {
            marginBottom: '24px'
          }
        }, leftCustomHeader, /*#__PURE__*/_react.default.createElement(_col.default, null, /*#__PURE__*/_react.default.createElement("div", {
          className: "header2-text"
        }, /*#__PURE__*/_react.default.createElement(_icons.LeftOutlined, {
          style: {
            marginRight: 8
          },
          className: "icon-nav",
          onClick: this.goBack
        }), calendarPopoverEnabled ? /*#__PURE__*/_react.default.createElement(_popover.default, {
          content: /*#__PURE__*/_react.default.createElement("div", {
            className: "popover-calendar"
          }, /*#__PURE__*/_react.default.createElement(_calendar.default, {
            fullscreen: false,
            onSelect: this.onSelect,
            value: selectedDate
          })),
          placement: "bottom",
          trigger: "click",
          visible: this.state.visible,
          onVisibleChange: this.handleVisibleChange
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: 'header2-text-label',
          style: {
            cursor: 'pointer'
          }
        }, dateLabel)) : /*#__PURE__*/_react.default.createElement("span", {
          className: 'header2-text-label'
        }, dateLabel), /*#__PURE__*/_react.default.createElement(_icons.RightOutlined, {
          style: {
            marginLeft: 8
          },
          className: "icon-nav",
          onClick: this.goNext
        }))), /*#__PURE__*/_react.default.createElement(_col.default, null, /*#__PURE__*/_react.default.createElement(RadioGroup, {
          defaultValue: defaultValue,
          size: "default",
          onChange: this.onViewChange
        }, radioButtonList)), rightCustomHeader);
      }

      return /*#__PURE__*/_react.default.createElement("table", {
        id: "RBS-Scheduler-root",
        className: "scheduler",
        style: {
          width: "".concat(width, "px")
        }
      }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
        colSpan: "2"
      }, schedulerHeader))), /*#__PURE__*/_react.default.createElement("tbody", null, tbodyContent));
    }
  }]);
  return SchedulerMain;
}(_react.Component);

var _default = SchedulerMain;
exports.default = _default;