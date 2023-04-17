export interface CriarUniversoDTO {
  id?: number
  Loja_Sigla: string
  Zona: string
  Andar: string
  Universo: string
}

export interface EditarUniversoDTO {
  id: number
  Universo: string
  Zona: string
  Andar: string
}
