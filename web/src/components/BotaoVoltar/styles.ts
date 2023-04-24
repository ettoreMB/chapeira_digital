import styled from 'styled-components'

export const Container = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.sky['sky-500']};
  border: none;
  background-color: transparent;
  cursor: pointer;
`
