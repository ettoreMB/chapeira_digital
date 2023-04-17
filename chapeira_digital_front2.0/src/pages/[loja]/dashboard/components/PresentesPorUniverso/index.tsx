import { Stack } from 'react-bootstrap'
import { DashBoardCoard } from '../DashBoardCard'
import LinhaUniverso from './LinhaUniveso'

interface dashProps {
  totalBrigadistas: number
  totalNaoBrigadistas: number
  data: any
}
export default function PresentesPorUniverso({ data }: dashProps) {
  return (
    <Stack>
      <DashBoardCoard titulo="Presentes por univeso" bgTitulo="primary">
        {data.map((item: any) => (
          <LinhaUniverso
            key={Math.random()}
            titulo={item.Universo}
            presentes={item.colaboradores_presentes}
            ausentes={item.colaboradores_ausentes}
            total={item.total_colaboradores}
          />
        ))}
      </DashBoardCoard>
    </Stack>
  )
}
