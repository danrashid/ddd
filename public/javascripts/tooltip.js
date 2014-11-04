/* global $, d3, foo, Foundation, templates */
'use strict';

foo.tooltip = function (tooltipId) {
  var $el = $('#' + tooltipId),
    fDropdownBorderWidth = 1, // $f-dropdown-border-width
    fDropdownTriangleSize = 6, // $f-dropdown-triangle-size
    fDropdownTriangleSideOffset = 10; // $f-dropdown-triangle-side-offset

  function populate(values) {
    $el.html(templates.tooltip.render(values));
  }

  $el.on('opened.fndtn.dropdown', function (e, $dropdown, $trigger) {
    if (!$trigger) return;

    var d3Trigger = d3.select($trigger.get(0)),
      triggerBBox = d3Trigger.node().getBBox(),
      triangleCenter = fDropdownBorderWidth + fDropdownTriangleSideOffset + fDropdownTriangleSize,
      barCenter = triggerBBox.width / 2;

    $el
      .toggleClass('right', d3Trigger.classed('right'))
      .css({
        'margin-top': triggerBBox.height + fDropdownTriangleSize,
        'margin-left': d3Trigger.classed('right') ?
          -$el.outerWidth() + triangleCenter + barCenter :
          -(triangleCenter) + barCenter
      });
  });

  $(window).on('resize', function () {
    Foundation.libs.dropdown.close($el);
  });

  return {
    $el: $el,
    populate: populate
  };
};
