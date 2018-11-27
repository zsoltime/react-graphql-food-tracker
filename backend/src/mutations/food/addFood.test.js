'use strict';

const addFood = require('./addFood');

describe('addFood mutation', () => {
  it('inserts food to the database and returns it', async () => {
    const args = {
      brand: 'Meridian',
      calories: 596,
      carb: 11.6,
      ean: '5060132283424',
      fat: 46,
      fatSaturated: 8.2,
      fibre: 8.5,
      name: 'Crunchy peanut butter',
      protein: 29.6,
      servingSize: 100,
      servingUnit: 'G',
      sugar: 5.9,
    };
    const mockedContext = {
      db: {
        mutation: {
          createFood: jest
            .fn()
            .mockImplementation(() => Promise.resolve({ ...args, user: 'validUserId' })),
        },
      },
      request: { userId: 'validUserId' },
    };

    const food = await addFood(
      null,
      args,
      mockedContext,
      'mockedInfoObject'
    );

    expect(mockedContext.db.mutation.createFood).toBeCalled();
    expect(
      mockedContext.db.mutation.createFood.mock.calls[0]
    ).toMatchSnapshot();
    expect(food).toMatchSnapshot();
  });

  it('throws error if user not signed in', () => {
    const mockedContext = {
      request: {},
    };

    expect(
      addFood(null, null, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
