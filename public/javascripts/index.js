/* global $, d3, foo, templates */
'use strict';

$(function () {
  var tooltipId = 'tooltip',
    tooltip = foo.tooltip(tooltipId);

  $.get('/stats/?max=1000', function (res) {
    d3.select('#first')
      .datum(res[0].values)
      .call(foo.chart, {
        tooltipId: tooltipId
      });
  });

  $.get('/stats/?max=500', function (res) {
    d3.select('#second')
      .datum(res[0].values)
      .call(foo.chart, {
        tooltipId: tooltipId
      });
  });

  $.get('/stats/', function (res) {
    d3.select('#third')
      .datum(res[0].values)
      .call(foo.chart, {
        tooltipId: tooltipId
      });
  });

  $('#legend').html(templates.things.render({
    things: [
      {id: 'foo'},
      {id: 'bar'},
      {id: 'baz'}
    ]
  }));

  $(document).on('click', 'svg [data-dropdown]', function () {
    tooltip.populate(this, function (datum) {
      return {
        info: datum[1] + ' things'
      };
    });
  });
});
