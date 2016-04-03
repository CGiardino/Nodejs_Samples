'use strict'
var fs = require('fs');
var readLine = require('readline');



/**
 * A utility that  reads the full list of customers and output the names and user ids of matching customers (within given meters), sorted by User ID (ascending).
 *
 * @class GCDCalculator
 * @constructor
 */
function GCDCalculator() {};

/**
 * My method description.  Like other pieces of your comment blocks, 
 * this can span multiple lines.
 *
 * @method _getDistanceFromJson
 * @param {String} path to the json file
 * @param {Array} array of integers with latitude and longitude in degrees
 * @param {Integer} distance to match in metres
 * @param {Function} callback function on the compliation of the computation, which returns an array with matched results
 */
GCDCalculator.prototype._getDistanceFromJson = function _getDistanceFromJson(jsonPath, cord, m, callback) {
  var result = [];
  //check function arguments
  if (jsonPath == null || cord == null || m == null || isNaN(m) || callback == null) {
    throw new Error("Wrong argument passing");
  }
  //create an interface with a stream reader
  var lineReader = readLine.createInterface({
    input: fs.createReadStream(jsonPath).on('error', function(error) {
      //return error if file doesn't exist
      callback(error, null);
    })
  });

  //read json file line by line
  lineReader.on('line', function(line) {
    var el = JSON.parse(line);
    //calculate the distance for the parsed line
    var dist = _getDistance([el["latitude"], el["longitude"]], cord);
    //collect results if within the passed meters threshold
    if (dist < m) {
      result = _insert({
        user_id: el["user_id"],
        name: el["name"]
      }, result)
    }
  }).on('close', function() {
    //return results in the callback
    callback(null, result);
  });
};

/**
 * Private method _getDistance to calculate the distance between two coordinates
 *
 * @method _getDistance
 * @private 
 * @param {Array} first cordinate array of integers with latitude and longitude in degrees
 * @param {Array} second cordinate array of integers with latitude and longitude in degrees
 * @return {Integer} great-circle distance in metres
 */
var _getDistance = function(cord1, cord2) {
  // Converts numeric degrees to radians 
  var toRadians = function(num) {
    return num * Math.PI / 180;
  }
  var lat1 = cord1[0],
    lat2 = cord2[0],
    lon1 = cord1[1],
    lon2 = cord2[1],
    φ1 = toRadians(lat1),
    φ2 = toRadians(lat2),
    Δλ = toRadians(lon2 - lon1),
    R = 6371000; // gives d in metres
  var d = Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)) * R;
  return d;
}



/**
 * Private method to insert integer in order (Quicksort) in the array.
 * note: faster the standard sort because applied on buffered read on line
 *
 * @method _insert
 * @private 
 * @param {Integer} element to insert into the array
 * @param {Array} array to update
 * @return {Array} updated array
 */
function _insert(element, array) {
  array.splice(_locationOf(element, array, _userIdCompare) + 1, 0, element);
  return array;
}

/**
 * Private function object _userIdCompare to compare two records in customer json file
 *
 * @method _userIdCompare
 * @private 
 * @param {Array} first cordinate array of integers with latitude and longitude in degrees
 * @param {Array} second cordinate array of integers with latitude and longitude in degrees
 * @return {Integer} great-circle distance in metres
 */
var _userIdCompare = function(a, b) {
  if (a.user_id < b.user_id) return -1;
  if (a.user_id > b.user_id) return 1;
  return 0;
};

/**
 * Private method to find location of element into array (Quicksort)
 *
 * @method _locationOf
 * @private 
 * @param {Integer} element to locate
 * @param {Array} array to compute the location
 * @param {Function} comparer function in array
 * @param {Integer} starting index to search
 * @param {Integer} ending index to search
 * @return {Integer} location to insert the element in array
 */
function _locationOf(element, array, comparer, start, end) {
  if (array.length === 0) {
    return -1;
  }
  start = start || 0;
  end = end || array.length;
  var pivot = (start + end) >> 1;
  var c = comparer(element, array[pivot]);
  if (end - start <= 1) return c == -1 ? pivot - 1 : pivot;

  switch (c) {
    case -1:
      return _locationOf(element, array, comparer, start, pivot);
    case 0:
      return pivot;
    case 1:
      return _locationOf(element, array, comparer, pivot, end);
  };
};

module.exports = GCDCalculator;