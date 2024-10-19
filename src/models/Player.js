export default class Player {
  name;
  health;
  food;
  water;
  status;
  location;
  coins;

  constructor(options) {
    if (options.status === undefined) {
      this.name = options.name;
      this.location = options.location;
      this.health = 100;
      this.food = 100;
      this.water = 100;
      this.status = statuses.alive;
      this.coins = 0;

      return;
    }

    this.name = options.name;
    this.location = options.location;
    this.health = options.health;
    this.food = options.food;
    this.water = options.water;
    this.status = options.status;
    this.coins = options.coins;

    return;
  };
}

Player.prototype.getCoins = function () { return this.coins; };
Player.prototype.adjustCoins = function (change) {
  return this.coins += change;
};

Player.prototype.getName = function () { return this.name; };

Player.prototype.getHealth = function () { return this.health; };
Player.prototype.adjustHealth = function (change) {
  const newVal = this.health + change;

  if (newVal < 0) {
    this.status = statuses.dead;
    this.health = 0;
    return;
  } else if (newVal > 100) {
    this.health = 100;
    return;
  }

  return this.health += change;
};

Player.prototype.getFood = function () { return this.food.toFixed(2); };
Player.prototype.adjustFood = function (change) {
  const newVal = this.food + change;

  if (newVal < 0) {
    this.adjustHealth(-2);
    this.food = 0;
    return;
  } else if (newVal > 100) {
    this.food = 100;
    return;
  }

  return this.food += change;
};

Player.prototype.getWater = function () { return this.water.toFixed(2); };
Player.prototype.adjustWater = function (change) {
  const newVal = this.water + change;

  if (newVal < 0) {
    this.adjustHealth(-2);
    this.water = 0;
    return;
  } else if (newVal > 100) {
    this.water = 100;
    return;
  }

  return this.water += change;
};

Player.prototype.getLocation = function () { return this.location; };
Player.prototype.setLocation = function (location) { this.location = location; };

Player.prototype.isValid = function () {
  return (
    this.health > 0 &&
    this.status != statuses.dead
  )
};

const statuses = {
  dead: 0,
  alive: 1,
  injured: 2
}