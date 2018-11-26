'use strict';

/* prettier-ignore */
module.exports = (_, args, ctx, info) => (
  ctx.db.query.user(
    { where: { id: args.id } },
    info
  )
);
