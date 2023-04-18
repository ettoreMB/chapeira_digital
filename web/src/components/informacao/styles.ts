import styled from 'styled-components'

interface InfoProps {
  background: string
}

export const Info = styled.div<InfoProps>`
  background: ${(props) => props.background};
  padding: 0.1rem 0.5rem;
  border-radius: 8px;
  gap: 20px;
  display: flex;
  span {
    color: ${({ theme }) => theme.colors.zinc['zinc-50']};
  }
`