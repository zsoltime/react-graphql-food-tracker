'use strict';

const upsertProfile = require('./upsertProfile');

describe('upsertProfile mutation', () => {
  it('throws error if user is not logged in', () => {
    const mockedContext = {
      request: {},
    };

    expect(
      upsertProfile(null, null, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('creates profile if user has none', async () => {
    const args = { name: 'Zsolt', height: 198 };
    const mockedContext = {
      db: {
        mutation: {
          createProfile: jest.fn(),
        },
        query: {
          profiles: jest.fn().mockImplementation(() => []),
        },
      },
      request: { userId: 'testUserId' },
    };

    await upsertProfile(null, args, mockedContext);

    expect(
      mockedContext.db.mutation.createProfile
    ).toHaveBeenCalled();
    expect(
      mockedContext.db.mutation.createProfile.mock.calls[0]
    ).toMatchSnapshot();
  });

  it('updates profile if user has one', async () => {
    const args = { name: 'Zsolt', height: 198 };
    const mockedContext = {
      db: {
        mutation: {
          updateProfile: jest.fn(),
        },
        query: {
          profiles: jest
            .fn()
            .mockImplementation(() => [{ id: 'testProfileId' }]),
        },
      },
      request: { userId: 'testUserId' },
    };

    await upsertProfile(null, args, mockedContext);

    expect(
      mockedContext.db.mutation.updateProfile
    ).toHaveBeenCalled();
    expect(
      mockedContext.db.mutation.updateProfile.mock.calls[0]
    ).toMatchSnapshot();
  });
});
