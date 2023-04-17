import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ReactPotalProps {
  containerId: string
  children: ReactNode
}

export default function ReactPortal({
  containerId,
  children,
}: ReactPotalProps) {
  // if (typeof window === 'undefined') {
  //   return null
  // }
  // let container = document.getElementById(containerId)
  // if (!container) {
  //   container = document.createElement('div')
  //   container.setAttribute('id', containerId)
  //   document.body.appendChild(container)
  // }

  // return createPortal(children, container)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(children, document.querySelector<any>(`#${containerId}`))
    : null
}
