'use strict';

const signIn = require('./user/signIn');
const signOut = require('./user/signOut');
const signUp = require('./user/signUp');
const updateEmail = require('./user/updateEmail');

module.exports = {
  signIn,
  signOut,
  signUp,
  updateEmail,
};
