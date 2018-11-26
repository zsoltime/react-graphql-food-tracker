'use strict';

const { DEFAULT_LIMIT } = require('../../constants');

module.exports = async (_, args, ctx) => {
  if (!ctx.request.userId) {
    throw new Error('You must be signed in to list foods');
  }

  const where = args.filter
    ? {
      AND: [
        {
          OR: [
            { brand_contains: args.filter },
            { name_contains: args.filter },
          ],
        },
        { user: { id: ctx.request.userId } },
      ],
    }
    : { user: { id: ctx.request.userId } };

  return ctx.db.query.foods({
    first: args.first || DEFAULT_LIMIT,
    orderBy: 'createdAt_DESC',
    skip: args.skip,
    where,
  });
};
