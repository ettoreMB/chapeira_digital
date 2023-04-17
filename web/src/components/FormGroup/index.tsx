import { ReactNode } from 'react'
import { Container } from './styles'

interface Props {
  label?: string
  children: ReactNode
  width?: number
}

export default function FormGroup({ children, width, label }: Props) {
  return (
    <Container width={width}>
      <label>{label}</label>
      {children}
    </Container>
  )
}
