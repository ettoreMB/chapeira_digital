import styled, { css, keyframes } from 'styled-components'

interface Props {
  type: any
}

const fadeIn = keyframes`
  from {opacity: 0; transform: translateY(100px)}
  to{opacity: 1;transform: translateY(0px)}
`

const containerVariants: any = {
  default: css`
    background: ${({ theme }) => theme.colors.sky['sky-600']};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.red};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.green};
  `,
}

export const Container = styled.div<Props>`
  padding: 16px 32px;
  background: ${({ theme }) => theme.colors.sky['sky-600']};
  color: #fff;
  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: ${fadeIn} 0.3s;
  ${({ type }) => containerVariants[type] || containerVariants.default}
  & + & {
    margin-top: 12px;
  }
  img {
    margin-right: 8px;
  }
`
