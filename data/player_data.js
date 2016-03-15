module.exports = {
  "balance": {
    // name of the profile with config data
    "p": "CASE3-SURVIVAL-ACTIVE-MISSIONS",

    // Game application version
    "v": 1.03,

    // Attack target user id
    // DEPRECATED
    "lord": 0,

    // Facebook id
    "fbId": "11111",

    // Treasure (dig) spots and their value in 1/6 of the target user's coins
    "raid": [
        2, // 2/6 of target user's coins
        0, // no treasure
        2, // 2/6 of target user's coins
        1  // 1/6 of target user's coins
      ],

    // Last time that steal was performed on you
    "lastSteal": 1457002995159,

    // last active timestamp
    "lastSeen": 1457005466166,

    // when were you attacked last time
    "lastAtck": 1457005466166,

    // State data sent to client ??? is saved to database - for sequence?
    "c": {

      // Player name
      "name": "Eranndez",

      // Player imageId
      "image": "11111",

      // How many spins left
      "spins": 8,

      // How many shields left
      "shields": 0,

      // global spin counter (from the beginning of the game)
      // used for verifying the client got the last spin results
      // the client sends the last req it got from the server with each spin
      // request. and the server verifies that it is synchronized.
      // if not, the server sends again the last spin results
      "seq": 1,

      //
      "village": 0,

      // Number of coins the player has
      "coins": 470000,

      // Village assets, and their progress level(0-5)
      "Ship": 2,
      "Farm": 5,
      "Crop": 12,
      "Statue": 14,
      "House": 0,

      // How long until the next spin-fill
      "fillTime": 1457002994729,

      // Server current time used for calculating the next spin-refill
      // NOT SAVED IN DB
      'now': 1457005466175,

      // Attack target player
      "raid": {
        "name": "Lork",
        "image": 3,
        "coins": 348000,
        "id": "222222"
      },

      // village events news feed
      "messages": [
        {
          // message type
          // var GAME_MESSAGES = {
          //     ATTACK_DESTROY: 1,
          //     ATTACK_DAMAGED: 2,
          //     ATTACK_BLOCKED: 3,
          //     STEAL:          4,
          //     FRIEND_JOINED:  5
          // };
          //
          // var SYSTEM_MESSAGES = {
          //     FB_REWARD: 101
          // };
          "a": 4,
          // extra - reference to the attacked item
          "e": 780000,
          // event time
          "t": 1457002995159,

          // target user id
          "u": "cilc5ltxa0005gaqs6dwnkpyd",
          //target user name
          "n": "User2",
          //target user image
          "i": "22222",
          // village progress - experience points
          "xp": 0
        }
      ],

      /// These values are not saved in database
      /// Spin-Steal response

      // Win in coins of the spin result
      'pay': 0,

      // slot machine spin result
      // 4=PIG/STEAL, 2 = coins
      'r1': 4,
      'r2': 4,
      'r3': 4,
      // Reward code of the spin -  what did the user win?
      // 4 = Steal, 1 = Coins
      'reward': 4

    },

    // village news feed messages that were read user can view in log
    "readMessages": [],

    // The current position in streak list
    "pos": 0,

    // A list of prepared spin results. ususaly holds 50 results
    "streak": [
      {
        "r1": 1,
        "r2": 4,
        "r3": 4,
        "coins": 1500,
        "code": 1
      },
      {
        "r1": 1,
        "r2": 1,
        "r3": 4,
        "coins": 2500,
        "code": 1
      }
    ]
  }
}
