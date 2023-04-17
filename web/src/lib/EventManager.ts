export default class EventManager {
  private listeners: any
  constructor() {
    this.listeners = new Map<string, Function[]>()
  }

  on(event: string, listener: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)?.push(listener)
  }

  emit(event: string, payload: any): void {
    if (!this.listeners.has(event)) {
      return
    }

    this.listeners.get(event)?.forEach((listener: any) => {
      listener(payload)
    })
  }

  removeListener(event: string, listenerToRemove: Function) {
    const listeners = this.listeners.get(event)
    if (!listeners) {
      return
    }

    const filteredListeners = listeners.filter(
      (listener: any) => listener !== listenerToRemove,
    )

    this.listeners.set(event, filteredListeners)
  }
}
