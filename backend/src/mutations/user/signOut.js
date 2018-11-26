'use strict';

module.exports = (_, args, ctx) => {
  ctx.response.clearCookie('token');
  return { message: 'Successfully logged out' };
};
