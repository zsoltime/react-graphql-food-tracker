'use strict';

module.exports = async (_, args, ctx) => {
  if (!ctx.request.userId) {
    throw new Error('You must be signed in to delete this entry');
  }

  const [user] = await ctx.db.query.users({
    where: {
      AND: [
        {
          id: ctx.request.userId,
          weightLogs_some: { id: args.id },
        },
      ],
    },
  });

  if (!user) {
    throw new Error("You don't have permission to delete this entry");
  }

  return ctx.db.mutation.deleteWeightLog({
    where: {
      id: args.id,
    },
  });
};
