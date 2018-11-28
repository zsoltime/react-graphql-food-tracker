'use strict';

const updateWeight = require('./updateWeight');

describe('updateWeight mutation', () => {
  it('updates the weight log fields', async () => {
    const args = {
      id: 'validFoodId',
      date: '2018-11-20',
      weight: 88.8,
    };
    const mockedContext = {
      db: {
        mutation: {
          updateWeightLog: jest.fn().mockImplementation(() => Promise.resolve({
            ...args,
            image: null,
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

    const weight = await updateWeight(null, args, mockedContext);

    expect(mockedContext.db.query.users).toBeCalled();
    expect(
      mockedContext.db.query.users.mock.calls[0]
    ).toMatchSnapshot();
    expect(mockedContext.db.mutation.updateWeightLog).toBeCalled();
    expect(
      mockedContext.db.mutation.updateWeightLog.mock.calls[0]
    ).toMatchSnapshot();
    expect(weight).toMatchSnapshot();
  });

  it('throws error if user is not signed in', () => {
    const mockedContext = {
      request: {},
    };

    expect(
      updateWeight(null, null, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
