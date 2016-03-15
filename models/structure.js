"use strict";

// config = {
//   maxBuildLevel: 4,
//   buildPrices: []
// }
var Structure = function Structure(structureType, config) {
  this.config = config || {};
  this.config.maxBuildLevel = this.config.maxBuildLevel || 4;
  this.setBuildState();

  this.structureType = structureType || 'House';
  // if (!(Structure.TYPES.indexOf(this.structureType) >= 0)) {
  //   throw new RangeError('Invalid structure type: ' + structureType);
  // }
}

module.exports = Structure;

module.exports.TYPES = [
  'Ship', 'Farm', 'Crop', 'Statue', 'House'
];

var methods = {
    build: function build() {
      if (this.isComplete()) return this;
      if (this.isDamaged) {
        this.isDamaged = false;
      } else {
        this.buildLevel++;
      }
      this.isDamaged = false;
      return this;
    },

    isNew: function() {
      return this.buildLevel === 0 && !this.isDamaged;
    },

    isAttackable: function isAttackable() {
      return this.buildLevel > 0;
    },

    attack: function attack() {
      if (!this.isAttackable()) return this;
      if (this.isDamaged) {
        this.buildLevel--;
      } else {
        this.isDamaged = true;
      }
      return this;
    },

    isComplete: function isComplete() {
      return this.buildLevel === this.config.maxBuildLevel && !this.isDamaged;
    },

    isDestroyed: function isDestroyed() {
      return (this.buildLevel === 0 && this.isDamaged);
    },

    getXp: function getXp() {
      return Math.max(0, (this.isDamaged)
        ? this.buildLevel - 1 : this.buildLevel);
    },

    ////////// prices /////////////

    getBuildPriceForNextLevel: function getPriceForNextLevel() {
      return (this.isDamaged && !this.isDestroyed()) ? this.getFixPrice() : this.getBuildLevelPrice();
    },

    getBuildLevelPrice: function getBuildLevelPrice(level) {
      level = level ||
        (Math.min(this.buildLevel + 1, this.config.maxBuildLevel));
      return (this.config.buildPrices[level - 1] || 0);
    },

    // simulateAttack can be used for calculating the potential price of an
    // attack
    getFixPrice: function getFixPrice(level) {
      level = Math.max((level || this.buildLevel), 0);
      return (level > 0) ? Math.floor(this.getBuildLevelPrice(level) / 2) : 0;
    },

    getDamagePriceIfAttacked: function getDamagePriceIfAttacked() {
      if (this.buildLevel < 1) return 0;
      return (!this.isDamaged) ? this.getFixPrice() : (this.getFixPrice(this.buildLevel) + this.getFixPrice(this.buildLevel - 1));
    },

    getPriceToComplete: function getPriceToComplete() {
      var totalPrice = 0;
      for (var i = this.buildLevel; i < this.config.maxBuildLevel; i++) {
        totalPrice += this.config.buildPrices[i];
      }
      return totalPrice + this.getFixPrice();
    },

    setBuildState: function(buildLevel, isDamaged) {
      if (buildLevel instanceof Array) {
        if (buildLevel.length > 1) isDamaged = buildLevel[1];
        buildLevel = buildLevel[0];
      }
      this.buildLevel = buildLevel || 0;
      this.isDamaged = isDamaged || false;
      return this;
    },

    verifyBuildState: function(expectedLevel, expectedIsDamaged) {
      if(expectedLevel instanceof Structure) {
        expectedIsDamaged = expectedLevel.isDamaged;
        expectedLevel = expectedLevel.buildLevel;
      }
      return(this.buildLevel === expectedLevel
        && this.isDamaged === expectedIsDamaged);
    }
  }
  //extend
Object.getOwnPropertyNames(methods).forEach(function(methodName) {
  module.exports.prototype[methodName] = methods[methodName];
})
