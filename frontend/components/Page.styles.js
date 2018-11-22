import styled from 'styled-components';

export const StyledPage = styled.div`
  background-color: #fff;
`;

export const Content = styled.main`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  padding: 1rem;

  @media (min-width: 1200px) {
    padding: 2rem;
  }
`;
