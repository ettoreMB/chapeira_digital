export interface ColaboradorResponseDto {
  Id: number | null
  Ativo: string | null
  Loja_Sigla: string | null
  Nome: string | null
  Tipo: string | null
  Empresa: string | null
  Brigadista: string | null
  Formacao_Data: string | null
  Observacao: string | null
  Administrador: string | null
  Status: string | null
  CheckIn: string | null
  CheckIn_Date: string | null
  CheckIn_Status: string | null
  tb_universos: {
    Id: number | null
    Universo: string | null
  }
}

export interface ColaboradorCheckInInputDto {
  checkIn: number | null
  status: 'Presente' | 'Ausente'
  checkInStatus: 'Presente' | 'Ausente'
  checkInDate: Date
  acao: 'Chek In' | 'Chek Out'
  cor: 'success' | 'Danger'
  ip: string
  browser: string
}

export interface CriarColaboradorInputDTO {
  Loja_Sigla: string
  Nome: string
  Email: string | null
  Tipo: string
  Endereco: string | null
  Telefone: string | null
  Id_Universo: number
  Funcao: string | null
  Empresa: string | null
  Administrador: string
  Brigadista: string | null
  Senha?: string | null
  Formacao_Data: string | null | undefined
  Admissao_Data: string | null | undefined
  Observacao: string | null
}

export interface DesativarColaboradorDto {
  Ativo: string
  Id_Universo: null
  Administrador: string
  CheckIn: 0
  Status: string
  CheckIn_Status: string
  Senha: string
  Acao: string
  Cor: string
}
