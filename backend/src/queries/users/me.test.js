'use strict';

const me = require('./me');

describe('me query', () => {
  it('returns the user data if signed in', async () => {
    const fakeUser = {
      id: 'testId',
      email: 'test@email.io',
      permissions: ['USER'],
      profile: null,
    };
    const mockedContext = {
      db: {
        query: { user: jest.fn().mockImplementation(() => fakeUser) },
      },
      request: { userId: 'testUserId' },
    };

    const res = await me(null, null, mockedContext, 'testInfoObject');

    expect(mockedContext.db.query.user).toHaveBeenCalled();
    expect(
      mockedContext.db.query.user.mock.calls[0]
    ).toMatchSnapshot();
    expect(res).toMatchSnapshot();
  });

  it('returns null if user is not signed in', () => {
    const mockedContext = {
      request: {},
    };

    expect(me(null, null, mockedContext)).toBe(null);
  });
});
