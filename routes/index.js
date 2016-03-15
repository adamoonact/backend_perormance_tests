var express = require('express');
var router = express.Router();
var KOC = require('../models/kingOfCoins');
var Serializer  = require('../models2/jsonSerializer')
var balance = require("../data/player_data").balance;


/* GET home page. */
router.get('/no', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  var str = JSON.stringify(balance);
  var obj = JSON.parse(str);

  res.send(JSON.stringify(balance.c));
});

router.get('/yes', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var str = JSON.stringify(balance);
  var obj = JSON.parse(str);

  var serializer = KOC.JsonSerializer;
  var player = serializer.parsePlayer(balance);
  // var serilaized = serializer.serializePlayer(player);
  res.send(JSON.stringify(player.rawState.c));
});


module.exports = router;
