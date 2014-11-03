/* global $, foo, Foundation */
'use strict';

foo.tooltip = function (sel) {
  var $tooltip = $(sel),
    fDropdownBorderWidth = 1,
    fDropdownTriangleSideOffset = 10,
    fDropdownTriangleSize = 6,
    groupBoundingBox;

  function populate(group, template, values) {
    groupBoundingBox = group.node().getBBox();

    $tooltip
      .toggleClass('right', group.classed('right'))
      .html(template.render(values));
  }

  $tooltip.on('opened.fndtn.dropdown', function () {
    var marginLeft = $tooltip.hasClass('right') ?
      -$tooltip.outerWidth() + fDropdownTriangleSideOffset + fDropdownTriangleSize + groupBoundingBox.width / 2:
      -fDropdownBorderWidth * 2 - fDropdownTriangleSideOffset - fDropdownTriangleSize + groupBoundingBox.width / 2;

    $tooltip.css({
      'margin-top': groupBoundingBox.height + fDropdownTriangleSize,
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
