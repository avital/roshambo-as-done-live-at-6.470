Template.header.events({
  'click .new-game': function () {
    Games.insert({player1: Meteor.userId()});
  },
  'click .join-game': function () {
    Games.update(
      this._id,
      {$set: {player2: Meteor.userId()}});
  },
  'click .rock1': function () {
    Games.update(
      this._id,
      {$set: {player1Move: "rock"}});
  },
  'click .paper1': function () {
    Games.update(
      this._id,
      {$set: {player1Move: "paper"}});
  },
  'click .scissors1': function () {
    Games.update(
      this._id,
      {$set: {player1Move: "scissors"}});
  },
  'click .rock2': function () {
    Games.update(
      this._id,
      {$set: {player2Move: "rock"}});
  },
  'click .paper2': function () {
    Games.update(
      this._id,
      {$set: {player2Move: "paper"}});
  },
  'click .scissors2': function () {
    Games.update(
      this._id,
      {$set: {player2Move: "scissors"}});
  }
});

Template.games.helpers({
  allGames: function () {
    return Games.find();
  }
});

// winner["rock"]["paper"] is false
// winner["paper"]["rock"] is true
winners = {
  rock: {scissors: true},
  scissors: {paper: true},
  paper: {rock: true}
};

Template.player1Control.helpers({
  player1Name: function () {
    return Meteor.users.findOne(
      this.player1).profile.name;
  },

  canPlay1: function () {
    return this.player1 === Meteor.userId()
      && !this.player1Move;
  },

  player1Winner: function () {
    if (!this.player1Move || !this.player2Move)
      return false;

    return winners[this.player1Move][this.player2Move];
  }
});

Template.player2Control.helpers({
  twoPlayers: function () {
    return this.player1 && this.player2;
  },

  player2Name: function () {
    return Meteor.users.findOne(
      this.player2).profile.name;
  },

  canPlay2: function () {
    return this.player2 === Meteor.userId()
      && !this.player2Move;
  },

  canJoinGame: function () {
    return this.player1 !== Meteor.userId();
  },

  player2Winner: function () {
    if (!this.player1Move || !this.player2Move)
      return false;

    return winners[this.player2Move][this.player1Move];
  }
});
