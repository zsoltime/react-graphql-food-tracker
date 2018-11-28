'use strict';

const addWeight = require('./addWeight');

describe('addWeight mutation', () => {
  it('inserts weight to the database', async () => {
    const args = {
      date: '2018-11-28',
      image:
        'https://images.unsplash.com/photo-1506061697648-9ffed5394573?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ed4f2398f9beb723c7a73a6fd37eeb7f&auto=format&fit=crop&w=2600&q=80',
      weight: 92.1,
    };
    const mockedContext = {
      db: {
        mutation: {
          createWeightLog: jest
            .fn()
            .mockImplementation(() => Promise.resolve({ ...args, date: new Date(args.date) })),
        },
      },
      request: { userId: 'validUserId' },
    };

    const weightLog = await addWeight(null, args, mockedContext);

    expect(
      mockedContext.db.mutation.createWeightLog
    ).toHaveBeenCalled();
    expect(
      mockedContext.db.mutation.createWeightLog.mock.calls[0]
    ).toMatchSnapshot();
    expect(weightLog).toMatchSnapshot();
  });

  it('inserts weight to the database with current date if no date provided', async () => {
    const args = {
      image:
        'https://images.unsplash.com/photo-1506061697648-9ffed5394573?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ed4f2398f9beb723c7a73a6fd37eeb7f&auto=format&fit=crop&w=2600&q=80',
      weight: 92.1,
    };
    const mockedContext = {
      db: {
        mutation: {
          createWeightLog: jest
            .fn()
            .mockImplementation(() => Promise.resolve({ ...args, date: new Date() })),
        },
      },
      request: { userId: 'validUserId' },
    };

    const weightLog = await addWeight(null, args, mockedContext);

    expect(
      mockedContext.db.mutation.createWeightLog
    ).toHaveBeenCalledWith({
      data: expect.objectContaining({
        date: expect.any(Date),
        image: args.image,
        user: { connect: { id: mockedContext.request.userId } },
        weight: args.weight,
      }),
    });
    expect(weightLog).toEqual(
      expect.objectContaining({
        date: expect.any(Date),
        image: args.image,
        weight: args.weight,
      })
    );
  });

  it('throws error if user is not signed in', () => {
    const mockedContext = { request: {} };

    expect(
      addWeight(null, null, mockedContext)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
