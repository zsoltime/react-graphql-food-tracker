'use strict';

const bcryptjs = {};

let result = true;

bcryptjs.setMockResult = (newMockResult) => {
  result = newMockResult;
};

bcryptjs.compare = () => Promise.resolve(result);

module.exports = bcryptjs;
