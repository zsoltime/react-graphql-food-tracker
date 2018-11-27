'use strict';

const myFoods = require('./myFoods');

describe('myFoods query', () => {
  it('returns mathcing foods if filter is provided', async () => {
    const args = { filter: 'peanut' };
    const mockedContext = {
      db: {
        query: {
          foods: jest
            .fn()
            .mockImplementation(() => Promise.resolve([{ name: 'Salted peanuts' }])),
        },
      },
      request: { userId: 'currentUserId' },
    };

    const foods = await myFoods(null, args, mockedContext);

    expect(mockedContext.db.query.foods).toHaveBeenCalled();
    expect(
      mockedContext.db.query.foods.mock.calls[0]
    ).toMatchSnapshot();
    expect(foods).toMatchSnapshot();
  });

  it('throws error if user is not signed in', () => {
    const mockedContext = {
      request: {},
    };

    expect(
      myFoods(null, null, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('returns all foods added by current user', async () => {
    const args = {};
    const mockedContext = {
      db: {
        query: {
          foods: jest
            .fn()
            .mockImplementation(() => Promise.resolve([
              { name: 'FakeFood I' },
              { name: 'FakeFood II' },
            ])),
        },
      },
      request: { userId: 'currentUserId' },
    };

    const foods = await myFoods(null, args, mockedContext);

    expect(mockedContext.db.query.foods).toHaveBeenCalled();
    expect(
      mockedContext.db.query.foods.mock.calls[0]
    ).toMatchSnapshot();
    expect(foods).toMatchSnapshot();
  });
});
