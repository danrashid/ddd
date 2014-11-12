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

function remapCoordinates(data) {
  return data.map(function (layer) {
    layer.values = layer.values.map(function (value) {
      return {
        x: value[0],
        y: value[1]
      };
    });
    return layer;
  });
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
    for (i = 0; i < count; i += 1) {
      layer.values.push([
        now - count * 1000,
        Math.round(Math.random() * max) * layers
      ]);
    }
    data.push(layer);
    layers -= 1;
  }
  res.send(remapCoordinates(data));
});

module.exports = router;
