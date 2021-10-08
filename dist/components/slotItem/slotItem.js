"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

var _react = _interopRequireDefault(require("react"));

// import {MinusSquareOutlined, PlusSquareOutlined} from "@ant-design/icons";
var SlotItem = function SlotItem(props) {
  var item = props.item,
      slotClickedFunc = props.slotClickedFunc,
      slotItemTemplateResolver = props.slotItemTemplateResolver,
      width = props.width,
      config = props.config;
  var indents = [];

  for (var i = 0; i < item.indent; i++) {
    indents.push( /*#__PURE__*/_react.default.createElement("span", {
      key: "es".concat(i),
      className: "expander-space"
    }));
  } // let indent = <span key={`es${item.indent}`} className="expander-space"/>;
  // if (item.hasChildren) {
  //     indent = item.expanded ? (
  //         <MinusSquareOutlined
  //             key={`es${item.indent}`}
  //             onClick={() => onSlotItemExpandToggle(!item.expanded, item.slotId)}
  //         />
  //     ) : (
  //         <PlusSquareOutlined
  //             key={`es${item.indent}`}
  //             onClick={() => onSlotItemExpandToggle(!item.expanded, item.slotId)}
  //         />
  //     );
  // }
  // indents.push(indent);


  var a = typeof slotClickedFunc !== "undefined" ? /*#__PURE__*/_react.default.createElement("span", {
    className: "slot-cell"
  }, indents, /*#__PURE__*/_react.default.createElement("a", {
    className: "slot-text",
    onClick: function onClick() {
      return slotClickedFunc(item);
    }
  }, item.slotName)) : /*#__PURE__*/_react.default.createElement("span", {
    className: "slot-cell"
  }, indents, /*#__PURE__*/_react.default.createElement("span", {
    className: "slot-text"
  }, item.slotName));

  var slotItem = /*#__PURE__*/_react.default.createElement("div", {
    title: item.slotName,
    className: "overflow-text header2-text",
    style: {
      textAlign: "left"
    }
  }, a);

  if (!!slotItemTemplateResolver) {
    var temp = slotItemTemplateResolver(item, slotClickedFunc, width, "overflow-text header2-text");
    if (!!temp) slotItem = temp;
  }

  var tdStyle = {
    height: item.rowHeight
  };

  if (item.groupOnly) {
    tdStyle = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, tdStyle), {}, {
      backgroundColor: config.groupOnlySlotColor
    });
  }

  return /*#__PURE__*/_react.default.createElement("tr", {
    key: item.slotId
  }, /*#__PURE__*/_react.default.createElement("td", {
    "data-resource-id": item.slotId,
    style: tdStyle
  }, slotItem));
};

var _default = SlotItem;
exports.default = _default;