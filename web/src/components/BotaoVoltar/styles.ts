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
`
export const VoltarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  cursor: pointer;
`
