'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isEmail = require('validator/lib/isEmail');

module.exports = async (_, args, ctx, info) => {
  const email = args.email.toLowerCase();

  if (!isEmail(email)) {
    throw new Error('Email is not valid');
  }

  const isRegistered = await ctx.db.query.user({ where: { email } });
  if (isRegistered) {
    throw new Error('Email is already in use');
  }

  if (args.password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  const password = await bcrypt.hash(args.password, 12);
  const user = await ctx.db.mutation.createUser(
    {
      data: {
        email,
        password,
        permissions: { set: ['USER'] },
      },
    },
    info
  );

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 90,
    secure: process.env.NODE_ENV === 'production',
  });

  return user;
};
