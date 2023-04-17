import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  max-width: 1140px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 1rem;
  padding: 1rem 0;
`

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  h1 {
    color: ${({ theme }) => theme.colors.neutral[500]};
  }

  strong {
    color: ${({ theme }) => theme.colors.sky['sky-500']};
    font-size: 1.5rem;
  }
  span {
  }
`
