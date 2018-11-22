import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Nav from './Nav';

describe('<Nav />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<Nav />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
