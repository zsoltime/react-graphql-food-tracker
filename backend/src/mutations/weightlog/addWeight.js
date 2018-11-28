'use strict';

module.exports = async (_, args, ctx) => {
  if (!ctx.request.userId) {
    throw new Error('You must be signed in to add your weight');
  }

  const fields = { ...args };

  if (!fields.date) {
    fields.date = new Date();
  }

  return ctx.db.mutation.createWeightLog({
    data: {
      ...fields,
      user: { connect: { id: ctx.request.userId } },
    },
  });
};
