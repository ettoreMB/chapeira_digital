import styled from 'styled-components'

interface Props {
  textAlign?: string
}

export const Container = styled.thead`
  background-color: ${({ theme }) => theme.colors.zinc['zinc-50']};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`
export const Th = styled.th<Props>`
  border: 1px solid ${({ theme }) => theme.colors.zinc['zinc-200']};
  border-radius: 8px;
  padding: 0.5rem;
  font-size: 22px;
  background-color: ${({ theme }) => theme.colors.gray[600]};
  text-align: ${({ textAlign }) => textAlign ?? 'left'};
`
