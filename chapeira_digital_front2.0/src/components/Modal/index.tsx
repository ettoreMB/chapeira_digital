import { ReactNode } from 'react'
import { Container, Footer, Overlay } from './styles'
import Button from '../Button'
import useAnimatedUnmount from '@/hooks/useAnimatedUnMount'
import ReactPortal from '../ReactPortal'

interface ModalProps {
  titulo: string
  children: ReactNode
  visivel: boolean
  onOk?: () => void
  deleteModal?: boolean
  onDelete?: () => void
}

export default function Modal({
  titulo,
  children,
  visivel,
  onOk,
  deleteModal = false,
  onDelete,
}: ModalProps) {
  const { animatedElementRef, shouldRender } = useAnimatedUnmount(visivel)
  if (!shouldRender) {
    return null
  }
  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visivel} ref={animatedElementRef}>
        <Container isLeaving={!visivel}>
          <h1>{titulo}</h1>
          <div className="modal-body">{children}</div>
          <Footer>
            <Button type="button" onClick={onOk} width={100}>
              Ok
            </Button>
            {deleteModal && (
              <Button danger type="button" onClick={onDelete} width={100}>
                Cancelar
              </Button>
            )}
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  )
}
