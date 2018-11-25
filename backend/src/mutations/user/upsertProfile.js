'use strict';

module.exports = async (_, args, ctx, info) => {
  if (!ctx.request.userId) {
    throw new Error('You must be signed in to update your profile');
  }

  // TODO: use db.mutation.upsertProfile()
  const [currentProfile] = await ctx.db.query.profiles({
    user: { id: ctx.request.userId },
  });

  if (currentProfile) {
    return ctx.db.mutation.updateProfile(
      {
        where: { id: currentProfile.id },
        data: { ...args },
      },
      info
    );
  }

  return ctx.db.mutation.createProfile(
    {
      data: {
        ...args,
        user: { connect: { id: ctx.request.userId } },
      },
    },
    info
  );
};
