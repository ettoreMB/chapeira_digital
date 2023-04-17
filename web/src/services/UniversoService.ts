import { AxiosInstance } from 'axios'
import { api } from './api'

export interface CriarUniversoProps {
  zona: string
  andar: string
  universoNome: string
}

class UniversoService {
  httpClient: AxiosInstance
  constructor() {
    this.httpClient = api
  }

  async listarUniversos(loja: string | string[] | undefined) {
    const { data } = await api.get(`/universos/${loja}`)
    return data
  }

  async buscarUniverso(id: string | string[] | undefined) {
    const { data } = await api.get(`/universos/universo/${id}`)
    return data
  }

  async criarUniverso(lojaSigla: string, universo: CriarUniversoProps) {
    await api.post('/universos', {
      lojaSigla,
      universo: universo.universoNome,
      zona: universo.zona,
      andar: universo.andar,
    })
  }

  async editarUniverso(id: number, universo: CriarUniversoProps) {
    await api.put('/universos/editar', {
      id,
      universo: universo.universoNome,
      zona: universo.zona,
      andar: universo.andar,
    })
  }

  async deletar(id: number) {
    await this.httpClient.delete(`/universos/${id}`)
  }
}

export default new UniversoService() as UniversoService
