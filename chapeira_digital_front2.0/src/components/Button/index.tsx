import React, { ReactNode } from 'react'
import { StyledButton } from './styles'
import { MdClose } from 'react-icons/md'
import Spinner from '../Spinner'
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  danger?: boolean
  active?: boolean
  isLoading?: boolean
  width?: number
  onClick?: (
    e: React.FormEvent<HTMLButtonElement>,
  ) => void | (() => void) | Promise<any>
}

export default function Button({
  active = false,
  children,
  danger = false,
  isLoading,
  onClick,
  width,
  ...rest
}: Props) {
  return (
    <StyledButton
      onClick={onClick}
      danger={danger}
      disabled={isLoading}
      active={active}
      width={width}
      {...rest}
    >
      {isLoading && <Spinner size={16} />}
      {active && <MdClose size={12} color="red" />}
      {/* {!active && <MdClose size={12} color="transparent" />} */}
      {!isLoading && children}
    </StyledButton>
  )
}
