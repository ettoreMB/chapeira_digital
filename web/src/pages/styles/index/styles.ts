import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;

  padding: 16px 0;

  a {
    color: ${({ theme }) => theme.colors.sky['sky-400']};
    text-decoration: none;
    font-size: 1rem;
    transition: ease-in 0.2;
    cursor: pointer;

    span {
      font-size: 24px;
    }
    &:hover {
      color: ${({ theme }) => theme.colors.sky['sky-600']};
      transform: scale(1.2);
    }
  }
`
