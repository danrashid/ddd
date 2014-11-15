/* global $, d3, foo, templates */
'use strict';

$(function () {
  var tooltipId = 'tooltip',
    tooltip = foo.tooltip(tooltipId);

  $.get('/stats/?layers=3', function (res) {
    var stack = foo.chart(d3.select('#stack').datum(res), {
        tooltipId: tooltipId
      });

    $('#legend')
      .html(templates.legend.render({
        res: res
      }))
      .on('click', 'input', function () {
        var $input = $(this),
          guid = $input.data('guid'),
          hidden = !$input.is(':checked');

        stack.toggleLayer(guid, hidden);
      });
  });

  $.get('/stats/?max=1000', function (res) {
    d3.select('#first')
      .datum(res)
      .call(foo.chart, {
        tooltipId: tooltipId
      });
  });

  $.get('/stats/?max=500', function (res) {
    d3.select('#second')
      .datum(res)
      .call(foo.chart, {
        tooltipId: tooltipId
      });
  });

  $.get('/stats/', function (res) {
    d3.select('#third')
      .datum(res)
      .call(foo.chart, {
        tooltipId: tooltipId
      });
  });

  $(document).on('click', 'svg [data-dropdown]', function () {
    tooltip.populate(this, function (datum) {
      return {
        layers: datum.layers
      };
    });
  });
});
