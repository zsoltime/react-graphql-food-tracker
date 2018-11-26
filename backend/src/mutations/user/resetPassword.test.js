'use strict';

const resetPassword = require('./resetPassword');

describe('resetPassword mutation', () => {
  it('updates user password and updates cookie', async () => {
    const args = { password: 'test1234', token: 'validToken' };
    const fakeUser = {
      id: 'testId',
      email: 'test@email.io',
      pendingEmail: null,
      permissions: ['USER'],
      profile: null,
      token: args.token,
      tokenExpiry: 1234567890,
    };
    const mockedContext = {
      db: {
        mutation: {
          updateUser: jest.fn().mockImplementation(() => Promise.resolve({
            ...fakeUser,
            token: null,
            tokenExpiry: null,
          })),
        },
        query: {
          users: jest
            .fn()
            .mockImplementation(() => Promise.resolve([fakeUser])),
        },
      },
      response: { cookie: jest.fn() },
    };

    const user = await resetPassword(null, args, mockedContext);

    expect(mockedContext.response.cookie).toHaveBeenCalled();
    expect(
      mockedContext.response.cookie.mock.calls[0]
    ).toMatchSnapshot();
    expect(
      mockedContext.db.mutation.updateUser.mock.calls[0]
    ).toMatchSnapshot();
    expect(user).toMatchSnapshot();
  });

  it('throws error if token is not valid', () => {
    const args = { password: 'test1234', token: 'invalidToken' };
    const mockedContext = {
      db: {
        query: {
          users: jest
            .fn()
            .mockImplementation(() => Promise.resolve([])),
        },
      },
    };

    expect(
      resetPassword(null, args, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws error if password is not valid', () => {
    const args = { password: 'test123', token: 'invalidToken' };
    const mockedContext = {
      db: {
        query: {
          users: jest
            .fn()
            .mockImplementation(() => Promise.resolve([{ email: 'valid@email.io' }])),
        },
      },
    };

    expect(
      resetPassword(null, args, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
