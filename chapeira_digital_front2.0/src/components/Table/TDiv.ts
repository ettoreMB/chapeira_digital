import styled from 'styled-components'

interface Props {
  width?: number
  textAlign?: 'left' | 'right' | 'center'
}

export const TDiv = styled.td<Props>`
  width: ${({ width }) => `${width}%`};
  flex: 1;
  padding: 0.3rem 1rem;
  align-items: center;
  text-align: ${({ textAlign }) => textAlign || 'left'};
  justify-content: ${({ textAlign }) => textAlign || 'left'};

  a {
    color: ${({ theme }) => theme.colors.neutral[500]};
  }
  a:visited {
    color: ${({ theme }) => theme.colors.neutral[500]};
  }
`
