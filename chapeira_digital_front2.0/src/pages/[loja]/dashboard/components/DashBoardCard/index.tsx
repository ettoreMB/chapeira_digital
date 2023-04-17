import { ReactNode } from 'react'
import { Card } from 'react-bootstrap'

type BgTituloProps = 'primary' | 'danger' | 'info' | 'dark' | 'light'

interface Props {
  titulo: string
  bgTitulo: BgTituloProps
  children: ReactNode
}

export function DashBoardCoard({ titulo, bgTitulo, children }: Props) {
  return (
    <Card className="col  my-2">
      <Card.Title
        className={`bg-${bgTitulo} text-center text-white  card-header`}
      >
        {titulo}
      </Card.Title>
      <Card.Body>{children}</Card.Body>
    </Card>
  )
}
