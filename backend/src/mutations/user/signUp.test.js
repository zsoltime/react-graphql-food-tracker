'use strict';

const signUp = require('./signUp');

describe('signUp mutation', () => {
  it('creates user and logs in', async () => {
    const args = { email: 'test@email.io', password: 'test1234' };
    const fakeUser = {
      id: 'testId',
      email: 'test@email.io',
      pendingEmail: null,
      permissions: ['USER'],
      profile: null,
    };
    const mockedContext = {
      db: {
        mutation: {
          createUser: jest.fn().mockImplementation(() => fakeUser),
        },
        query: {
          user: jest.fn().mockImplementation(() => null),
        },
      },
      response: {
        cookie: jest.fn(),
      },
    };

    const user = await signUp(null, args, mockedContext);

    expect(mockedContext.response.cookie).toHaveBeenCalled();
    expect(
      mockedContext.response.cookie.mock.calls[0]
    ).toMatchSnapshot();
    expect(user).toMatchSnapshot();
  });

  it('throws error if email is invalid', () => {
    const args = { email: 'invalidemail.io', password: 'test1234' };

    expect(signUp(null, args)).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws error if email is already in use', () => {
    const args = { email: 'zsolti@me.com', password: 'test1234' };
    const mockedContext = {
      db: {
        query: {
          user: jest
            .fn()
            .mockImplementation(() => ({ id: 'testUserId' })),
        },
      },
    };

    expect(
      signUp(null, args, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();

    expect(mockedContext.db.query.user).toHaveBeenCalledWith({
      where: { email: args.email },
    });
  });

  it('throws error if password is invalid', () => {
    const args = { email: 'zsolti@me.com', password: 'invalid' };
    const mockedContext = {
      db: {
        query: {
          user: jest.fn().mockImplementation(() => null),
        },
      },
    };

    expect(
      signUp(null, args, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
