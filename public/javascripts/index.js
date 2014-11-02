/* global $, d3, foo, templates, Foundation */
'use strict';

$(function () {
  var $tooltip = $('#tooltip'),
    fDropdownTriangleSideOffset = 10,
    fDropdownTriangleSize = 6,
    groupBoundingBox;

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

    groupBoundingBox = group.node().getBBox();

    $tooltip.html(templates.tooltip.render({
      info: datum[1] + ' things',
      from: (new Date(+datum[0])).toLocaleString(),
      to: (new Date(+datum[0] + 1000)).toLocaleString()
    }));
  });

  $tooltip.on('opened.fndtn.dropdown', function () {
    $tooltip.css({
      'margin-top': groupBoundingBox.height + fDropdownTriangleSize,
      'margin-left': groupBoundingBox.width / 2 - fDropdownTriangleSideOffset - fDropdownTriangleSize
    });
  });

  $(window).on('resize', function () {
    Foundation.libs.dropdown.close($tooltip);
  });
});
