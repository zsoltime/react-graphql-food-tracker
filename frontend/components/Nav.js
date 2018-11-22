import Link from 'next/link';
import React from 'react';

import NavStyles from './Nav.styles';

const Nav = () => (
  <NavStyles>
    <li>
      <Link href="/dashboard">
        <a>Dashboard</a>
      </Link>
    </li>
    <li>
      <Link href="/track">
        <a>Diary</a>
      </Link>
    </li>
    <li>
      <Link href="/foods">
        <a>Foods</a>
      </Link>
    </li>
    <li>
      <Link href="/account">
        <a>Account</a>
      </Link>
    </li>
  </NavStyles>
);

export default Nav;
