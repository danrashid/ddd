/* global $, d3, foo */
'use strict';

$(function () {
  $.get('/stats/?max=1000', function (res) {
    d3.select('#first')
      .datum(res)
      .call(foo.chart);
  });

  $.get('/stats/?max=500', function (res) {
    d3.select('#second')
      .datum(res)
      .call(foo.chart);
  });

  $.get('/stats/', function (res) {
    d3.select('#third')
      .datum(res)
      .call(foo.chart);
  });

  $('#things').html(templates.things.render({
    things: [
      {name: 'foo'},
      {name: 'bar'},
      {name: 'baz'}
    ]
  }))
});
