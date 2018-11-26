'use strict';

const validateEmail = require('./validateEmail');

describe('validateEmail mutation', () => {
  it('updates user email and returns data', async () => {
    const args = { token: 'testToken' };
    const fakeUser = {
      id: 'testId',
      email: 'test@email.io',
      pendingEmail: 'newTest@email.io',
      permissions: ['USER'],
      profile: null,
    };
    const mockedContext = {
      db: {
        mutation: {
          updateUser: jest.fn().mockImplementation(() => Promise.resolve({
            ...fakeUser,
            pendingEmail: null,
            email: fakeUser.pendingEmail,
            token: null,
            tokenExpiry: null,
          })),
        },
        query: {
          users: jest
            .fn()
            .mockImplementation(() => Promise.resolve([{ ...fakeUser }])),
        },
      },
    };

    const res = await validateEmail(null, args, mockedContext);

    expect(mockedContext.db.query.users).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          token: args.token,
          tokenExpiry_gte: expect.any(Number),
        },
      })
    );
    expect(
      mockedContext.db.mutation.updateUser.mock.calls[0]
    ).toMatchSnapshot();
    expect(res).toMatchSnapshot();
  });

  it('throws error if token is invalid', () => {
    const args = { token: 'invalidToken' };
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
      validateEmail(null, args, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
