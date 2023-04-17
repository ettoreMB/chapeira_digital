import { calcularPercentual } from '@/utils/calculaPorcentagem'
import { Card, InputGroup } from 'react-bootstrap'
import Stack from 'react-bootstrap/Stack'

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
    <Card className="col  my-2">
      <Card.Title className={`bg-${bg} text-center text-white card-header`}>
        {titulo}
      </Card.Title>
      <Card.Body>
        <Stack>
          <Stack direction="horizontal">
            <div className="flex-fill p-2 border">Total</div>
            <InputGroup.Text
              className={`input-group-text ms-auto border bg-${bg} text-white`}
            >
              {total}
            </InputGroup.Text>
          </Stack>
          <Stack direction="horizontal">
            <div className="flex-fill p-2 border">Presentes</div>
            <InputGroup.Text className="input-group-text ms-auto border bg-success text-white">
              {calcularPercentual(presentes, total)}
            </InputGroup.Text>
            <InputGroup.Text className="input-group-text  border bg-success text-white">
              {presentes}
            </InputGroup.Text>
          </Stack>
          <Stack direction="horizontal">
            <div className="flex-fill p-2 border">Ausentes</div>
            <InputGroup.Text className="input-group-text ms-auto border bg-light">
              {calcularPercentual(ausentes, total)}
            </InputGroup.Text>
            <InputGroup.Text className="input-group-text  border bg-light">
              {ausentes}
            </InputGroup.Text>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  )
}
