/* global $, d3, Foundation */
'use strict';

var foo = {};

foo.chart = function (svg, opts) {
  opts = $.extend({
    barSpacing: 0.125,
    verticalMargin: 16,
    rightMargin: 48
  }, opts);

  var times,
    interval,
    width,
    height,
    xScale,
    yMax,
    yScale;

  function appendHotspots(g) {
    g.append('rect')
      .attr({
        class: 'hotspot',
        debug: function (d) {
          return d[0] + ',' + d[1];
        },
        height: height
      });
  }

  function appendBars(g) {
    g.append('rect')
      .attr({
        class: 'bar',
        y: function (d) {
          return yScale(d[1]);
        },
        height: function (d) {
          return height - yScale(d[1]);
        }
      });
  }

  function sizeRects(g) {
    g.selectAll('rect')
      .attr('width', xScale.rangeBand());
  }

  function appendGroups(svg) {
    var now = +(new Date());

    svg.selectAll('.group')
      .data(function (d) {
        return d.values;
      })
      .enter().append('g')
        .attr({
          'data-dropdown': opts.tooltipId,
          'aria-controls': opts.tooltipId,
          'aria-expanded': 'false'
        })
        .classed({
          group: true,
          pending: function (d) {
            return now < d[0] + interval;
          }
        })
        .call(appendHotspots)
        .call(appendBars);

    if (opts.tooltipId) {
      Foundation.libs.dropdown.init($(opts.tooltipId));
    }

    sizeGroups(svg);
  }

  function sizeGroups(svg) {
    svg.selectAll('.group')
      .attr('transform', function (d, i) {
        return 'translate(' + xScale(i) + ',' + opts.verticalMargin + ')';
      })
      .call(sizeRects);
  }

  function appendAxis(svg) {
    svg.append('g')
      .attr('class', 'axis');

    sizeAxis(svg);
  }

  function sizeAxis(svg) {
    var x = xScale(times.length - 1) + xScale.rangeBand(),
      axisFn = d3.svg.axis()
        .scale(yScale)
        .orient('right')
        .tickValues([0, yMax]);

    svg.select('.axis')
      .attr('transform', 'translate(' + x + ',' + opts.verticalMargin + ')')
      .call(axisFn);
  }

  function setWidths(svg) {
    width = $(svg.node()).width() - opts.rightMargin;
    xScale.rangeRoundBands([0, width], opts.barSpacing);
  }

  (function () {
    times = svg.datum().values.map(function (value) {
      return value[0];
    });

    interval = times[1] - times[0];

    height = $(svg.node()).height() - opts.verticalMargin * 2;

    xScale = d3.scale.ordinal()
      .domain(d3.range(times.length));

    yMax = d3.max(svg.datum().values.map(function (value) {
      return d3.sum(value[1]);
    }));

    yScale = d3.scale.linear()
      .domain([0, yMax])
      .rangeRound([height, 0]);

    svg
      .attr('interval', interval)
      .call(setWidths)
      .call(appendGroups)
      .call(appendAxis);

    $(window).on('resize', function () {
      svg
        .call(setWidths)
        .call(sizeGroups)
        .call(sizeAxis);
    });
  })();
};
