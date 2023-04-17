import Spinner from '@/components/Spinner'
import { Button } from './styles'

interface CheckinButtonProps {
  status: string
  onHandleCheckIn: () => Promise<void>
  estaCarregando?: boolean
}

export default function CheckInButton({
  status,
  onHandleCheckIn,
  estaCarregando = false,
}: CheckinButtonProps) {
  return (
    <Button status={status} onClick={onHandleCheckIn} disabled={estaCarregando}>
      {estaCarregando ? (
        <Spinner size={16} />
      ) : status === 'Presente' ? (
        'CheckOut'
      ) : (
        'CheckIn'
      )}
      {}
    </Button>
  )
}
