import Layout from '@/layout'
import { FrameContainer } from './styles'

export default function Relatorio() {
  return (
    <Layout botaoVoltar>
      <FrameContainer>
        <iframe
          src="https://app.powerbi.com/view?r=eyJrIjoiOTNhMDc2MTAtMjM2OC00MzU1LWJkNGMtNzIxMjllZTIwZWFkIiwidCI6Ijc2YjM2MTMwLTMzZjUtNGY2MC05NWVmLTg0MzlmOTQ4NmNmZiJ9"
          width={'100%'}
          height={'100%'}
          allowFullScreen
        />
      </FrameContainer>
    </Layout>
  )
}
