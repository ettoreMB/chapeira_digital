import Button from '@/components/Button'
import { Table } from '@/components/Table/Table'
import TableHead from '@/components/Table/TableHead'
import { TDiv } from '@/components/Table/TDiv'
import { TRow } from '@/components/Table/TRow'
import Layout from '@/layout'

import ListaVazia from '@/components/ListaVazia'

import { MdCheck, MdClose } from 'react-icons/md'
import { StatusBadge } from './styles'
import useListaColaboradores from '../../../hooks/useListaColaboradores'
import BarraDePesquisa from '@/components/BarraDePesquisa'
import CheckInButton from './components/CheckInButton'
import Modal from '@/components/Modal'
import { useTheme } from 'styled-components'
import { handleData } from '@/utils/tranformarData'

export default function ColaboradoresLista() {
  const {
    busca,
    colaboradorStatus,
    colaboradoresFiltrados,
    carregando,
    erro,
    modalVisiviel,
    colaboradorModal,
    estaSalvando,
    router,
    handleCheckIn,
    handleBusca,
    handleColaboradorStatusFiltro,
    handleFecharModal,
  } = useListaColaboradores()
  const { colors } = useTheme()
  const temColaboradores = colaboradoresFiltrados.length > 0
  const listaVazia = !carregando && !temColaboradores

  const paginaTitulo = () => {
    const { tipo } = router.query
    if (tipo) {
      if (tipo === 'Terceiro') {
        return 'Serviço'
      }
      return tipo
    }

    return 'Colaborador'
  }
  return (
    <>
      <Layout
        botaoVoltar
        carregando={carregando}
        erroCarregar={erro}
        tituloPagina={`Check In/Out ${paginaTitulo()}`}
      >
        <BarraDePesquisa
          placeHolder="Digite o nome para realizar a busca"
          onSearch={handleBusca}
          value={busca}
          disabled={!!colaboradorStatus}
        >
          <Button
            type="button"
            value="Presente"
            active={colaboradorStatus === 'Presente'}
            onClick={handleColaboradorStatusFiltro}
          >
            Presentes
          </Button>
          <Button
            danger
            value="Ausente"
            active={colaboradorStatus === 'Ausente'}
            onClick={handleColaboradorStatusFiltro}
          >
            Ausentes
          </Button>
        </BarraDePesquisa>
        {temColaboradores && (
          <>
            {temColaboradores && (
              <>
                <Table>
                  <TableHead
                    head={[
                      { nome: 'Status', textAlign: 'center' },
                      { nome: 'Nome' },
                      { nome: 'Ação', textAlign: 'center' },
                    ]}
                  />

                  <tbody>
                    {colaboradoresFiltrados?.map((usuario, index) => (
                      <TRow key={Math.random()} numero={index}>
                        <TDiv width={12}>
                          <StatusBadge status={usuario.Status}>
                            {usuario.Status === 'Presente' ? (
                              <MdCheck
                                size={30}
                                color={`${colors.sky['sky-500']}`}
                              />
                            ) : (
                              <MdClose size={30} color={'red'} />
                            )}

                            <span>{usuario.Status}</span>
                          </StatusBadge>
                        </TDiv>
                        <TDiv>{usuario.Nome}</TDiv>
                        <TDiv width={12}>
                          <CheckInButton
                            status={usuario?.Status}
                            estaCarregando={estaSalvando}
                            onHandleCheckIn={() => handleCheckIn(usuario)}
                          />
                        </TDiv>
                      </TRow>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </>
        )}
        {listaVazia && (
          <ListaVazia
            mensagem={
              colaboradorStatus === ''
                ? `Nehum ${paginaTitulo()} nesta lista`
                : `Nehum ${paginaTitulo()} ${colaboradorStatus}`
            }
          />
        )}
      </Layout>
      <Modal
        titulo={`${
          colaboradorModal?.status === 'Presente'
            ? 'Até logo'
            : 'Seja bem vindo'
        } ${colaboradorModal?.nome}`}
        visivel={modalVisiviel}
        onOk={handleFecharModal}
      >
        <h3>{`${
          colaboradorModal?.status === 'Presente' ? 'Check Out' : 'Check In'
        } Realizado com sucesso`}</h3>
        <p>{colaboradorModal?.nome}</p>
        <p>{colaboradorModal?.universo}</p>
        <p>{handleData.criarData()}</p>
      </Modal>
    </>
  )
}
