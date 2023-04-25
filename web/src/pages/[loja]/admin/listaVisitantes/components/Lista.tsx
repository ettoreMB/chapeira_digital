import { FaPlus, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'

import TableHead from '@/components/Table/TableHead'
import { Table } from '@/components/Table/Table'
import { TRow } from '@/components/Table/TRow'
import { TDiv } from '@/components/Table/TDiv'

import Button from '@/components/Button'

import useListaColaboradores from '@/hooks/useListaColaboradores'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BarraDePesquisa from '@/components/BarraDePesquisa'
import { useTheme } from 'styled-components'
import Modal from '@/components/Modal'

export default function Lista() {
  const router = useRouter()
  const { colors } = useTheme()
  const {
    colaboradoresFiltrados,
    busca,
    loja,
    colaboradorStatus,
    modalVisiviel,
    handleFecharModal,
    handleAbrirModal,
    handleBusca,
    handleColaboradorStatusFiltro,
    handleDelete,
  } = useListaColaboradores()

  return (
    <>
      <BarraDePesquisa
        onSearch={handleBusca}
        placeHolder="Digite o nome para realizar a busca"
        value={busca}
      >
        <Button
          type="button"
          width={16}
          value="Presente"
          active={colaboradorStatus === 'Presente'}
          onClick={handleColaboradorStatusFiltro}
        >
          Presentes
        </Button>
        <Button
          width={16}
          danger
          value="Ausente"
          active={colaboradorStatus === 'Ausente'}
          onClick={handleColaboradorStatusFiltro}
        >
          Ausentes
        </Button>
        <Button
          width={16}
          onClick={() =>
            router.push({
              pathname: '/[loja]/admin/novoColaborador',
              query: { loja },
            })
          }
        >
          <FaPlus size={16} /> Colaborador
        </Button>
      </BarraDePesquisa>

      <Table>
        <TableHead
          head={[
            { nome: 'Nome' },
            { nome: 'Universo' },
            { nome: 'Acao', textAlign: 'center' },
          ]}
        />

        {colaboradoresFiltrados?.map((usuario, index) => (
          <TRow key={Math.random()} numero={index}>
            <TDiv>{usuario.Nome}</TDiv>
            <TDiv width={25}>
              {usuario.tb_universos
                ? usuario.tb_universos?.Universo
                : 'SEM UNIVERSO'}
            </TDiv>
            <TDiv textAlign="center">
              <Link href={`/${loja}/admin/${usuario.Id}/editarColaborador`}>
                <FaRegEdit
                  size={22}
                  style={{ marginRight: '4px' }}
                  color={colors.sky['sky-600']}
                />
              </Link>
              <FaRegTrashAlt
                size={22}
                color={colors.red}
                onClick={() => handleAbrirModal(usuario.Id)}
                style={{ cursor: 'pointer' }}
              />
            </TDiv>
          </TRow>
        ))}
      </Table>
      <Modal
        titulo="Titulo"
        deleteModal
        onDelete={handleFecharModal}
        onOk={handleDelete}
        visivel={modalVisiviel}
      >
        <span>Deseja Desativar o colaborador ?</span>
        <span>
          Essa ação pode ser revertida etrando em contato com nosso suporte
        </span>
      </Modal>
    </>
  )
}
