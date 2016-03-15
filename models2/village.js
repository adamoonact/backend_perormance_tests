'use strict';
var shuffle = require("shuffle-array")
var Structure = require("./structure");
var villageConfigs = require('../config/villages');

var VILLAGE_STRUCTURE_COUNT = 5;

var Village = function Village(code, config) {
  code = code || 0;
  this.code = code;
  config = config || villageConfigs[code];
  this.config = config;
  if(config.name) {
    this.name = config.name;
  }

  // init structures
  var structures = [];
  var maxBuildLevel = this.config.maxStructureBuildLevel;
  Structure.TYPES.forEach(function(structureType) {
    structures.push(new Structure(structureType,
      {maxBuildLevel: maxBuildLevel,
       buildPrices: config.buildPrices[structureType]
      }));
  });
  this.structures = structures;
}

Village.totalXp = function totalXp(villageCode) {
  var maxLevel = 0;
  try {
    maxLevel = villageConfigs[villageCode].maxStructureBuildLevel
  } catch(e) {}
  return maxLevel * VILLAGE_STRUCTURE_COUNT;
}

module.exports = Village;

var methods = {
  getStructure: function getStructure(structureType) {
    if(!structureType) {
      throw "No structure name specified";
    }
    var structures = this.structures;
    for (var i = 0; i < structures.length; i++) {
      if(structures[i].structureType == structureType) return structures[i];
    }
    return null;
  },

  setBuildState: function setBuildState(state) {
    if(!state) return;
    var that = this;
    Structure.TYPES.forEach(function(name) {
      if(state[name]) {
        that.getStructure(name).setBuildState(state[name]);
      }
    });
  },

  getXp: function getXp() {
    var xp = 0;
    for (var i = 0; i < this.structures.length; i++) {
      xp += this.structures[i].getXp();
    }
    return xp;
  },

  isComplete: function isComplete() {
    for (var i = 0; i < this.structures.length; i++) {
      if(!this.structures[i].isComplete()) return false;
    }
    return true;
  },

  ///   Attack functions

  getAttackableStructures: function getAttackableStructures() {
    var result = [];
    this.structures.forEach(function(structure) {
      if(structure.isAttackable()) {
        result.push(structure);
      }
    })
    return result;
  },

  findAttackTarget: function findAttackTarget(attackPolicy) {
    attackPolicy = attackPolicy || Village.ATTACK_POLICY.RANDOM;
    var possibleTargets = this.getAttackableStructures();
    if(possibleTargets.length === 0) return null;
    switch (attackPolicy) {
      case Village.ATTACK_POLICY.RANDOM:
        return shuffle.pick(possibleTargets);

      default:
        var mostExpensive = possibleTargets[0];
        var mostExpensivePrice = mostExpensive.getDamagePriceIfAttacked();
        var cheapest = possibleTargets[0];
        var cheapestPrice = cheapest.getDamagePriceIfAttacked();
        possibleTargets.forEach(function(structure) {
          var damagePrice = structure.getDamagePriceIfAttacked();
          if(damagePrice > mostExpensivePrice) {
            mostExpensive = structure;
            mostExpensivePrice = damagePrice;
          }
          if(damagePrice < cheapestPrice) {
            cheapest = structure;
            cheapestPrice = damagePrice;
          }
        })
        return (attackPolicy === Village.ATTACK_POLICY.LEAST_DAMAGE)
          ? cheapest : mostExpensive;
    }
  },

  isDamaged: function isDamaged() {
    for (var i = 0; i < this.structures.length; i++) {
      if(this.structures[i].isDamaged) return true;
    }
    return false;
  }
}

module.exports.ATTACK_POLICY = {
  RANDOM: 1,
  LEAST_DAMAGE: 2,
  MOST_DAMAGE: 3
}

//extend
Object.getOwnPropertyNames(methods).forEach(function(methodName) {
  module.exports.prototype[methodName] = methods[methodName];
})
