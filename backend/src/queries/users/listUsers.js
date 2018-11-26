'use strict';

module.exports = async (_, args, ctx, info) => {
  if (!ctx.request.userId) {
    throw new Error('You must be signed in to list users');
  }

  const user = await ctx.db.query.user(
    {
      where: { id: ctx.request.userId },
    },
    info
  );

  if (!user.permissions.includes('ADMIN')) {
    throw new Error("You don't have permission");
  }

  return ctx.db.query.users({}, info);
};
