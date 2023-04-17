import { ProgressBar } from 'react-bootstrap'

import LinhaDashBoard from '../LinhaDashBoard'

interface LinhaAndarProps {
  titulo: string
  presentes: number
  ausentes: number
  total: number
}

export default function LinhaUniverso({
  titulo,
  presentes,
  ausentes,
  total,
}: LinhaAndarProps) {
  return (
    <LinhaDashBoard titulo={titulo} total={total}>
      <ProgressBar
        className="flex-fill shadow"
        variant="primary"
        now={presentes}
        label={`${presentes} ${presentes > 1 ? 'Presentes' : 'Presente'}`}
        max={total}
      />

      <ProgressBar
        className="bg-light text-dark bold shadow"
        now={ausentes}
        label={`${ausentes} ${ausentes > 1 ? 'Ausentes' : 'Ausente'}`}
        max={total}
      />
    </LinhaDashBoard>
  )
}
