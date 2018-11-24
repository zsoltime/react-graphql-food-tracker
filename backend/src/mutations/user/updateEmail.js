'use strict';

const isEmail = require('validator/lib/isEmail');

module.exports = async (_, args, ctx) => {
  if (!ctx.request.userId) {
    throw new Error(
      'You must be signed in to update your email address'
    );
  }

  const email = args.email.toLowerCase();

  if (!isEmail(email)) {
    throw new Error('Email is not valid');
  }

  // check if email is already in use
  const isEmailInUse = await ctx.db.query.user({
    where: { email },
  });
  if (isEmailInUse) {
    throw new Error('Another user is already using this email');
  }

  // set user a pending email
  const user = await ctx.db.mutation.updateUser({
    data: { pendingEmail: email },
    where: { id: ctx.request.userId },
  });

  // TODO: Send validation email

  return user;
};
