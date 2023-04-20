import { Table } from '@/components/Table/Table'
import TableHead from '@/components/Table/TableHead'
import { TDiv } from '@/components/Table/TDiv'
import { TRow } from '@/components/Table/TRow'
import Layout from '@/layout'

import { useRouter } from 'next/router'
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'

import { FaPlus, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { Container } from './styles'
import Link from 'next/link'
import Button from '@/components/Button'
import { useTheme } from 'styled-components'
import BarraDePesquisa from '@/components/BarraDePesquisa'
import ContatoDeEmergenciaService from '@/services/ContatoDeEmergenciaService'

import Modal from '@/components/Modal'
import toast from '@/utils/toast'

interface ContatosProps {
  Id: number
  Telefone: string
  Descricao: string
}

export default function ListaContatosDeEmergenciaAdmin() {
  const router = useRouter()
  const { colors } = useTheme()
  const { loja } = router.query
  const [busca, setBusca] = useState('')
  const [contatos, setContatos] = useState<ContatosProps[]>([])
  const [modalVisivel, setModalVisivel] = useState(false)
  const [idParaDeletar, setIdParadeletar] = useState<number>(0)
  const contatosFiltrados = useMemo(
    () =>
      contatos.filter((colaborador) =>
        colaborador.Descricao.toLowerCase().includes(busca.toLocaleLowerCase()),
      ),
    [contatos, busca],
  )
  const loadContatos = useCallback(async () => {
    const contatos = await ContatoDeEmergenciaService.listar(loja)
    return setContatos(contatos)
  }, [loja])

  function handleBusca(e: FormEvent<HTMLInputElement>) {
    setBusca(e.currentTarget.value)
  }

  async function handleDeletar() {
    try {
      await ContatoDeEmergenciaService.deletar(idParaDeletar)
      toast({ type: 'success', text: 'contato deletado com sucesso' })
      loadContatos()
      setModalVisivel(false)
    } catch {
      toast({ type: 'danger', text: 'erro ao deletar o contato' })
      setModalVisivel(false)
    }
  }

  function handleAbrirModal(id: number) {
    setModalVisivel(true)
    setIdParadeletar(id)
  }
  function handleFecharModal() {
    setModalVisivel(false)
  }
  useEffect(() => {
    if (loja) {
      loadContatos()
    }

    return () => {}
  }, [loja, loadContatos])
  return (
    <>
      <Layout botaoVoltar admin>
        <Container>
          <BarraDePesquisa
            placeHolder="Digite o nome para realizar a busca"
            onSearch={handleBusca}
            value={busca}
          >
            <Button
              onClick={() =>
                router.push({
                  pathname: '/[loja]/admin/novoContatoDeEmergencia',
                  query: { loja },
                })
              }
            >
              <FaPlus size={16} /> Contato
            </Button>
          </BarraDePesquisa>
          <Table>
            <TableHead
              head={[
                { nome: 'Nome' },
                { nome: 'Telefone' },
                { nome: 'Ação', textAlign: 'center' },
              ]}
            />
            <tbody>
              {contatosFiltrados?.map((contato, index) => (
                <TRow key={Math.random()} numero={index}>
                  <TDiv>{contato.Descricao}</TDiv>
                  <TDiv>{contato.Telefone}</TDiv>
                  <TDiv textAlign="center">
                    <Link
                      href={`/${loja}/admin/${contato.Id}/editarContatoEmergencia`}
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
                      onClick={() => handleAbrirModal(contato.Id)}
                      style={{ cursor: 'pointer' }}
                    />
                  </TDiv>
                </TRow>
              ))}
            </tbody>
          </Table>
        </Container>
      </Layout>
      <Modal
        deleteModal
        titulo="deletar"
        visivel={modalVisivel}
        onDelete={handleFecharModal}
        onOk={handleDeletar}
      >
        Essa ação deletara permanentemente o contato de emergência
      </Modal>
    </>
  )
}
