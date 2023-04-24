import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: inline-flex;
  gap: 4px;

  input {
    width: 100%;
    border: none;
    height: 48px;
    border-radius: 8px;
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.sky['sky-600']};
  }
`
