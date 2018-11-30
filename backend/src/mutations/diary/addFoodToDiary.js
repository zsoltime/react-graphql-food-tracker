'use strict';

const round = require('lodash.round');

const macros = [
  'calories',
  'carb',
  'fat',
  'fatMonounsaturated',
  'fatPolyunsaturated',
  'fatSaturated',
  'fatTrans',
  'fibre',
  'polyol',
  'protein',
  'sugar',
];

module.exports = async (_, args, ctx, info) => {
  if (!ctx.request.userId) {
    throw new Error('You must be signed in to log food');
  }

  const food = await ctx.db.query.food({ where: { id: args.id } });

  if (!food) {
    throw new Error("Food doesn't exist");
  }

  // TODO:
  if (food.servingUnit !== args.servingUnit) {
    throw new Error(`Serving unit must be${food.servingUnit}`);
  }

  const foodItem = Object.entries(food).reduce(
    (acc, [name, value]) => {
      if (name === 'servingSize' || name === 'servingUnit') {
        acc[name] = args[name];
      }
      if (macros.includes(name)) {
        acc[name] = round(
          (value * args.servingSize) / food.servingSize,
          2
        );
      }
      return acc;
    },
    {}
  );

  // TODO: handle if servingunits are different (g, mg, etx)

  foodItem.user = { connect: { id: ctx.request.userId } };
  foodItem.food = { connect: { id: args.id } };

  return ctx.db.mutation.createFoodItem({ data: foodItem }, info);
};
