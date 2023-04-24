import styled from 'styled-components'

interface InfoProps {
  background: string
}

export const Info = styled.div<InfoProps>`
  background: ${(props) => props.background};
  padding: 0.1rem 0.5rem;
  border-radius: 8px;
  gap: 0.5rem;
  display: flex;
  align-items: center;

  span {
    color: ${({ theme }) => theme.colors.zinc['zinc-50']};
  }
`
