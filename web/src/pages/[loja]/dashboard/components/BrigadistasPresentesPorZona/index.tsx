import { ProgressBar } from 'react-bootstrap'
import Stack from 'react-bootstrap/Stack'
import { DashBoardCoard } from '../DashBoardCard'
import NenhumColaborador from '../NenhumColaborador'
import LinhaZona from './LinhaZona'

interface dashProps {
  totalPresentes: number
  totalAusentes: number
  data: any
}
export default function BrigadistasPresentesPorZona({
  totalPresentes,
  totalAusentes,
  data,
}: dashProps) {
  const total = totalPresentes + totalAusentes
  return (
    <Stack>
      <DashBoardCoard titulo="Brigadistas presentes por Zona" bgTitulo="danger">
        <Stack direction="horizontal">
          <span className="col-md-3">Total Loja</span>
          {total === 0 ? (
            <NenhumColaborador mensagem="Não há brigadistas Cadastrados" />
          ) : (
            <ProgressBar
              className="flex-fill"
              style={{ height: 32 }}
              max={total}
            >
              <ProgressBar
                className="flex-fill"
                variant="danger"
                now={totalPresentes}
                label={`${totalPresentes} ${
                  totalPresentes > 1 ? 'Presentes' : 'Presente'
                }`}
                max={total}
              />
              <ProgressBar
                className="flex-fill bg-light text-dark"
                now={totalAusentes}
                label={`${totalAusentes} ${
                  totalAusentes > 1 ? 'Ausentes' : 'Ausente'
                } `}
                max={total}
              />
            </ProgressBar>
          )}
        </Stack>
        {data.map((item: any) => (
          <LinhaZona
            key={Math.random()}
            titulo={`Zona ${item.Zona} (${item.Andar}º Aandar)`}
            presentes={item.brigadistas_presentes}
            ausentes={item.brigadistas_ausentes}
            total={item.total_brigadistas}
          />
        ))}
      </DashBoardCoard>
    </Stack>
  )
}
