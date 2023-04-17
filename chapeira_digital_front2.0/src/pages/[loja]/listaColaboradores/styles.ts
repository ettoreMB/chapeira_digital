import styled from 'styled-components'

interface TdProps {
  status: 'Presente' | 'Ausente' | any
}

export const StatusBadge = styled.div<TdProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.neutral[500]};

  div {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${({ status, theme }) =>
      status === 'Presente' ? theme.colors.green : theme.colors.red};
  }
`
