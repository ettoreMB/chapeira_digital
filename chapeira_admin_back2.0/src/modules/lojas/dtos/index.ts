export interface CriarLojaDTO {
  Loja_Sigla: string
  Loja: string
  Loja_Endereco: string
  Loja_Cidade: string
  Loja_UF: string
  Loja_Telefone: string | null
  Responsavel: string
  Responsavel_Email: string
  Responsavel_Telefone: string
  CNPJ: number
}
export interface ReturnLojaDTO {
  id: number
  ativo: string
  sigla: string
  loja: string
  endereco: string
  cidade: string
  UF: string
  telefone?: string
  pastaWEB?: string
  URL?: string
  horario: string
  responsavel: string
  responsavelEmail: string
  responsavelTelefone: string | null
}

export interface EditarLojaDTO {
  Loja_Endereco: string | null
  Loja_Telefone: string | null
  Loja_Horario: string | null
  Loja_Cidade: string | null
}
