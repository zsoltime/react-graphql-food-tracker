'use strict';

const listUsers = require('./users/listUsers');
const me = require('./users/me');
const myFoods = require('./food/myFoods');
const user = require('./user');

module.exports = {
  listUsers,
  me,
  myFoods,
  user,
};
