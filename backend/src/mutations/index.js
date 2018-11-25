'use strict';

const signIn = require('./user/signIn');
const signOut = require('./user/signOut');
const signUp = require('./user/signUp');
const updateEmail = require('./user/updateEmail');
const upsertProfile = require('./user/upsertProfile');
const validateEmail = require('./user/validateEmail');

module.exports = {
  signIn,
  signOut,
  signUp,
  updateEmail,
  upsertProfile,
  validateEmail,
};
