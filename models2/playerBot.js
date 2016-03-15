"use strict";
var shuffle = require('shuffle-array');

var Player = require('./player');

var PlayerBot = function PlayerBot() {}
module.exports = PlayerBot;

// inherit from player
PlayerBot.prototype = Object.create(Player.prototype);

PlayerBot.getRandom = function getRandom() {
  var botPull = require("../config/bots").bots;
  var botData = shuffle.pick(botPull);
  var parser = require("./jsonSerializer");
  return parser.parsePlayer({balance: {id: botData.id, c: botData}}, new PlayerBot());
}
// bot with id= "11111111" is used in ftue

var methods = {
  isBot: function isBot() {
    return true;
  },
}

//extend
Object.getOwnPropertyNames(methods).forEach(function(methodName) {
  module.exports.prototype[methodName] = methods[methodName];
})
