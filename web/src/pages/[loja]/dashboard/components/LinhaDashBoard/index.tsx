import { ReactNode } from 'react'
import { ProgressBar } from 'react-bootstrap'
import NenhumColaborador from '../NenhumColaborador'

interface Props {
  titulo: string
  children: ReactNode
  total: number
  mensagem?: string
}
export default function LinhaDashBoard({
  titulo,
  children,
  total,
  mensagem = 'Não há registros',
}: Props) {
  return (
    <div className="row align-items-center">
      <span className="col-2 my-2">{titulo}</span>
      {total === 0 && <NenhumColaborador mensagem={mensagem} />}
      {total > 0 && (
        <ProgressBar
          className="flex-fill rounded col-10 my-2"
          style={{ height: 32 }}
        >
          {children}
        </ProgressBar>
      )}
    </div>
  )
}
