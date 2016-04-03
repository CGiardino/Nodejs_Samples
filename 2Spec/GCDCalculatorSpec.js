'use strict'
var GCDCalculator = require("../2Src/GCDCalculator");
describe("GCDCalculator", function() {

  var gcdCalculator, cord, distResult, stringValue, undefinedValue, nullValue, expectRes, distResultError, meters, distResult2;

  beforeEach(function(done) {
    gcdCalculator = new GCDCalculator();
    cord = [56.3381985, -6.2592576];
    
    //exception data
    nullValue = null;
    undefinedValue = undefined;
    stringValue = "test";
    meters = 500000;

    //results to compare
    expectRes=[ { user_id : 3, name : 'Jack Enright' }, { user_id : 4, name : 'Ian Kehoe' }, { user_id : 5, name : 'Nora Dempsey' }, { user_id : 6, name : 'Theresa Enright' }, { user_id : 7, name : 'Frank Kehoe' }, { user_id : 8, name : 'Eoin Ahearn' }, { user_id : 9, name : 'Jack Dempsey' }, { user_id : 10, name : 'Georgina Gallagher' }, { user_id : 11, name : 'Richard Finnegan' }, { user_id : 12, name : 'Christina McArdle' }, { user_id : 13, name : 'Olive Ahearn' }, { user_id : 15, name : 'Michael Ahearn' }, { user_id : 16, name : 'Ian Larkin' }, { user_id : 17, name : 'Patricia Cahill' }, { user_id : 18, name : 'Bob Larkin' }, { user_id : 19, name : 'Enid Cahill' }, { user_id : 20, name : 'Enid Enright' }, { user_id : 22, name : 'Charlie McArdle' }, { user_id : 23, name : 'Eoin Gallagher' }, { user_id : 24, name : 'Rose Enright' }, { user_id : 25, name : 'David Behan' }, { user_id : 26, name : 'Stephen McArdle' }, { user_id : 27, name : 'Enid Gallagher' }, { user_id : 28, name : 'Charlie Halligan' }, { user_id : 29, name : 'Oliver Ahearn' }, { user_id : 30, name : 'Nick Enright' }, { user_id : 31, name : 'Alan Behan' }, { user_id : 39, name : 'Lisa Ahearn' } ];
    
    //async call to get the distances
    gcdCalculator.getDistanceFromJson('data/gistfile1.txt', cord, meters, function(err, result){
      distResult=result;
      done();
    });
    gcdCalculator.getDistanceFromJson('data/gistfile1.txt', cord, meters, function(err, result){
      distResult2=result;
      done();
    });
    gcdCalculator.getDistanceFromJson('NotExist', cord, meters, function(err, result){      
      distResultError=result;
      done();
    })
  });

  it("should be able to calculate distance between two coordinates", function() {
    //exception validation
    expect(distResultError).toBeNull();
    expect(function(){gcdCalculator.getDistanceFromJson('data/gistfile1.txt', cord, meters)}).toThrow();
    expect(function(){gcdCalculator.getDistanceFromJson('data/gistfile1.txt', nullValue, meters)}).toThrow();
    expect(function(){gcdCalculator.getDistanceFromJson('data/gistfile1.txt', cord, undefinedValue)}).toThrow();
    expect(function(){gcdCalculator.getDistanceFromJson('data/gistfile1.txt', stringValue, undefinedValue)}).toThrow();

    //evaluation
    expect(distResult).toEqual(expectRes);
    expect(distResult2).toEqual(expectRes);
  });

});
