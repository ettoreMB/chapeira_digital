import styled from 'styled-components'
interface Props {
  width?: number
}
export const Container = styled.div<Props>`
  width: ${({ width }) => (width ? `${width}%` : '100%')};
  display: flex;
  flex-direction: column;
  margin-right: 0.5rem;
  label {
    color: ${({ theme }) => theme.colors.sky['sky-600']};
  }
`
