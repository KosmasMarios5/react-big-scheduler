"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPos = getPos;

function getPos(element) {
  var x = 0,
      y = 0;

  if (!!element) {
    do {
      x += element.offsetLeft - element.scrollLeft;
      y += element.offsetTop - element.scrollTop;
    } while (element = element.offsetParent);
  }

  return {
    'x': x,
    'y': y
  };
}