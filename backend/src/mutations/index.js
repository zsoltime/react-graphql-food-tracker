'use strict';

const addFood = require('./food/addFood');
const addFoodToDiary = require('./diary/addFoodToDiary');
const addWeight = require('./weightlog/addWeight');
const deleteWeight = require('./weightlog/deleteWeight');
const requestReset = require('./user/requestReset');
const resetPassword = require('./user/resetPassword');
const signIn = require('./user/signIn');
const signOut = require('./user/signOut');
const signUp = require('./user/signUp');
const updateFood = require('./food/updateFood');
const updateWeight = require('./weightlog/updateWeight');
const updateEmail = require('./user/updateEmail');
const upsertProfile = require('./user/upsertProfile');
const validateEmail = require('./user/validateEmail');
const verifyFood = require('./food/verifyFood');

module.exports = {
  addFood,
  addFoodToDiary,
  addWeight,
  deleteWeight,
  requestReset,
  resetPassword,
  signIn,
  signOut,
  signUp,
  updateEmail,
  updateFood,
  updateWeight,
  upsertProfile,
  validateEmail,
  verifyFood,
};
