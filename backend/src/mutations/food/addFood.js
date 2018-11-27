'use strict';

module.exports = async (_, args, ctx, info) => {
  if (!ctx.request.userId) {
    throw new Error('You must be signed in to add foods');
  }
  // TODO: check if args are valid

  return ctx.db.mutation.createFood(
    {
      data: {
        ...args,
        user: { connect: { id: ctx.request.userId } },
      },
    },
    info
  );
};
