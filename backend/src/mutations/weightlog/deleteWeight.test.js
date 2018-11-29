'use strict';

const deleteWeight = require('./deleteWeight');

describe('deleteWeight mutation', () => {
  it('deletes and returns the weightLog entry', async () => {
    const args = {
      id: 'validFoodId',
    };
    const mockedContext = {
      db: {
        mutation: {
          deleteWeightLog: jest.fn().mockImplementation(() => Promise.resolve({
            ...args,
            date: new Date('2018-11-20'),
            image: null,
            weight: 88.8,
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

    const weight = await deleteWeight(null, args, mockedContext);

    expect(mockedContext.db.query.users).toBeCalled();
    expect(
      mockedContext.db.query.users.mock.calls[0]
    ).toMatchSnapshot();
    expect(mockedContext.db.mutation.deleteWeightLog).toBeCalled();
    expect(
      mockedContext.db.mutation.deleteWeightLog.mock.calls[0]
    ).toMatchSnapshot();
    expect(weight).toMatchSnapshot();
  });

  it('throws error if user is not signed in', () => {
    const mockedContext = {
      request: {},
    };

    expect(
      deleteWeight(null, null, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws error if ID is not valid', () => {
    const args = {
      id: 'invalidFoodId',
    };
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
      deleteWeight(null, args, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
