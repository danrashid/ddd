/* global $, d3, foo, Foundation, templates */
'use strict';

foo.tooltip = function (tooltipId) {
  var $el = $('#' + tooltipId),
    fDropdownBorderWidth = 1, // $f-dropdown-border-width
    fDropdownTriangleSize = 6, // $f-dropdown-triangle-size
    fDropdownTriangleSideOffset = 10; // $f-dropdown-triangle-side-offset

  function populate(trigger, callback) {
    var datum = d3.select(trigger).datum(),
      interval = +$(trigger).closest('svg').attr('interval'),
      defaults = {
        start: (new Date(datum.start)).toLocaleString(),
        end: (new Date(datum.start + interval)).toLocaleString()
      },
      overrides = callback ? callback(datum) : {},
      values = $.extend(defaults, overrides);

    $el.html(templates.tooltip.render(values));
  }

  $el.on('opened.fndtn.dropdown', function (e, $dropdown, $trigger) {
    if (!$trigger) return;

    var d3Trigger = d3.select($trigger.get(0)),
      triggerBBox = d3Trigger.node().getBBox(),
      triangleCenter = fDropdownBorderWidth + fDropdownTriangleSideOffset + fDropdownTriangleSize,
      barCenter = triggerBBox.width / 2,
      goLeft = $trigger.offset().left > window.innerWidth / 2;

    $el
      .toggleClass('right', goLeft)
      .css({
        'margin-top': triggerBBox.height + fDropdownTriangleSize,
        'margin-left': goLeft ?
          -$el.outerWidth() + triangleCenter + barCenter :
          -(triangleCenter) + barCenter
      });
  });

  $(window).on('resize', function () {
    Foundation.libs.dropdown.close($el);
  });

  return {
    populate: populate
  };
};
