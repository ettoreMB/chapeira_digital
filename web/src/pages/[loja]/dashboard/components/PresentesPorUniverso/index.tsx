import { Stack } from 'react-bootstrap'
import DashBoardCard from '../DashBoardCard'
import LinhaUniverso from './LinhaUniveso'

interface dashProps {
  data: any
}
export default function PresentesPorUniverso({ data }: dashProps) {
  return (
    <Stack>
      <DashBoardCard titulo="Presentes por univeso" bgTitulo="primary">
        {data?.map((item: any) => (
          <LinhaUniverso
            key={Math.random()}
            titulo={item.Universo}
            presentes={item.colaboradores_presentes}
            ausentes={item.colaboradores_ausentes}
            total={item.total_colaboradores}
          />
        ))}
      </DashBoardCard>
    </Stack>
  )
}
