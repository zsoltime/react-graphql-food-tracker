'use strict';

module.exports = async (_, args, ctx) => {
  const [user] = await ctx.db.query.users({
    where: {
      token: args.token,
      tokenExpiry_gte: Date.now(),
    },
  });

  if (!user) {
    throw new Error('Token is either invalid or expired');
  }

  const updatedUser = await ctx.db.mutation.updateUser({
    where: { email: user.email },
    data: {
      email: user.pendingEmail,
      pendingEmail: null,
      token: null,
      tokenExpiry: null,
    },
  });

  // Do we need to sign in again?
  return updatedUser;
};
