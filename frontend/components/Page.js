import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import Header from './Header';
import Meta from './Meta';
import GlobalStyles from './GlobalStyles';
import { Content, StyledPage } from './Page.styles';
import defaultTheme from '../themes';

const Page = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    <>
      <StyledPage>
        <Meta />
        <Header />
        <Content>{children}</Content>
      </StyledPage>
      <GlobalStyles />
    </>
  </ThemeProvider>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
