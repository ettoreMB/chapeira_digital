"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/modules/lojas/infra/prisma/lojaRepository.ts
var lojaRepository_exports = {};
__export(lojaRepository_exports, {
  LojaRepository: () => LojaRepository
});
module.exports = __toCommonJS(lojaRepository_exports);
var import_client2 = require("@prisma/client");

// src/db/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["error", "warn"]
});

// src/modules/lojas/infra/prisma/lojaRepository.ts
var repository = prisma.tb_Lojas;
var LojaRepository = class {
  async buscarPorCnpj(cnpj) {
    const loja = await repository.findFirst({
      where: {
        CNPJ: cnpj
      }
    });
    return loja;
  }
  async criar({
    Loja_Sigla,
    Loja,
    Loja_Endereco,
    Loja_Cidade,
    Loja_UF,
    Loja_Telefone,
    Responsavel,
    Responsavel_Email,
    Responsavel_Telefone,
    CNPJ
  }) {
    const loja = await repository.create({
      data: {
        CNPJ,
        Ativo: "Sim",
        Loja,
        Loja_Sigla,
        Loja_Endereco,
        Loja_Cidade,
        Loja_UF,
        Loja_Telefone,
        Razao_Social: "IGUASPORT LTDA",
        Responsavel,
        Pasta_WEB: `${Loja_UF}-${Loja}`,
        Responsavel_Email,
        Responsavel_Telefone,
        Adm_Email: Responsavel_Email,
        Faturamento_Responsavel: Responsavel,
        Faturamento_Email: Responsavel_Email,
        Faturamento_Telefone: Responsavel_Telefone
      }
    });
    return loja;
  }
  async editar(data) {
    const loja = await repository.update({
      where: {
        Id: data.Id
      },
      data: {
        Loja_Endereco: data.Loja_Endereco,
        Loja_Cidade: data.Loja_Cidade,
        Loja_Telefone: data.Loja_Telefone,
        Loja_Horario: data.Loja_Horario
      }
    });
    return loja;
  }
  async deletar(id) {
    await repository.update({
      where: {
        Id: id
      },
      data: {
        Ativo: "Nao"
      }
    });
  }
  async buscarPorSiglaOuNome(loja) {
    const resultado = await repository.findFirst({
      where: {
        OR: [
          {
            Loja_Sigla: loja
          },
          {
            Pasta_WEB: loja
          }
        ]
      }
    });
    return resultado;
  }
  async buscarPorId(id) {
    const loja = await repository.findFirst({
      where: {
        Id: id
      }
    });
    return loja;
  }
  async listar() {
    const lojas = await prisma.tb_Lojas.findMany({
      where: {
        Ativo: "Sim"
      },
      orderBy: {
        Loja: "asc"
      }
    });
    return lojas;
  }
  async dashBoard(sigla) {
    const result = await prisma.$queryRaw(
      import_client2.Prisma.sql`select 
      tbc.Loja_Sigla,
      tbu.Universo,
      tbu.Zona,
      tbu.Andar,
      sum( case when tbc.Tipo = 'Colaborador' OR tbc.Tipo = 'Brigadista' then 1 else 0 end) as total_colaboradores,
      sum( case when tbc.Tipo = 'Colaborador' OR tbc.Brigadista = 'Nao' then 1 else 0 end) as total_colaboradores_nao_brigadistas,
      sum( case when tbc.Tipo = 'Colaborador' OR tbc.Tipo ='Brigadista' AND tbc.Status = 'Presente' then 1 else 0 end) as colaboradores_presentes,
      sum( case when tbc.Tipo = 'Colaborador' AND tbc.Status = 'Ausente' then 1 else 0 end) as colaboradores_ausentes,
      sum( case when tbc.Brigadista = 'Sim'  then 1 else 0 end) as total_brigadistas,
      sum( case when tbc.Brigadista = 'Sim' AND tbc.Status = 'Presente' then 1 else 0 end) as brigadistas_presentes,
      sum( case when tbc.Brigadista = 'Sim' AND tbc.Status = 'Ausente' then 1 else 0 end) as brigadistas_ausentes,
      sum( case when tbc.Tipo = 'Visitante' then 1 else 0 end) as total_visitantes,
      sum( case when tbc.Tipo = 'Visitante'AND tbc.Status =  'Presente' then 1 else 0 end) as total_visitantes_presentes,
      sum( case when tbc.Tipo = 'Visitante'AND tbc.Status =  'Ausente' then 1 else 0 end) as total_visitante_ausentes,
      sum( case when tbc.Tipo = 'Terceiro' then 1 else 0 end) as total_terceiros,
      sum( case when tbc.Tipo = 'Terceiro'AND tbc.Status =  'Presente' then 1 else 0 end) as total_terceiros_presentes,
      sum( case when tbc.Tipo = 'Terceiro'AND tbc.Status =  'Ausente' then 1 else 0 end) as total_terceiros_ausentes
      from tb_Colaboradores as tbc
      left join tb_Universos as tbu
        on tbu.Id = tbc.Id_Universo
      where tbc.Loja_Sigla = ${sigla} AND tbc.Ativo = 'Sim'
      group by tbu.Zona, tbc.Loja_Sigla,tbu.Andar,tbu.Universo ;`
    );
    return result;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LojaRepository
});
