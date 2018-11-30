'use strict';

const addFoodToDiary = require('./addFoodToDiary');

describe('addFoodToDiary mutation', () => {
  it('throws error if food ID is not valid', () => {
    const args = {
      id: 'invalidFoodId',
      servingSize: 77,
      servingUnit: 'G',
    };
    const mockedContext = {
      db: {
        query: {
          food: jest
            .fn()
            .mockImplementation(() => Promise.resolve(null)),
        },
      },
      request: { userId: 'validUserId' },
    };

    expect(
      addFoodToDiary(null, args, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
    expect(mockedContext.db.query.food).toHaveBeenCalled();
    expect(
      mockedContext.db.query.food.mock.calls[0]
    ).toMatchSnapshot();
  });

  it('throws error if user not signed in', () => {
    const mockedContext = {
      request: {},
    };

    expect(
      addFoodToDiary(null, null, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
