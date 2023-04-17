import { AxiosInstance } from 'axios'
import { api } from './api'

export interface LojaInputProps {
  endereco: string
  telefone: string
  horario: string
  cidade: string
}

class LojaService {
  httpClient: AxiosInstance
  constructor() {
    this.httpClient = api
  }

  async buscarLoja(loja: string | string[] | undefined) {
    const { data } = await api.get(`/lojas/sigla/${loja}`)
    return data
  }

  async editarLoja(id: number | undefined, loja: LojaInputProps) {
    await api.put(`/lojas/editar/${id}`, {
      endereco: loja.endereco,
      horario: loja.horario,
      telefone: loja.telefone,
      cidade: loja.cidade,
    })
  }
}

export default new LojaService() as LojaService
