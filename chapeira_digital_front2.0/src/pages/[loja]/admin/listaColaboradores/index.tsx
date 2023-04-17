import Layout from '@/layout'

import Lista from './components/Lista'
import UseListaColaboradores from '../../listaColaboradores/useListaColaboradores'
import Loader from '@/components/Loader'

export default function ListaColaboradoresAdmin() {
  const { carregando } = UseListaColaboradores()
  return (
    <>
      <Layout botaoVoltar admin>
        {carregando ? <Loader carregando={carregando} /> : <Lista />}
      </Layout>
    </>
  )
}
