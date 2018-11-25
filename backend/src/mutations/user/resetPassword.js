'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (_, args, ctx) => {
  const [user] = await ctx.db.query.users({
    where: {
      token: args.token,
      tokenExpiry_gte: Date.now() - 60 * 60 * 1000,
    },
  });

  if (!user) {
    throw new Error('Token is either invalid or expired');
  }

  if (args.password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  const password = await bcrypt.hash(args.password, 12);
  const updatedUser = await ctx.db.mutation.updateUser({
    where: { email: user.email },
    data: { password, token: null, tokenExpiry: null },
  });
  const token = jwt.sign(
    { userId: updatedUser.id },
    process.env.APP_SECRET
  );

  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 90,
    secure: process.env.NODE_ENV === 'production',
  });

  return updatedUser;
};
