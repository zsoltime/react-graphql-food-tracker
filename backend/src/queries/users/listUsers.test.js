'use strict';

const listUsers = require('./listUsers');

describe('listUsers query', () => {
  it('lists users', async () => {
    const mockedContext = {
      db: {
        query: {
          user: jest
            .fn()
            .mockImplementation(() => ({ permissions: ['ADMIN'] })),
          users: jest.fn().mockImplementation(() => []),
        },
      },
      request: { userId: 'testUserId' },
    };

    await listUsers(null, null, mockedContext, 'testInfoObject');

    expect(mockedContext.db.query.users).toHaveBeenCalled();
    expect(
      mockedContext.db.query.users.mock.calls[0]
    ).toMatchSnapshot();
  });

  it('throws error if user is not logged in', () => {
    const mockedContext = {
      request: {},
    };

    expect(
      listUsers(null, null, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws error if user does not have permssion', () => {
    const mockedContext = {
      db: {
        query: {
          user: jest
            .fn()
            .mockImplementation(() => ({ permissions: ['USER'] })),
        },
      },
      request: { userId: 'testUserId' },
    };

    expect(
      listUsers(null, null, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
