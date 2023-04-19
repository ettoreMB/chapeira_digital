import { calcularPercentual } from '@/utils/calculaPorcentagem'
import { Card, InputGroup } from 'react-bootstrap'
import { Stack } from '../../styles'

interface PresentesAusentesProps {
  titulo: string
  bg: string
  presentes: number
  ausentes: number
}
export default function PresentesAusentes({
  titulo,
  bg,
  presentes,
  ausentes,
}: PresentesAusentesProps) {
  const total = presentes + ausentes

  return (
    <Card className="col" style={{ minWidth: '390px', marginRight: '4px' }}>
      <Card.Title className={`bg-${bg} text-center text-white card-header`}>
        {titulo}
      </Card.Title>
      <Card.Body>
        <Stack>
          <div className="row my-2">
            <div className="border col-11">Total</div>
            <div className="col-1 p-0">
              <InputGroup.Text
                className={`input-group-text border bg-${bg} text-white justify-content-center `}
              >
                {total}
              </InputGroup.Text>
            </div>
          </div>

          <div className="row my-2">
            <div className="border col-10">Presentes</div>
            <div className="col-1 p-0">
              <InputGroup.Text className="input-group-text border bg-success text-white justify-content-center">
                {calcularPercentual(presentes, total)}
              </InputGroup.Text>
            </div>
            <div className="col-1  p-0">
              <InputGroup.Text className="input-group-text  border bg-success text-white justify-content-center">
                {presentes}
              </InputGroup.Text>
            </div>
          </div>

          <div className="row">
            <div className="border col-10">Ausentes</div>
            <div className="col-1 p-0">
              <InputGroup.Text className="input-group-text ms-auto border bg-success text-white justify-content-center">
                {calcularPercentual(ausentes, total)}
              </InputGroup.Text>
            </div>
            <div className="col-1 p-0">
              <InputGroup.Text className="input-group-text  border bg-success text-white justify-content-center">
                {ausentes}
              </InputGroup.Text>
            </div>
          </div>

          {/* <Stack direction="row">
            <div className="flex-fill p-2 border">Ausentes</div>
            <InputGroup.Text className="input-group-text ms-auto border bg-light">
              {calcularPercentual(ausentes, total)}
            </InputGroup.Text>
            <InputGroup.Text className="input-group-text  border bg-light">
              {ausentes}
            </InputGroup.Text>
          </Stack> */}
        </Stack>
      </Card.Body>
    </Card>
  )
}
