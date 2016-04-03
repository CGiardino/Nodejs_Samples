'use strict'
var Flattener = require("../1Src/Flattener");

describe("Flattener", function() {
    var flattener, nullValue, undefinedValue, undefinedValueArray, stringValue, arrayString, arrayEmptyEl, arrayOneEl, arrayMonoDim, arrayBiDim, arrayMultiDim, arrayMultiDimEmptyEl, flattedArrayEmptyEl, flattedArrayOneEl, flattedArrayMonoDim, flattedArrayBiDim, flattedArrayMultiDim, flattedArrayMultiDimEmptyEl, arrayMultiDimEmptyEl2, flattedArrayMultiDimEmptyEl2, computedFlattedArrayEmptyEl, computedFlattedArrayOneEl, computedFlattedArrayMonoDim, computedFlattedArrayBiDim, computedFlattedArrayMultiDim, computedFlattedArrayMultiDimEmptyEl, computedFlattedArrayMultiDimEmptyEl2;
    beforeEach(function() {
        flattener= new Flattener();
        //exception data
        nullValue=null;
        undefinedValue=undefined;
        undefinedValueArray=[null,[null],null];
        stringValue="test";
        arrayString=[3,"test"];
        arrayEmptyEl=[];
        //initial values
        arrayOneEl=[10];
        arrayMonoDim=[10,2,3,5,125,32,0];
        arrayBiDim=[10,[2,3],111];
        arrayMultiDim=[[12,[3],52,[[1,3],235,2,3],15],[23,1]];
        arrayMultiDimEmptyEl=[[12,52, ,[[1,3],235,2 , ,3],15,],2,[23,1]];
        arrayMultiDimEmptyEl2=[[12,52, ,[[1,3],235,2 , ,3],15,],2,[23,1],3];
        //results to compare
        flattedArrayEmptyEl=[];
        flattedArrayOneEl=[10];
        flattedArrayMonoDim=[10,2,3,5,125,32,0];
        flattedArrayBiDim=[10,2,3,111];
        flattedArrayMultiDim=[12,3,52,1,3,235,2,3,15,23,1];
        flattedArrayMultiDimEmptyEl=[12,52,1,3,235,2,3,15,2,23,1];
    });

    it("should be able to flatten a array of integers", function() {
        //exception validation
        expect(function(){flattener.flatten(nullValue)}).toThrow();
        expect(function(){flattener.flatten(undefinedValue)}).toThrow();
        expect(flattener.flatten(stringValue)).toEqual([]);
        expect(flattener.flatten(arrayString)).toEqual([3]);
        expect(flattener.flatten(undefinedValueArray)).toEqual([]);
        //computed elements
        computedFlattedArrayEmptyEl=flattener.flatten(arrayEmptyEl);
        computedFlattedArrayOneEl = flattener.flatten(arrayOneEl);
        computedFlattedArrayMonoDim = flattener.flatten(arrayMonoDim);
        computedFlattedArrayBiDim = flattener.flatten(arrayBiDim);
        computedFlattedArrayMultiDim = flattener.flatten(arrayMultiDim);
        computedFlattedArrayMultiDimEmptyEl = flattener.flatten(arrayMultiDimEmptyEl);
        computedFlattedArrayMultiDimEmptyEl2 = flattener.flatten(arrayMultiDimEmptyEl2);
        //evaluation
        expect(flattedArrayEmptyEl).toEqual(computedFlattedArrayEmptyEl);
        expect(flattedArrayOneEl).toEqual(computedFlattedArrayOneEl);
        expect(flattedArrayMonoDim).toEqual(computedFlattedArrayMonoDim);
        expect(flattedArrayBiDim).toEqual(computedFlattedArrayBiDim);
        expect(flattedArrayMultiDim).toEqual(computedFlattedArrayMultiDim);
        expect(flattedArrayMultiDimEmptyEl).toEqual(computedFlattedArrayMultiDimEmptyEl);
    });
});
