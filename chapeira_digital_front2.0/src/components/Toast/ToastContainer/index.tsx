import { useCallback, useEffect, useState } from 'react'

import ToastMessage from '../ToastMessage'
import { Container } from './styles'
import { toastEventManager } from '@/utils/toast'

interface ToastInputProps {
  type: 'default' | 'danger' | 'success'
  text: string
  duration?: number
}

interface MessageProps extends ToastInputProps {
  id: number
}

export default function ToastContainer() {
  const [messages, setMessages] = useState<MessageProps[]>([])

  useEffect(() => {
    function handleAddToast({ type, text, duration }: ToastInputProps) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
          duration,
        },
      ])
    }
    toastEventManager.on('addToast', handleAddToast)

    return () => {
      toastEventManager.removeListener('addToast', handleAddToast)
    }
  }, [])

  const handleRemoveMessage = useCallback((id: number) => {
    setMessages((prevState) => prevState.filter((message) => message.id !== id))
  }, [])

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  )
}
