'use strict';

const signIn = require('./signIn');

jest.mock('bcryptjs');

// There are two describes in thus file as I wanted
// to mock bcrypt.compare with different results
describe('signIn mutation happy path', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('bcryptjs').setMockResult(true);
  });

  it('signs user in', async () => {
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
        query: {
          user: jest
            .fn()
            .mockImplementation(() => Promise.resolve(fakeUser)),
        },
      },
      response: {
        cookie: jest.fn(),
      },
    };

    const user = await signIn(null, args, mockedContext);

    expect(mockedContext.response.cookie).toHaveBeenCalled();
    expect(
      mockedContext.response.cookie.mock.calls[0]
    ).toMatchSnapshot();
    expect(user).toMatchSnapshot();
  });
});

describe('signIn mutation', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('bcryptjs').setMockResult(false);
  });

  it('throws error if user is not found in database', () => {
    const args = { email: 'zsolti@me.com', password: 'test1234' };
    const mockedContext = {
      db: {
        query: {
          user: jest.fn().mockImplementation(() => null),
        },
      },
    };

    expect(signIn(null, args, mockedContext)).rejects.toThrowError(
      'Email or password is incorrect'
    );

    expect(mockedContext.db.query.user).toHaveBeenCalledWith({
      where: { email: args.email },
    });
  });

  it('throws error if password is incorrect', () => {
    const args = { email: 'zsolti@me.com', password: 'test1234' };
    const mockedContext = {
      db: {
        query: {
          user: jest
            .fn()
            .mockImplementation(() => Promise.resolve({ password: 'test' })),
        },
      },
    };

    expect(signIn(null, args, mockedContext)).rejects.toThrowError(
      'Email or password is incorrect'
    );
  });
});
