import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.green};
  }
  body {
    background: ${(props) => props.theme.colors.zinc['zinc-50']};
    color: ${(props) => props.theme.colors.gray['400']};
    -webkit-font-smoothing: antialiased;
  }
  body, input, textarea, button {
    font-family: ${(props) => props.theme.fonts.default};
    font-weight: 400;
    font-size: 1rem;
  }

  a {
    text-decoration: none;
    color: inherit;

    &:visited {
      text-decoration: none;
      color: inherit;
    }
  }
`
