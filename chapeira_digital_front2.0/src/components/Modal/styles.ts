import styled, { css, keyframes } from 'styled-components'
interface OverlayProps {
  isLeaving: boolean
}
interface ContainerProps extends OverlayProps {
  // danger: boolean
}

const fadeIn = keyframes`
  from {opacity: 0}
  to{opacity: 1}
`
const scaleIn = keyframes`
  from {transform: scale(0)}
  to{transform: scale(1)}
`
const fadeOut = keyframes`
  from {opacity: 1}
  to{opacity: 0}
`
const scaleOut = keyframes`
  from {transform: scale(1)}
  to{transform: scale(0)}
`

export const Overlay = styled.div<OverlayProps>`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3.5px);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.5s;
  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${fadeOut} 0.3s forwards;
    `}
`

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 450px;
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  animation: ${scaleIn} 0.5s;
  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${scaleOut} 0.3s forwards;
    `}
  > h1 {
    font-size: 22px;
    color: ${({ theme }) => theme.colors.neutral};
  }

  .modal-body {
    margin-top: 20px;
  }
`

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 32px;

  .cancel-button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.gray[600]};
    font-size: 16px;
    margin-right: 24px;

    &[disabled] {
      cursor: not-allowed;
    }
  }
`
