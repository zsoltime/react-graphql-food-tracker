'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// TODO: If we need to fetch permissions here, add info
module.exports = async (_, args, ctx) => {
  const email = args.email.toLowerCase();
  const user = await ctx.db.query.user({ where: { email } });

  if (!user) {
    throw Error('Email or password is incorrect');
  }

  const isValid = await bcrypt.compare(args.password, user.password);

  if (!isValid) {
    throw Error('Email or password is incorrect');
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 90,
    secure: process.env.NODE_ENV === 'production',
  });

  return user;
};
