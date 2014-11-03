/* global $, foo, Foundation */
'use strict';

foo.tooltip = function (sel) {
  var $tooltip = $(sel),
    fDropdownBorderWidth = 1, // $f-dropdown-border-width
    fDropdownTriangleSize = 6, // $f-dropdown-triangle-size
    fDropdownTriangleSideOffset = 10, // $f-dropdown-triangle-side-offset
    d3TriggerBBox;

  function populate(d3Trigger, template, values) {
    d3TriggerBBox = d3Trigger.node().getBBox();

    $tooltip
      .toggleClass('right', d3Trigger.classed('right'))
      .html(template.render(values));
  }

  $tooltip.on('opened.fndtn.dropdown', function () {
    var triangleCenter = fDropdownBorderWidth + fDropdownTriangleSideOffset + fDropdownTriangleSize,
      barCenter = d3TriggerBBox.width / 2,
      marginLeft = $tooltip.hasClass('right') ?
        -$tooltip.outerWidth() + triangleCenter + barCenter :
        -(triangleCenter) + barCenter;

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
