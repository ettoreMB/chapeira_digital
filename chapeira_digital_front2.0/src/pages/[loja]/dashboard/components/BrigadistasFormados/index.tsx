import { calcularPercentual } from '@/utils/calculaPorcentagem'
import { ProgressBar } from 'react-bootstrap'
import Stack from 'react-bootstrap/Stack'
import { DashBoardCoard } from '../DashBoardCard'
import LinhaAndar from './LinhaAndar'

interface dashProps {
  totalBrigadistas: number
  totalNaoBrigadistas: number
  data: any
}
export default function BrigadistasFormados({
  totalBrigadistas,
  totalNaoBrigadistas,
  data,
}: dashProps) {
  const total = totalBrigadistas + totalNaoBrigadistas
  return (
    <Stack>
      <DashBoardCoard bgTitulo="danger" titulo="Brigadistas Formados">
        <Stack direction="horizontal">
          <span className="col-md-3">Total Loja</span>
          <ProgressBar className="flex-fill" style={{ height: 32 }}>
            <ProgressBar
              variant="danger"
              now={totalBrigadistas}
              key={1}
              label={`${calcularPercentual(
                totalBrigadistas,
                total,
              )}(${totalNaoBrigadistas} Brigadistas)`}
              max={total}
            />
            <ProgressBar
              variant="warning"
              now={totalNaoBrigadistas}
              key={2}
              label={`${calcularPercentual(
                totalNaoBrigadistas,
                total,
              )}(${totalNaoBrigadistas} Não Brigadistas)`}
              max={total}
            />
          </ProgressBar>
        </Stack>
        {data.map((item: any) => (
          <LinhaAndar
            key={Math.random()}
            titulo={`Zona ${item.Zona} (${item.Andar}º Aandar)`}
            nFormados={item.total_brigadistas}
            nNaoFormados={item.total_colaboradores_nao_brigadistas}
          />
        ))}
      </DashBoardCoard>
    </Stack>
  )
}
