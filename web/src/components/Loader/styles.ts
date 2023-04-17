import styled, { css, keyframes } from 'styled-components'
interface OverlayProps {
  isLeaving: boolean
}
interface ContainerProps extends OverlayProps {}

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
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  background: rgba(246, 245, 252);
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${fadeOut} 0.3s forwards;
    `}
`
export const Container = styled.div<ContainerProps>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
  animation: ${scaleIn} 0.3s;
  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${scaleOut} 0.3s forwards;
    `}
`
