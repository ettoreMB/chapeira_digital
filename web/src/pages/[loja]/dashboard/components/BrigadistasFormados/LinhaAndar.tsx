import { calcularPercentual } from '@/utils/calculaPorcentagem'
import { ProgressBar } from 'react-bootstrap'
import LinhaDashBoard from '../LinhaDashBoard'

interface LinhaAndarProps {
  titulo: string
  nFormados: number
  nNaoFormados: number
}

export default function LinhaAndar({
  titulo,
  nFormados,
  nNaoFormados,
}: LinhaAndarProps) {
  const total = nFormados + nNaoFormados
  return (
    <LinhaDashBoard titulo={titulo} total={nNaoFormados + nNaoFormados}>
      <ProgressBar
        variant="danger"
        now={nFormados}
        key={1}
        label={`${calcularPercentual(nFormados, total)}(${nFormados} ${
          nFormados > 1 ? 'Brigadistas' : 'Brigadista'
        })`}
        max={total}
        min={0}
      />
      <ProgressBar
        variant="warning"
        now={nNaoFormados}
        key={2}
        label={`${calcularPercentual(nNaoFormados, total)}(${nNaoFormados} ${
          nFormados > 1 ? 'Não Brigadistas' : 'Não Brigadista'
        })`}
        max={total}
        min={0}
      />
    </LinhaDashBoard>
  )
}
