import styled from 'styled-components'
interface Props {
  status: string
}
export const Button = styled.button<Props>`
  border: none;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  color: #fafafa;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 92px;
  color: ${({ theme }) => theme.colors.zinc['zinc-50']};
  font-weight: bold;
  background: ${({ status, theme }) =>
    status === 'Presente' ? theme.colors.red : theme.colors.green};

  &[disabled] {
    background: #ccc !important;
    cursor: default !important;
  }
`
