'use strict';

const verifyFood = require('./verifyFood');

describe('verifyFood mutation', () => {
  it("updates food's verification status", async () => {
    const args = { id: 'validFoodId' };
    const mockedContext = {
      request: { userId: 'validUserId' },
      db: {
        mutation: {
          updateFood: jest.fn().mockImplementation(() => Promise.resolve({
            id: args.id,
            name: 'Fake food',
            verifiedAt: '2018-11-27T01:19:40.270Z',
          })),
        },
        query: {
          user: jest
            .fn()
            .mockImplementation(() => Promise.resolve({ permissions: ['ADMIN'] })),
        },
      },
    };

    const food = await verifyFood(null, args, mockedContext);

    expect(mockedContext.db.mutation.updateFood).toHaveBeenCalled();
    expect(
      mockedContext.db.mutation.updateFood.mock.calls[0][0]
    ).toEqual(
      expect.objectContaining({
        data: { verifiedAt: expect.any(Date) },
        where: { id: args.id },
      })
    );
    expect(food).toMatchSnapshot();
  });
  it('throws error if user has no permission', () => {
    const args = { id: 'validFoodId' };
    const mockedContext = {
      request: { userId: 'validUserId' },
      db: {
        query: {
          user: jest
            .fn()
            .mockImplementation(() => Promise.resolve({ permissions: ['USER'] })),
        },
      },
    };

    expect(
      verifyFood(null, args, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
