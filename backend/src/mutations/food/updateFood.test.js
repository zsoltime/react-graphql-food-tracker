'use strict';

const updateFood = require('./updateFood');

describe('udpateFood mutation', () => {
  it('updates the food item', async () => {
    const args = {
      id: 'validFoodId',
      calories: 596,
      carb: 11.6,
      fat: 46,
      protein: 29.6,
      sugar: 5.9,
    };
    const mockedContext = {
      db: {
        mutation: {
          updateFood: jest.fn().mockImplementation(() => Promise.resolve({
            ...args,
            brand: 'Meridian',
            name: 'Crunchy peanut butter',
            user: 'validUserId',
          })),
        },
        query: {
          users: jest
            .fn()
            .mockImplementation(() => Promise.resolve([{ id: 'validUserId' }])),
        },
      },
      request: { userId: 'validUserId' },
    };

    const food = await updateFood(null, args, mockedContext);

    expect(mockedContext.db.query.users).toBeCalled();
    expect(
      mockedContext.db.query.users.mock.calls[0]
    ).toMatchSnapshot();
    expect(mockedContext.db.mutation.updateFood).toBeCalled();
    expect(
      mockedContext.db.mutation.updateFood.mock.calls[0]
    ).toMatchSnapshot();
    expect(food).toMatchSnapshot();
  });

  it('throws error if user is not signed in', () => {
    const mockedContext = {
      request: {},
    };

    expect(
      updateFood(null, null, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
  it('throws error if user does not have permission', () => {
    const args = { id: 'validFoodId' };
    const mockedContext = {
      db: {
        query: {
          users: jest
            .fn()
            .mockImplementation(() => Promise.resolve([])),
        },
      },
      request: { userId: 'validUserId' },
    };

    expect(
      updateFood(null, args, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
