'use strict';

module.exports = async (_, args, ctx) => {
  const user = await ctx.db.query.user(
    {
      where: { id: ctx.request.userId },
    },
    '{ permissions }'
  );

  if (!user.permissions.includes('ADMIN')) {
    throw new Error("You don't have permission to verify foods");
  }

  return ctx.db.mutation.updateFood({
    data: { verifiedAt: new Date() },
    where: { id: args.id },
  });
};
