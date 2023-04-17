import EventManager from '@/lib/EventManager'

interface ToastProps {
  type: 'success' | 'danger' | 'default'
  text: string
  duration?: number
}

export const toastEventManager = new EventManager()

export default function toast({ text, type, duration }: ToastProps) {
  toastEventManager.emit('addToast', {
    type,
    text,
    duration,
  })
}
