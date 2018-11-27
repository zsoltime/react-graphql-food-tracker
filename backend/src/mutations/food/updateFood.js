'use strict';

module.exports = async (_, args, ctx) => {
  if (!ctx.request.userId) {
    throw new Error('You must be signed in to update foods');
  }

  // TODO: Add/check ADMIN permission?
  const [user] = await ctx.db.query.users({
    where: {
      AND: [{ id: ctx.request.userId, foods_some: { id: args.id } }],
    },
  });

  if (!user) {
    throw new Error("You don't have permission to update this food");
  }

  const updates = { ...args };
  delete updates.id;

  // TODO: check if args are valid

  return ctx.db.mutation.updateFood({
    data: updates,
    where: { id: args.id },
  });
};
