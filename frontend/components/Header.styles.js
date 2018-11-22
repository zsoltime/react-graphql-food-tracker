import styled from 'styled-components';

export const Logo = styled.h1`
  background-color: ${({ theme }) => theme.pink};
  font-family: 'Varela Round';
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 2px;
  line-height: 1;
  margin: 0;
  padding: 0.5rem;
  text-align: center;

  a {
    color: #fff;
    padding: 0.5rem 1rem;
    text-decoration: none;
  }

  @media (min-width: 700px) {
    font-size: 2.5rem;
    line-height: 1.15;
  }

  @media (min-width: 1200px) {
    font-size: calc(3.25rem - 1px);
    line-height: 1;
  }
`;

export const StyledHeader = styled.header`
  .navbar {
    align-items: stretch;
    border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;

    @media (min-width: 700px) {
      grid-template-columns: auto 1fr;
      justify-content: space-between;
    }
  }
`;
