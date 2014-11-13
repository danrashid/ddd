var express = require('express');
var router = express.Router();
var colors = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf'
];

function yTotal(layer) {
  return layer.values.reduce(function (a, b) {
    return a + b[1];
  }, 0);
}

function preprocess(data) {
  var ret = {};

  data.sort(function (a, b) {
    return yTotal(b) - yTotal(a);
  });

  ret.layers = data.map(function (layer) {
    return {
      id: layer.id,
      color: layer.color
    };
  });

  ret.values = data[0].values.map(function (value, i) {
    return {
      x: value[0],
      y: data.map(function (layer) {
        return layer.values[i][1];
      })
    };
  });

  return ret;
}

/* GET stats. */
router.get('/', function(req, res) {
  var layers = +req.query.layers || 1,
    count = +req.query.count || 60,
    max = +req.query.max || 100,
    now = Math.floor(new Date() / 1000) * 1000,
    data = [],
    layer,
    i;

  while (layers > 0) {
    layer = {
      id: 'g' + Math.round(Math.random() * 1000000),
      color: colors[layers - 1],
      values: []
    };
    for (i = count - 1; i >= 0; i -= 1) {
      layer.values.push([
        now - i * 1000,
        Math.round(Math.random() * max) * layers
      ]);
    }
    data.push(layer);
    layers -= 1;
  }
  res.send(preprocess(data));
});

module.exports = router;
