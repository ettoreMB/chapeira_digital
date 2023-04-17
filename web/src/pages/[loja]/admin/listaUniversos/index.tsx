import Link from 'next/link'

import Button from '@/components/Button'
import TableHead from '@/components/Table/TableHead'
import { TDiv } from '@/components/Table/TDiv'
import { TRow } from '@/components/Table/TRow'
import Layout from '@/layout'
import Loader from '@/components/Loader'
import BarraDePesquisa from '@/components/BarraDePesquisa'

import { FaRegEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa'
import { Table } from './styles'
import UseUniversos from '../../universos/useUniversos'

import Modal from '@/components/Modal'
import { useTheme } from 'styled-components'

export default function ListaUniversosAdmin() {
  const { colors } = useTheme()
  const {
    carregando,
    loja,
    router,
    busca,
    universosFiltrados,
    modalVisivel,
    handleBusca,
    handleFecharModal,
    handleDelete,
    handleAbrirModal,
  } = UseUniversos()

  return (
    <>
      <Layout botaoVoltar admin>
        {carregando ? (
          <Loader carregando={carregando} />
        ) : (
          <>
            <BarraDePesquisa
              onSearch={handleBusca}
              placeHolder="Digite o nome para realizar a busca"
              value={busca}
            >
              <Button
                onClick={() =>
                  router.push({
                    pathname: '/[loja]/admin/novoUniverso',
                    query: { loja },
                  })
                }
              >
                <FaPlus size={16} /> universo
              </Button>
            </BarraDePesquisa>
            <Table>
              <TableHead
                head={[
                  { nome: 'Universo' },
                  { nome: 'Andar', textAlign: 'center' },
                  { nome: 'Zona', textAlign: 'center' },
                  { nome: 'Ação', textAlign: 'center' },
                ]}
              />
              <tbody>
                {universosFiltrados.map((universo, index) => (
                  <TRow key={Math.random()} numero={index}>
                    <TDiv>{universo.Universo}</TDiv>
                    <TDiv width={1} textAlign="center">
                      {universo.Andar}
                    </TDiv>
                    <TDiv width={1} textAlign="center">
                      {universo.Zona}
                    </TDiv>
                    <TDiv width={1} textAlign="center">
                      <Link
                        href={`/${loja}/admin/${universo.Id}/editarUniverso`}
                      >
                        <FaRegEdit
                          size={22}
                          style={{ marginRight: '4px' }}
                          color={colors.sky['sky-600']}
                        />
                      </Link>
                      <FaRegTrashAlt
                        size={22}
                        color={colors.red}
                        onClick={() => handleAbrirModal(universo.Id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </TDiv>
                  </TRow>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Layout>
      <Modal
        deleteModal
        titulo="Excluir universo"
        visivel={modalVisivel}
        onDelete={handleFecharModal}
        onOk={handleDelete}
      >
        Essa ação deletara permanentemente o universo
      </Modal>
    </>
  )
}
