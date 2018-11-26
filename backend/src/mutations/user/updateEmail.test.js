'use strict';

const updateEmail = require('./updateEmail');

describe('updateEmail mutation', () => {
  it('sets user a pending email and returns a message', async () => {
    const args = { email: 'test@email.io' };
    const mockedContext = {
      db: {
        mutation: { updateUser: jest.fn() },
        query: {
          user: jest
            .fn()
            .mockImplementation(() => Promise.resolve(null)),
        },
      },
      request: { userId: 'testUserId' },
    };
    const res = await updateEmail(null, args, mockedContext);

    expect(res).toMatchSnapshot();
    expect(
      mockedContext.db.query.user.mock.calls[0]
    ).toMatchSnapshot();
    expect(mockedContext.db.mutation.updateUser).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          pendingEmail: args.email,
          token: expect.any(String),
          tokenExpiry: expect.any(Number),
        },
        where: { id: 'testUserId' },
      })
    );
  });

  it('throws error if user not signed in', () => {
    const mockedContext = {
      request: {},
    };

    expect(
      updateEmail(null, null, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws error if email is invalid', () => {
    const args = { email: 'invalidemail.io' };
    const mockedContext = {
      request: { userId: 'testUserId' },
    };

    expect(
      updateEmail(null, args, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws error if email is already in use', () => {
    const args = { email: 'valid@email.io' };
    const mockedContext = {
      db: {
        query: {
          user: jest
            .fn()
            .mockImplementation(() => Promise.resolve({})),
        },
      },
      request: { userId: 'testUserId' },
    };

    expect(
      updateEmail(null, args, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
