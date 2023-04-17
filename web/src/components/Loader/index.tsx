import useAnimatedUnMount from '@/hooks/useAnimatedUnMount'
import Spinner from '../Spinner'
import { Container, Overlay } from './styles'
import ReactPortal from '../ReactPortal'

interface LoaderProps {
  carregando: boolean
}

export default function Loader({ carregando }: LoaderProps) {
  const { animatedElementRef, shouldRender } = useAnimatedUnMount(carregando)
  if (!shouldRender) {
    return null
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay isLeaving={!carregando} ref={animatedElementRef}>
        <Container isLeaving={!carregando}>
          <Spinner size={90} />
        </Container>
      </Overlay>
    </ReactPortal>
  )
}
