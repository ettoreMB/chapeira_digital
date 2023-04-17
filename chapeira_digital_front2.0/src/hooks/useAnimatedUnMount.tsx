import { useEffect, useRef, useState } from 'react'

export default function useAnimatedUnMount(visible: boolean) {
  const [shouldRender, setShouldRender] = useState(visible)
  const animatedElementRef = useRef<any>(null)

  useEffect(() => {
    function handleAnimantionEnd() {
      setShouldRender(false)
    }

    if (visible) {
      setShouldRender(true)
    }

    const emelementRef = animatedElementRef.current

    if (!visible && emelementRef) {
      animatedElementRef.current.addEventListener('animationend', () =>
        setShouldRender(false),
      )
    }

    return () => {
      if (emelementRef) {
        emelementRef.removeEventListener('animationend', handleAnimantionEnd)
      }
    }
  }, [visible])

  return {
    shouldRender,
    animatedElementRef,
  }
}
