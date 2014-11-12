var express = require('express');
var router = express.Router();

/* GET stats. */
router.get('/', function(req, res) {
  var groups = +req.query.groups || 1,
    count = +req.query.count || 60,
    max = +req.query.max || 100,
    now = Math.floor(new Date() / 1000) * 1000,
    data = [],
    group,
    i;

  while (groups > 0) {
    group = {
      id: 'g' + Math.round(Math.random() * 1000),
      values: []
    };
    for (i = 0; i < count; i += 1) {
      group.values.push([
        now - count * 1000,
        Math.round(Math.random() * max) * groups
      ]);
    }
    data.push(group);
    groups -= 1;
  }
  res.send(data);
});

module.exports = router;
