import DashBoardCard from '../DashBoardCard'
import LinhaDashBoard from '../LinhaDashBoard'
import { ProgressBar, Stack } from 'react-bootstrap'
import { somaResultados } from '@/utils/somaResultadoLojas'

interface Props {
  data: any
}

export default function OutrosDashBoard({ data }: Props) {
  const visitantes = {
    total: somaResultados(data, 'total_visitantes'),
    presentes: somaResultados(data, 'total_visitantes_presentes'),
    ausente: somaResultados(data, 'total_visitante_ausentes'),
  }
  const terceiros = {
    total: somaResultados(data, 'total_terceiros'),
    presentes: somaResultados(data, 'total_terceiros_presentes'),
    ausente: somaResultados(data, 'total_terceiros_ausentes'),
  }
  return (
    <Stack>
      <DashBoardCard titulo="Outros" bgTitulo="dark">
        <LinhaDashBoard total={terceiros.total} titulo="TERCEIROS">
          <ProgressBar
            className="flex-fill shadow flex-fill"
            variant="primary"
            now={terceiros.presentes}
            label={`${terceiros.presentes}${
              terceiros.presentes > 1 ? 'Presentes' : 'Presente'
            }`}
            max={terceiros.total}
          />

          <ProgressBar
            className="bg-light text-dark bold shadow flex-fill"
            now={terceiros.ausente}
            label={`${terceiros.ausente} ${
              terceiros.ausente > 1 ? 'Ausentes' : 'Ausente'
            }`}
            max={1}
          />
        </LinhaDashBoard>
        <LinhaDashBoard total={visitantes.total} titulo="VISITANTES">
          <ProgressBar
            className="flex-fill shadow flex-fill"
            variant="primary"
            now={1}
            label={`${visitantes.ausente} ${
              visitantes.presentes > 1 ? 'Presentes' : 'Presente'
            }`}
            max={visitantes.total}
          />

          <ProgressBar
            className="bg-light text-dark bold shadow flex-fill"
            now={1}
            label={`${visitantes.ausente}${
              visitantes.ausente > 1 ? 'Ausentes' : 'Ausente'
            }`}
            max={visitantes.total}
          />
        </LinhaDashBoard>
      </DashBoardCard>
    </Stack>
  )
}
