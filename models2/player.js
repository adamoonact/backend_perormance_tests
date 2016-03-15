"use strict";
var Village = require('./village');

// The minimum build level (xp) for the village
var MINIMUM_VILLAGE_BUILD_LEVEL_FOR_ATTACK = 4;
var MIN_COINS_FOR_STEAL = 16000;
var ROUND_STEAL         = 6000;


var Player = function Player(userId, buildState){
  this.userId = userId;
  this.village = new Village();
  this.coins = 0;
  this.shields = 0;
  this.setState(buildState);
};

module.exports = Player;

var methods = {
  setState: function setState(state) {
    this.village.setBuildState(state);
  },

  isAttackable: function isAttackable() {
    return this.village.getXp() >= MINIMUM_VILLAGE_BUILD_LEVEL_FOR_ATTACK;
  },

  attack: function attack(targetPlayer, structureName) {
    var RES = Player.ATTACK_RESULT;
    if (!targetPlayer.isAttackable()) return RES.NOTHING;
    var target = targetPlayer.village.getStructure(structureName);
    if (!target) return RES.NOTHING;

    targetPlayer.lastAttackedAt = new Date();
    var reward = ((this.village.config || {}).reward)
                  || {attack: 0, blockedAttack: 0};
    if (targetPlayer.shields > 0) {
      targetPlayer.shields--;
      this.coins += (reward.blockedAttack || 0);
      return RES.ATTACK_BLOCKED;
    }

    this.coins += (reward.attack || 0);
    target.attack();
    return (target.isDestroyed() ? RES.TARGET_DESTROYED : RES.TARGET_DAMAGED);
  },

  upgrade: function upgrade(targetStructureName) {
    var target = this.village.getStructure(targetStructureName);
    if (!target || target.isComplete()) return;
    var price = target.getBuildPriceForNextLevel();
    if(this.coins < price) return;
    this.coins -= price;
    target.build();
  },

  calculateXp: function calculageXp() {
    var xp = 0;
    for (var i = 0; i < this.village.code; i++) {
       xp += Village.totalXp(i);
    }
    return xp + this.village.getXp();
  },

  isBot: function isBot() {
    return false;
  }
}

Player.ATTACK_RESULT = {
  NOTHING: 0,
  TARGET_DESTROYED: 1,
  TARGET_DAMAGED: 2,
  ATTACK_BLOCKED: 3
}

//extend
Object.getOwnPropertyNames(methods).forEach(function(methodName) {
  module.exports.prototype[methodName] = methods[methodName];
})
