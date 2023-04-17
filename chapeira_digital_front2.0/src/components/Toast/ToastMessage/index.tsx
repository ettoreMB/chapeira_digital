import { useEffect } from 'react'
import { Container } from './styles'
import { MdCheck, MdClose } from 'react-icons/md'

interface Props {
  message: {
    id: number
    type: string
    text: string
    duration?: number
  }

  onRemoveMessage: (id: number) => void
}
export default function ToastMessage({ message, onRemoveMessage }: Props) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id)
    }, message.duration || 5000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [message.id, onRemoveMessage, message.duration])

  function handleRemoveToast() {
    onRemoveMessage(message.id)
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {message.type === 'danger' && <MdClose />}
      {message.type === 'success' && <MdCheck />}
      <strong>{message.text}</strong>
    </Container>
  )
}
