/* global $, foo, Foundation */
'use strict';

foo.tooltip = function (sel) {
  var $tooltip = $(sel),
    fDropdownBorderWidth = 1,
    fDropdownTriangleSideOffset = 10,
    fDropdownTriangleSize = 6,
    d3TriggerBBox;

  function populate(d3Trigger, template, values) {
    d3TriggerBBox = d3Trigger.node().getBBox();

    $tooltip
      .toggleClass('right', d3Trigger.classed('right'))
      .html(template.render(values));
  }

  $tooltip.on('opened.fndtn.dropdown', function () {
    var marginLeft = $tooltip.hasClass('right') ?
      -$tooltip.outerWidth() + fDropdownTriangleSideOffset + fDropdownTriangleSize + d3TriggerBBox.width / 2 :
      -fDropdownBorderWidth * 2 - fDropdownTriangleSideOffset - fDropdownTriangleSize + d3TriggerBBox.width / 2;

    $tooltip.css({
      'margin-top': d3TriggerBBox.height + fDropdownTriangleSize,
      'margin-left': marginLeft
    });
  });

  $(window).on('resize', function () {
    Foundation.libs.dropdown.close($tooltip);
  });

  return {
    populate: populate
  };
};
