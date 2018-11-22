import Link from 'next/link';
import React from 'react';

import { Logo, StyledHeader } from './Header.styles';
import Nav from './Nav';

const Header = () => (
  <StyledHeader>
    <nav className="navbar">
      <Logo>
        <Link href="/">
          <a>FoodTracker</a>
        </Link>
      </Logo>
      <Nav />
    </nav>
  </StyledHeader>
);

export default Header;
