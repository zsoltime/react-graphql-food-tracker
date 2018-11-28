'use strict';

module.exports = async (_, args, ctx) => {
  if (!ctx.request.userId) {
    throw new Error('You must be signed in to update your weight');
  }

  const [user] = await ctx.db.query.users({
    where: {
      AND: [
        { id: ctx.request.userId, weightLogs_some: { id: args.id } },
      ],
    },
  });

  if (!user) {
    throw new Error("You don't have permission to update this entry");
  }

  const updates = { ...args };
  delete updates.id;

  return ctx.db.mutation.updateWeightLog({
    data: updates,
    where: { id: args.id },
  });
};
