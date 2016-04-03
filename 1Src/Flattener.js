'use strict';

/**
 * A utility that transforms an array of arbitrarily nested arrays of integers into a flat array of integers. e.g. [[1,2,[3]],4] → [1,2,3,4].
 *
 * @class Flattener
 * @constructor
 */
function Flattener() {}

/**
 * Reduce arbitrarily nested arrays of integers into a flat array recursively. It removes undefined or strings values if present.
 *
 * @method flatten
 * @param {Array} toFlatten arbitrarily nested array
 * @return {Array} flatted array
 */
Flattener.prototype.flatten = function flatten(toFlatten) {
  if (toFlatten == null) {
    throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  var len = toFlatten.length,
    i = 0,
    toReturn = [];
  while (i < len) {
    if (Array.isArray(toFlatten[i])) {
      toReturn = _concat(toReturn, flatten(toFlatten[i]));
    } else {
      if (_checkInteger(toFlatten[i])) {
        toReturn = _concat(toReturn, toFlatten[i]);
      }
    }
    i++;
  }
  return toReturn;
}

/**
 * Private concat of two arrays of integers or array and single element
 *
 * @method _concat
 * @private 
 * @param {Array || Integer} first array of integers to concat
 * @param {Array || Integer} second array of integers to concat
 * @return 
 */
function _concat(arr1, arr2) {
  if (!Array.isArray(arr2)) {
    if (_checkInteger(arr2)) {
      arr1[arr1.length] = arr2;
    }
  } else {
    for (var i = 0; i < arr2.length; i++) {
      if (arr2[i] != null) {
        if (_checkInteger(arr2[i])) {
          arr1[arr1.length] = arr2[i];
        }
      }
    }
  }
  return arr1;
}

/**
 * Private method to check if element is an integer
 *
 * @method _checkInteger
 * @private  
 * @param {Integer} element  to check
 * @return 
 */
function _checkInteger(el) {
  if (el != null && !isNaN(el)) {
    return true;
  } 
  return false;
}

module.exports = Flattener;