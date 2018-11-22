import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Meta from './Meta';

describe('<Meta />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<Meta />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
