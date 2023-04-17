import styled, { css } from 'styled-components'

interface Props {
  error?: boolean
  width?: number
}

export const StyledInput = styled.input<Props>`
  width: 100%;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  height: 52px;
  border-radius: 4px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  border: 2px solid #fff;
  transition: border-color 0.2s ease-in;
  appearance: none;
  border: 1px solid ${({ theme }) => theme.colors.sky['sky-600']};
  margin-right: 0.2rem;
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.sky['sky-600']};
  }

  ${({ theme, error }) =>
    error &&
    css`
      color: ${theme.colors.red};
      border-color: ${theme.colors.red}!important;
    `}

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.zinc['zinc-200']};
    border-color: ${({ theme }) => theme.colors.sky['sky-600']};
  }
`
