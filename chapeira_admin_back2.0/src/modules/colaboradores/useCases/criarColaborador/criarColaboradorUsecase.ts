import { CriarColaboradorInputDTO } from '@modules/colaboradores/dto'
import { IColaboradorRepository } from '@modules/colaboradores/repositories/IColaboradoRepository'
import { tb_Colaboradores } from '@prisma/client'

import { AppErrors } from '@shared/errors/AppErros'

export class CriarColaboradorUsecase {
  constructor(private colaboradorRepository: IColaboradorRepository) {}

  async execute({
    Loja_Sigla,
    Nome,
    Email,
    Tipo,
    Endereco,
    Telefone,
    Id_Universo,
    Funcao,
    Empresa,
    Administrador,
    Brigadista,
    Formacao_Data,
    Admissao_Data,
    Observacao,
  }: CriarColaboradorInputDTO): Promise<tb_Colaboradores> {
    const emailExiste = await this.colaboradorRepository.buscarPorEmail(
      String(Email),
    )

    if (emailExiste?.Email === Email && emailExiste.Loja_Sigla === Loja_Sigla) {
      throw new AppErrors('Email já cadastrado nesta loja', 400)
    }

    try {
      const colaborador = await this.colaboradorRepository.criar({
        Loja_Sigla,
        Nome,
        Email,
        Tipo,
        Endereco,
        Telefone,
        Id_Universo,
        Funcao,
        Empresa,
        Administrador,
        Brigadista,
        Formacao_Data,
        Admissao_Data,
        Observacao,
      })

      return colaborador
    } catch (error) {
      throw new AppErrors('Erro ao cadastrar colaborador', 500)
    }
  }
}
