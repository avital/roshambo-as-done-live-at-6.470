Meteor.publish("allUsernames", function () {
  return Meteor.users.find(
    {}, {field: {"profile.name": true}});
});

Meteor.publish("allGames", function () {
  return Games.find(
    {},
    {fields: {player1: true, player2: true}});
});

Meteor.publish("games1", function () {
  return Games.find(
    {player1: this.userId},
    {fields: {player1Move: true}});
});

Meteor.publish("games2", function () {
  return Games.find(
    {player2: this.userId},
    {fields: {player2Move: true}});
});

Meteor.publish("finishedGamez", function () {
  return Games.find({
    player1Move: {$exists: true},
    player2Move: {$exists: true}
  });
});

