import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Page from './Page';

describe('<Page />', () => {
  it('matches snapshot', () => {
    const ChildComponent = () => <p>Test</p>;
    const wrapper = shallow(
      <Page>
        <ChildComponent />
      </Page>
    );

    expect(
      toJSON(wrapper.find('Pagestyles__StyledPage'))
    ).toMatchSnapshot();
  });
});
