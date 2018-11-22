import React from 'react';
import styled from 'styled-components';

const Intro = styled.div`
  text-align: center;

  h1 {
    font-size: 2rem;
    font-weight: 300;
    margin: 0 auto 1rem;
  }
`;

const Home = () => (
  <Intro>
    <h1>Food Tracker App</h1>
    <img src="/static/favicon.png" alt="" />
  </Intro>
);

export default Home;
