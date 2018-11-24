'use strict';

const isEmail = require('validator/lib/isEmail');
const nanoid = require('nanoid');

module.exports = async (_, args, ctx) => {
  if (!ctx.request.userId) {
    throw new Error(
      'You must be signed in to update your email address'
    );
  }

  const pendingEmail = args.email.toLowerCase();

  if (!isEmail(pendingEmail)) {
    throw new Error('Email is not valid');
  }

  // check if email is already in use
  const isEmailInUse = await ctx.db.query.user({
    where: { email: pendingEmail },
  });
  if (isEmailInUse) {
    throw new Error('Another user is already using this email');
  }

  const token = nanoid();
  const tokenExpiry = Date.now() + 60 * 60 * 1000; // 1hour

  // set user a pending email
  const res = await ctx.db.mutation.updateUser({
    data: { pendingEmail, token, tokenExpiry },
    where: { id: ctx.request.userId },
  });

  // TODO: Send validation email

  return { message: 'Email with token sent' };
};
