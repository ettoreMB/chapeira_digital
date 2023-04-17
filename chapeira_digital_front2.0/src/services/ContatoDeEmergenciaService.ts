import { AxiosInstance } from 'axios'
import { api } from './api'

export interface CriarContatoDeEmergenciaProps {
  lojaSigla?: string
  contato: string
  telefone: string
  descricao: string
}

class ContatoDeEmergenciaService {
  httpClient: AxiosInstance
  constructor() {
    this.httpClient = api
  }

  async listar(loja: string | string[] | undefined) {
    const { data } = await api.get(`/contatosEmergencia/${loja}`)
    return data
  }

  async buscar(id: string | string[] | undefined) {
    const { data } = await api.get(`/contatosEmergencia/contato/${id}`)
    return data
  }

  async criar(contatoDeEmergencia: CriarContatoDeEmergenciaProps) {
    await this.httpClient.post('/contatosEmergencia/', {
      lojaSigla: contatoDeEmergencia.lojaSigla,
      contato: contatoDeEmergencia.contato,
      telefone: contatoDeEmergencia.telefone,
      descricao: contatoDeEmergencia.descricao,
    })
  }

  async editar(
    id: string | string[] | undefined,
    contato: CriarContatoDeEmergenciaProps,
  ) {
    await api.put('/contatosEmergencia', {
      id,
      contato: contato.contato,
      telefone: contato.telefone,
      descricao: contato.descricao,
      endereco: '',
    })
  }

  async deletar(id: number) {
    await this.httpClient.delete(`/contatosEmergencia/${id}`)
  }
}

export default new ContatoDeEmergenciaService() as ContatoDeEmergenciaService
