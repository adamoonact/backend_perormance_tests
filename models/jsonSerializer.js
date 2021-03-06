"use strict";


// for each damaged(attacked) target in the current village
// we add this number to it's progress level
// in order to mark it as damaged
var  DAMAGED_STRUCTURE_LEVEL_ADDITION = 10;

function setBuildState(structure, rawLevel) {
  structure.setBuildState(
    rawLevel % DAMAGED_STRUCTURE_LEVEL_ADDITION,
    (rawLevel > DAMAGED_STRUCTURE_LEVEL_ADDITION));
}

module.exports = {
  getBalance: function(data) {
    return (data['balance']) ? data.balance : data;
  },

  setBuildState: setBuildState,

  parsePlayer: function parsePlayer(balance, player) {
    var KingOfCoins = require('./kingOfCoins');
    balance = this.getBalance(balance);
    var player = player || new KingOfCoins.Player();
    player.id = balance.id;
    player.rawState = balance;
    player.profileId = balance.p;
    player.gameVersion = balance.v;

    player.facebookId = balance.fbId;

    player.lastStealAt = new Date(balance.lastSteal);
    player.lastSeenAt = new Date(balance.lastSeen);
    player.lastAttackedAt = new Date(balance.lastAtck);

    var clientState = balance.c;
    player.name = clientState.name;
    player.imageId = clientState.image;
    player.spins = clientState.spins;
    player.coins = clientState.coins;
    player.shields = clientState.shields;

    var village = new KingOfCoins.Village(clientState.village);
    KingOfCoins.Structure.TYPES.forEach(function(structureType) {
      var structure = village.getStructure(structureType);
      var rawLevel = clientState[structureType];
      setBuildState(structure, rawLevel);
    });
    player.village = village;

    return player;
  },

  serializePlayer: function serializePlayer(player) {
    var KingOfCoins = require('./kingOfCoins');
    var balance = {};
    balance.p = player.profileId;
    balance.v = player.gameVersion;
    balance.fbId = player.facebookId;

    balance.c = {};
    KingOfCoins.Structure.TYPES.forEach(function(structureType) {
      var structure = player.village.getStructure(structureType);
      balance.c[structureType]
        = structure.buildLevel + ((structure.isDamaged) ? 10 : 0);
    });

    balance.lastSteal = (player.lastStealAt && player.lastStealAt.getTime());
    balance.lastAtck = (player.lastAttackedAt && player.lastAttackedAt.getTime());
    balance.lastSeen = (player.lastSeenAt && player.lastSeenAt.getTime());

    return balance;


  }
}
