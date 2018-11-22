import styled from 'styled-components';

const NavStyles = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;

  a {
    align-items: center;
    color: inherit;
    display: flex;
    padding: 0.5rem 1rem;
    position: relative;

    @media (min-width: 700px) {
      line-height: 2.5;
      padding: 0.5rem 1.25rem;
    }

    &:after {
      background-color: ${({ theme }) => theme.pink};
      height: 2px;
      content: '';
      left: 50%;
      margin-top: 2rem;
      position: absolute;
      transform: translateX(-50%);
      transition: width ${({ theme }) => theme.transition};
      width: 0;
    }

    &:hover,
    &:focus {
      &:after {
        width: calc(100% - 2.5rem);
      }
    }
  }

  @media (min-width: 700px) {
    font-size: 1.125rem;
    justify-content: flex-end;
  }

  @media (min-width: 1200px) {
    font-size: 1.25rem;
  }
`;

export default NavStyles;
