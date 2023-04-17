import { FormEvent, InputHTMLAttributes, ReactNode } from 'react'
import { Container } from './styles'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeHolder: string
  value: string
  onSearch: (e: FormEvent<HTMLInputElement>) => void
  children?: ReactNode
}

export default function BarraDePesquisa({
  placeHolder,
  children,
  value,
  onSearch,
  ...rest
}: Props) {
  return (
    <Container>
      <input
        placeholder={placeHolder}
        onChange={onSearch}
        value={value}
        {...rest}
      />
      {children}
    </Container>
  )
}
