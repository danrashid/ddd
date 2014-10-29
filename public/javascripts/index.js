/* global $, d3, foo */
'use strict';

$(function () {
  $.get('/stats/', function (res) {
    d3.select('svg')
      .datum(res)
      .call(foo.chart);
  });
});
