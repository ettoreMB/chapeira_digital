import { ProgressBar } from 'react-bootstrap'

import LinhaDashBoard from '../LinhaDashBoard'

interface LinhaAndarProps {
  titulo: string
  presentes: number
  ausentes: number
  total: number
}

export default function LinhaZona({
  titulo,
  presentes,
  ausentes,
  total,
}: LinhaAndarProps) {
  return (
    <LinhaDashBoard
      titulo={titulo}
      total={total}
      mensagem="Não há brigadistas Cadastrados"
    >
      <ProgressBar
        className="flex-fill"
        variant="danger"
        now={presentes}
        label={`${presentes} ${presentes > 1 ? 'Presentes' : 'Presente'}`}
      />
      <ProgressBar
        className="bg-light text-dark flex-fill shadown"
        now={ausentes}
        label={`${ausentes} ${ausentes > 1 ? 'Ausentes' : 'Ausente'} `}
      />
    </LinhaDashBoard>
  )
}
