import styled, { css } from 'styled-components'
interface Props {
  danger: boolean
  active: boolean
  width?: number
}
export const StyledButton = styled.button<Props>`
  align-items: center;
  background: ${({ theme }) => theme.colors.sky['sky-600']};
  border: 2px solid transparent;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  color: #fff;
  display: inline-flex;
  font-size: 16px;
  font-weight: bold;
  height: 42px;
  justify-content: center;
  margin: 0 0.3rem;
  min-width: 80px;
  padding: 0 12px;
  transition: background-color 0.2s ease-in;
  width: ${({ width }) => (width ? `${width}%` : '')};

  &:hover {
    background: ${({ theme }) => theme.colors.sky['sky-500']};
  }

  &:active {
    background: ${({ theme }) => theme.colors.sky['sky-500']};
  }

  &[disabled] {
    background: #ccc !important;
    cursor: default !important;
  }

  ${({ theme, danger }) =>
    danger &&
    css`
      background: ${theme.colors.red};

      &:hover {
        background: ${theme.colors.red_light};
      }

      &:active {
        background: ${theme.colors.red_dark};
      }
    `}

  ${({ theme, active, danger }) =>
    active &&
    css`
      background: ${theme.colors.white};
      color: ${danger ? theme.colors.red : theme.colors.sky['sky-600']};
      border: 2px solid
        ${danger ? theme.colors.red : theme.colors.sky['sky-600']};

      &:hover {
        background: ${theme.colors.zinc['zinc-50']};
        color: #${theme.colors.neutral};
      }

      &:active {
        background: ${theme.colors.red_dark};
      }
    `}
`
