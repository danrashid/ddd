var express = require('express');
var router = express.Router();

/* GET stats. */
router.get('/', function(req, res) {
  var count = +req.query.count || 60,
    max = +req.query.max || 100,
    now = Math.floor(new Date() / 1000) * 1000,
    data = [];

  while (count >= 0) {
    data.push([
      now - count * 1000,
      Math.round(Math.random() * max)
    ]);
    count -= 1;
  }
  res.send(data);
});

module.exports = router;