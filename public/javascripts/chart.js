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

  function appendBackground(svg) {
    svg.append('g')
      .classed('background', true)
      .attr('transform', 'translate(0,' + opts.verticalMargin + ')')
      .selectAll('rect')
        .data(function (d) {
          return d[0].values;
        })
        .enter().append('rect')
          .attr('height', height);
  }

  function appendHotspots(svg) {
    svg.append('g')
      .classed('hotspots', true)
      .attr('transform', 'translate(0,' + opts.verticalMargin + ')')
      .selectAll('rect')
        .data(function (d) {
          return d[0].values.map(function (v, i) {
            return {
              start: v[0],
              layers: d.map(function (layer) {
                return {
                  id: layer.id,
                  color: layer.color,
                  value: layer.values[i][1]
                };
              })
            };
          });
        })
        .enter().append('rect')
          .attr({
            'height': height,
            'data-dropdown': opts.tooltipId,
            'aria-controls': opts.tooltipId,
            'aria-expanded': 'false'
          });

    Foundation.libs.dropdown.init($(opts.tooltipId));
  }

  function appendBars(g) {
    g.selectAll('rect')
      .data(function (d) {
        return d.values;
      })
      .enter().append('rect')
        .each(function (d, i, a) {
          var hidden = d3.select(g[0][a]).classed('hidden'),
            barHeight = hidden ? 0 : height - yScale(d[1]),
            lastY = a > 0 ? g[0][a - 1].children[i].getAttribute('y') : height;

          d3.select(this).attr({
            y: hidden ? lastY : lastY - barHeight,
            height: barHeight
          });
        });
  }

  function sizeRects(svg) {
    svg.selectAll('g')
      .selectAll('rect')
        .attr({
          x: function (d, i) {
            return xScale(i);
          },
          width: xScale.rangeBand()
        });
  }

  function appendLayers(svg) {
    svg.selectAll('g.layer')
      .data(function (d) {
        return d;
      })
      .enter().append('g')
        .classed({
          layer: 'true',
          hidden: function (d, i) {
            return i === 1;
          }
        })
        .attr({
          fill: function (d) {
            return d.color;
          },
          guid: function (d) {
            return d.id;
          },
          transform: 'translate(0,' + opts.verticalMargin + ')'
        })
        .call(appendBars);
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
    times = svg.datum()[0].values.map(function (v) {
      return v[0];
    });

    interval = times[1] - times[0];

    height = $(svg.node()).height() - opts.verticalMargin * 2;

    console.log(height);

    xScale = d3.scale.ordinal()
      .domain(d3.range(times.length));

    yMax = d3.max(times.map(function (time, i) {
      return d3.sum(svg.datum().map(function (d) {
        return d.values[i][1];
      }));
    }));

    yScale = d3.scale.linear()
      .domain([0, yMax])
      .rangeRound([height, 0]);

    svg
      .attr('interval', interval)
      .call(setWidths)
      .call(appendBackground)
      .call(appendLayers)
      .call(appendAxis);

    if (opts.tooltipId) {
      svg.call(appendHotspots);
    }

    svg.call(sizeRects);

    $(window).on('resize', function () {
      svg
        .call(setWidths)
        .call(sizeRects)
        .call(sizeAxis);
    });
  })();
};
