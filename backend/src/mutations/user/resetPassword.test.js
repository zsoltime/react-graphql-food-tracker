'use strict';

const resetPassword = require('./resetPassword');

describe('resetPassword mutation', () => {
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
