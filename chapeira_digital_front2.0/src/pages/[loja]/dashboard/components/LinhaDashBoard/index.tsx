import { ReactNode } from 'react'
import { ProgressBar } from 'react-bootstrap'
import Stack from 'react-bootstrap/Stack'
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
    <Stack direction="horizontal" className="my-2">
      <span className="col-md-3">{titulo}</span>
      {total === 0 && <NenhumColaborador mensagem={mensagem} />}
      {total > 0 && (
        <ProgressBar className="flex-fill rounded" style={{ height: 32 }}>
          {children}
        </ProgressBar>
      )}
    </Stack>
  )
}
