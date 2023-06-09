import { MdCheck, MdClose } from 'react-icons/md'
import { BsFillCircleFill } from 'react-icons/bs'
import { FaPlus, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'

import TableHead from '@/components/Table/TableHead'
import { Table } from '@/components/Table/Table'
import { TRow } from '@/components/Table/TRow'
import { TDiv } from '@/components/Table/TDiv'

import { StatusBadge } from './styles'
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

    modalVisiviel,
    handleFecharModal,
    handleAbrirModal,
    handleBusca,

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
            { nome: 'Status' },
            { nome: 'Brigadista' },
            { nome: 'ADM' },
            { nome: 'Universo' },
            { nome: 'Acao', textAlign: 'center' },
          ]}
        />

        {colaboradoresFiltrados?.map((usuario, index) => (
          <TRow key={Math.random()} numero={index}>
            <TDiv>{usuario.Nome}</TDiv>
            <TDiv width={12}>
              <StatusBadge status={usuario.Status}>
                <BsFillCircleFill
                  color={usuario.Status === 'Presente' ? 'green' : 'red'}
                />
                <span>{usuario.Status}</span>
              </StatusBadge>
            </TDiv>
            <TDiv width={5} textAlign="center">
              {usuario.Brigadista === 'Sim' ? (
                <MdCheck size={32} color={'green'} />
              ) : (
                <MdClose size={32} color={'red'} />
              )}
            </TDiv>
            <TDiv width={5}>
              {usuario.Administrador === 'Sim' && (
                <MdCheck size={32} color={'green'} />
              )}
            </TDiv>
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
