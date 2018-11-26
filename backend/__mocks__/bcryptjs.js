'use strict';

const bcrypt = {};

let result = true;

bcrypt.setMockResult = (newMockResult) => {
  result = newMockResult;
};

bcrypt.compare = () => Promise.resolve(result);
bcrypt.hash = () => Promise.resolve(
  '$2y$12$ojbf3vJgxk.0q617vyZF8uge/KgjM9biFF9l.OFjqkbnouZPNkEdy'
);

module.exports = bcrypt;
