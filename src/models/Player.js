export default class Player {
  name;
  health;
  food;
  water;
  status;
  location;
  coins;

  constructor(options) {
    this.name = options.name;
    this.location = options.location || location;
    this.health = (options.health && options.health > 0) ? options.health : 100;
    this.food = options.food || 100;
    this.water = options.water || 100;
    this.status = options.status || statuses.alive;
    this.coins = options.coins || 0;
  };
}

Player.prototype.getCoins = function () { return this.coins; };
Player.prototype.adjustCoins = function (change) { return this.coins += change; };
Player.prototype.getName = function () { return this.name; };
Player.prototype.getHealth = function () { return this.health; };
Player.prototype.adjustHealth = function (change) { this.health += change; };
Player.prototype.getFood = function () { return this.food; };
Player.prototype.adjustFood = function (change) { this.food += change; };
Player.prototype.getWater = function () { return this.water; };
Player.prototype.adjustWater = function (change) { this.water += change; };
Player.prototype.getLocation = function () { return this.location; };
Player.prototype.setLocation = function (location) { this.location = location; };
Player.prototype.isValid = function () {
  return (
    this.health &&
    this.status != this.statuses.dead
  )
};

const statuses = {
  dead: 0,
  alive: 1,
  injured: 2
}