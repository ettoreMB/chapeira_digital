import styled from 'styled-components'

interface Props {
  numero: number
}

export const TRow = styled.tr<Props>`
  background: ${(props) =>
    props.numero % 2 === 0
      ? props.theme.colors.white
      : props.theme.colors.zinc['zinc-200']};
`
