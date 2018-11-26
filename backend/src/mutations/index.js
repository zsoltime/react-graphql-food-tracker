'use strict';

const addFood = require('./food/addFood');
const requestReset = require('./user/requestReset');
const resetPassword = require('./user/resetPassword');
const signIn = require('./user/signIn');
const signOut = require('./user/signOut');
const signUp = require('./user/signUp');
const updateEmail = require('./user/updateEmail');
const upsertProfile = require('./user/upsertProfile');
const validateEmail = require('./user/validateEmail');

module.exports = {
  addFood,
  requestReset,
  resetPassword,
  signIn,
  signOut,
  signUp,
  updateEmail,
  upsertProfile,
  validateEmail,
};
