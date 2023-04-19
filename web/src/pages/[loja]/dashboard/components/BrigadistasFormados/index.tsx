import { calcularPercentual } from '@/utils/calculaPorcentagem'
import { ProgressBar } from 'react-bootstrap'
import Stack from 'react-bootstrap/Stack'
import DashBoardCard from '../DashBoardCard'
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
      <DashBoardCard bgTitulo="danger" titulo="Brigadistas Formados">
        <div className="row align-items-center">
          <span className="col md-3">Total Loja</span>
          <ProgressBar className="flex-fill  col-8" style={{ height: 32 }}>
            <ProgressBar
              variant="danger"
              now={totalBrigadistas}
              className="flex-fill col-8"
              key={1}
              label={`${calcularPercentual(
                totalBrigadistas,
                total,
              )}(${totalNaoBrigadistas} Brigadistas)`}
              max={total}
              min={0}
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
              min={0}
            />
          </ProgressBar>
        </div>
        {data?.map((item: any) => (
          <LinhaAndar
            key={Math.random()}
            titulo={`Zona ${item.Zona} (${item.Andar}º Aandar)`}
            nFormados={item.total_brigadistas}
            nNaoFormados={item.total_colaboradores_nao_brigadistas}
          />
        ))}
      </DashBoardCard>
    </Stack>
  )
}
