'use strict';

const jwt = {};

// eslint-disable-next-line max-len
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0SWQiLCJpYXQiOjE1NDMyNDE2MDZ9.pvuxlFHMguOedl_DDC8bYZqTW7Bjku-xTiKDEryuiws';

jwt.setMockToken = (newMockToken) => {
  token = newMockToken;
};

jwt.sign = () => token;

module.exports = jwt;
