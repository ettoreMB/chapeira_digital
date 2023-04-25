import Layout from '@/layout'

import Lista from './components/Lista'
import useListaColaboradores from '../../../../hooks/useListaColaboradores'

export default function ListaColaboradoresAdmin() {
  const { carregando } = useListaColaboradores()
  return (
    <>
      <Layout botaoVoltar admin carregando={carregando}>
        <Lista />
      </Layout>
    </>
  )
}
