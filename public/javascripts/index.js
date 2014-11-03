/* global $, d3, foo, templates */
'use strict';

$(function () {
  var tooltip = foo.tooltip('#tooltip');

  $.when(
    $.get('/stats/?max=1000', function (res) {
      d3.select('#first')
        .datum(res)
        .call(foo.chart);
    }),
    $.get('/stats/?max=500', function (res) {
      d3.select('#second')
        .datum(res)
        .call(foo.chart);
    }),
    $.get('/stats/', function (res) {
      d3.select('#third')
        .datum(res)
        .call(foo.chart);
    })
  ).done(function () {
    $(document).foundation('dropdown', 'init');
  });

  $('#things').html(templates.things.render({
    things: [
      {name: 'foo'},
      {name: 'bar'},
      {name: 'baz'}
    ]
  }));

  $(document).on('click', '.group', function() {
    var group = d3.select(this),
      datum = group.datum();

    tooltip.populate(group, templates.tooltip, {
      info: datum[1] + ' things',
      from: (new Date(+datum[0])).toLocaleString(),
      to: (new Date(+datum[0] + 1000)).toLocaleString()
    });
  });
});
