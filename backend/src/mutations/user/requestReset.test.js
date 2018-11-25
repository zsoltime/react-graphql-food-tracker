'use strict';

const requestReset = require('./requestReset');

describe('requestReset mutation', () => {
  it('updates user with generated token and sends email', async () => {
    const args = { email: 'email@foundindb.io' };

    const mockedContext = {
      db: {
        mutation: { updateUser: jest.fn() },
        query: {
          user: jest.fn().mockImplementation(() => ({ ...args })),
        },
      },
    };
    const res = await requestReset(null, args, mockedContext);

    expect(mockedContext.db.mutation.updateUser).toHaveBeenCalled();
    expect(mockedContext.db.mutation.updateUser).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          token: expect.any(String),
          tokenExpiry: expect.any(Number),
        },
        where: { ...args },
      })
    );
    expect(res).toMatchSnapshot();
  });

  it('throws error if email is invalid', () => {
    const args = { email: 'invalidEmail.io' };

    expect(
      requestReset(null, args)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws error if email address is not found in database', () => {
    const args = { email: 'email@notfound.io' };
    const mockedContext = {
      db: {
        query: {
          user: jest.fn().mockImplementation(() => null),
        },
      },
    };

    expect(
      requestReset(null, args, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
    // toMatchSnapshot overwrites previous one for some reason
    expect(mockedContext.db.query.user.mock.calls[0]).toEqual([
      { where: { email: 'email@notfound.io' } },
    ]);
  });
});
