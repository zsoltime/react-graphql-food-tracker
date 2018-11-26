'use strict';

const signOut = require('./signOut');

describe('signOut mutation', () => {
  it('clears the token cookie and returns a message', () => {
    const mockedContext = {
      response: {
        clearCookie: jest.fn(),
      },
    };

    const res = signOut(null, null, mockedContext);

    expect(mockedContext.response.clearCookie).toHaveBeenCalledWith(
      'token'
    );
    expect(res).toMatchSnapshot();
  });
});
