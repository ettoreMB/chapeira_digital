import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`
export const LinkContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  transition: transform 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.sky['sky-500']};
  }
  a {
    font-size: 1.5rem;

    &:hover {
      color: ${({ theme }) => theme.colors.sky['sky-500']};
      transform: scale(1.05);
    }
  }
`
