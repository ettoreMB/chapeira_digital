"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/shared/container/index.ts
var container_exports = {};
__export(container_exports, {
  diColaboradores: () => diColaboradores,
  diContatosEmergencia: () => diContatosEmergencia,
  diImagens: () => diImagens,
  diInvoices: () => diInvoices,
  diLojas: () => diLojas,
  diUniversos: () => diUniversos
});
module.exports = __toCommonJS(container_exports);
var import_awilix = require("@fastify/awilix");
var import_awilix2 = require("awilix");

// src/db/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["error", "warn"]
});

// src/modules/contatosDeEmergencia/infra/prisma/EmergenciContactsRepository.ts
var ContatosEmergenciaRepository = class {
  async buscarPorNomeELoja(lojaSigla, nome) {
    const contato = await prisma.tb_Contatos_Emergencia.findFirst({
      where: {
        Loja_Sigla: lojaSigla,
        AND: {
          Contato: nome
        }
      }
    });
    return contato;
  }
  async criar({
    Contato,
    Descricao,
    Telefone,
    Loja_Sigla
  }) {
    const contato = await prisma.tb_Contatos_Emergencia.create({
      data: {
        Contato,
        Descricao,
        Loja_Sigla,
        Telefone,
        Insert_Date: /* @__PURE__ */ new Date()
      }
    });
    return contato;
  }
  async buscarPorId(id) {
    const contato = await prisma.tb_Contatos_Emergencia.findUnique({
      where: {
        Id: id
      }
    });
    return contato;
  }
  async editar(contato) {
    const result = await prisma.tb_Contatos_Emergencia.update({
      where: {
        Id: contato.Id
      },
      data: {
        Contato: contato.Contato,
        Endereco: contato.Endereco,
        Telefone: contato.Telefone,
        Update_Date: /* @__PURE__ */ new Date(),
        Descricao: contato.Descricao
      }
    });
    return result;
  }
  async getAll(sigla) {
    const contacts = await prisma.tb_Contatos_Emergencia.findMany({
      where: { Loja_Sigla: sigla }
    });
    return contacts;
  }
  async deletar(id) {
    await prisma.tb_Contatos_Emergencia.delete({
      where: {
        Id: id
      }
    });
  }
};

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/contatosDeEmergencia/useCases/GetContatosPorLoja/BuscarContatosUseCase.ts
var BuscarContatosContatosUseCase = class {
  constructor(contatosEmergenciaRepository) {
    this.contatosEmergenciaRepository = contatosEmergenciaRepository;
  }
  async execute(sigla) {
    if (!sigla) {
      throw new AppErrors("Sigla da loja inv\xE1lida");
    }
    const contacts = await this.contatosEmergenciaRepository.getAll(sigla);
    return contacts;
  }
};

// src/modules/imagens/infra/prisma/repositories/ImagenRepository.ts
var ImagensRepository = class {
  async getImages(loja) {
    const images = await prisma.tb_Lojas_Imagens.findMany({
      where: {
        Loja_Sigla: loja
      }
    });
    return images;
  }
};

// src/modules/imagens/useCases/buscarImagens/buscarImagensUseCase.ts
var BuscarImagensUseCase = class {
  constructor(imagensRepository) {
    this.imagensRepository = imagensRepository;
  }
  async execute(loja) {
    const images = await this.imagensRepository.getImages(loja);
    const imagesResult = images.map((image) => {
      return {
        nome: image.Titulo,
        imageType: image.Tipo,
        src: Buffer.from(image.Imagem, "binary").toString("base64"),
        descricao: image.Descricao
      };
    });
    return imagesResult;
  }
};

// src/modules/lojas/infra/prisma/lojaRepository.ts
var import_client2 = require("@prisma/client");
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

// src/modules/lojas/useCases/listarLojas/listarLojasUsecase.ts
var ListarLojasUsecase = class {
  constructor(lojasRepository) {
    this.lojasRepository = lojasRepository;
  }
  async execute() {
    try {
      const lojas = await this.lojasRepository.listar();
      const lojasDto = lojas.map((loja) => {
        const response = {
          ativo: loja.Ativo,
          loja: loja.Loja,
          sigla: loja.Loja_Sigla,
          pastaWEB: loja.Pasta_WEB,
          cidade: loja.Loja_Cidade,
          endereco: loja.Loja_Endereco,
          UF: loja.Loja_UF,
          responsavel: loja.Responsavel,
          responsavelEmail: loja.Responsavel_Email,
          responsavelTelefone: loja.Responsavel_Telefone
        };
        return response;
      });
      return lojasDto;
    } catch (error) {
      console.error(error);
      throw new AppErrors("Erro ao listar as lojas", 500);
    }
  }
};

// src/modules/lojas/useCases/buscarLojaPorSiglaOuNome/buscarLojaPorSiglaOuNomeUsecase.ts
var BuscarLojaPorSiglaOuNomeUsecase = class {
  constructor(lojasRepository) {
    this.lojasRepository = lojasRepository;
  }
  async execute(sigla) {
    const loja = await this.lojasRepository.buscarPorSiglaOuNome(sigla);
    if (!loja) {
      throw new AppErrors("Loja n\xE3o encontrada no sistema", 404);
    }
    const resposta = {
      id: loja.Id,
      ativo: loja?.Ativo,
      loja: loja?.Loja,
      sigla: loja?.Loja_Sigla,
      pastaWEB: loja?.Pasta_WEB,
      URL: loja?.URL,
      cidade: loja?.Loja_Cidade,
      endereco: loja?.Loja_Endereco,
      telefone: loja?.Loja_Telefone,
      UF: loja?.Loja_UF,
      horario: loja.Loja_Horario,
      responsavel: loja?.Responsavel,
      responsavelEmail: loja?.Responsavel_Email,
      responsavelTelefone: loja?.Responsavel_Telefone
    };
    return resposta;
  }
};

// src/modules/universos/infra/prisma/universoRepository.ts
var import_node_crypto = require("crypto");
var db = prisma.tb_Universos;
var UniversoRepository = class {
  async deletar(id) {
    await db.delete({
      where: {
        Id: id
      }
    });
  }
  async editar(data) {
    const universo = await db.update({
      where: {
        Id: data.Id
      },
      data: {
        Universo: data.Universo,
        Zona: data.Zona,
        Andar: data.Andar
      }
    });
    return universo;
  }
  async buscarPorId(id) {
    const universo = await db.findFirst({
      where: {
        Id: id
      }
    });
    return universo;
  }
  async criar({ Loja_Sigla, Universo, Andar, Zona }) {
    const universo = await prisma.tb_Universos.create({
      data: {
        Id_Key: (0, import_node_crypto.randomUUID)(),
        Loja_Sigla,
        Universo,
        Andar,
        Zona,
        Insert_Date: /* @__PURE__ */ new Date(),
        Update_Date: null,
        Update_User: null,
        Insert_User: null
      }
    });
    return universo;
  }
  async buscarUniversosPorLoja(sigla) {
    const universos = await db.findMany({
      where: {
        Loja_Sigla: sigla
      }
    });
    return universos;
  }
  async buscarUniversoPorNomeELoja(nome, lojaSigla) {
    const universo = await db.findFirst({
      where: {
        Loja_Sigla: lojaSigla,
        AND: {
          Universo: nome
        }
      }
    });
    return universo;
  }
};

// src/modules/universos/useCases/listarUniversosPorLoja/listarUniversosPorLojaUsecase.ts
var ListarUniversosPorLojaUsecase = class {
  constructor(universosRepository, lojasRepository) {
    this.universosRepository = universosRepository;
    this.lojasRepository = lojasRepository;
  }
  async execute(nome) {
    const loja = await this.lojasRepository.buscarPorSiglaOuNome(nome);
    if (!loja) {
      throw new AppErrors(`A loja ${loja} n\xE3o est\xE1 registrada no sistema`);
    }
    const universos = await this.universosRepository.buscarUniversosPorLoja(
      loja.Loja_Sigla
    );
    return universos;
  }
};

// src/modules/universos/useCases/criarUniverso/criarUniversoUsecase.ts
var CriarUniversoUsecase = class {
  constructor(universoRepository) {
    this.universoRepository = universoRepository;
  }
  async execute(data) {
    const universoExiste = await this.universoRepository.buscarUniversoPorNomeELoja(
      data.Universo,
      data.Loja_Sigla
    );
    if (universoExiste) {
      throw new AppErrors("Universo j\xE1 cadastrado nesta loja", 409);
    }
    const universo = await this.universoRepository.criar({
      Loja_Sigla: data.Loja_Sigla,
      Universo: data.Universo,
      Zona: data.Zona,
      Andar: data.Andar
    });
    return { universo };
  }
};

// src/modules/universos/useCases/editarUniverso/editarUniversoUsecase.ts
var EditarUniversoUsecase = class {
  constructor(universosRepository) {
    this.universosRepository = universosRepository;
  }
  async execute({
    id,
    Universo,
    Zona,
    Andar
  }) {
    const universo = await this.universosRepository.buscarPorId(id);
    if (!universo) {
      throw new AppErrors("Universo n\xE3o encontrado", 404);
    }
    universo.Universo = Universo;
    universo.Zona = Zona;
    universo.Andar = Andar;
    await this.universosRepository.editar(universo);
  }
};

// src/modules/universos/useCases/deletarUniverso/deletarUniversoUsecase.ts
var DeletarUniversoUsecase = class {
  constructor(universoRepository, colaboradoresRepository) {
    this.universoRepository = universoRepository;
    this.colaboradoresRepository = colaboradoresRepository;
  }
  async execute(id) {
    const universo = await this.universoRepository.buscarPorId(id);
    if (!universo) {
      throw new AppErrors("universo n\xE3o encontrado", 400);
    }
    const existeColaboradores = await this.colaboradoresRepository.listarColaboradoresPorTipoOuUniverso({
      universoId: universo.Id
    });
    if (existeColaboradores.length > 0) {
      throw new AppErrors("Existem colaboradores nesse universo", 409);
    }
    await this.universoRepository.deletar(universo.Id);
  }
};

// src/modules/colaboradores/infra/prisma/colaboradoresRepository.ts
var import_crypto = require("crypto");
var ColaboradoresRepository = class {
  constructor() {
    this.db = prisma.tb_Colaboradores;
  }
  async editar({
    Id,
    Nome,
    Administrador,
    Senha,
    Id_Universo,
    Brigadista,
    Formacao_Data,
    Admissao_Data,
    Email,
    Telefone,
    Funcao,
    Endereco,
    Observacao,
    Empresa
  }) {
    const colborador = await this.db.update({
      where: { Id },
      data: {
        Nome,
        Administrador,
        Id_Universo,
        Brigadista,
        Formacao_Data,
        Admissao_Data,
        Senha,
        Email,
        Telefone,
        Funcao,
        Endereco,
        Observacao,
        Empresa
      }
    });
    return colborador;
  }
  async listarColaboradoresPorTipoOuUniverso({
    sigla,
    tipo,
    universoId
  }) {
    if (tipo) {
      const colaboradores2 = await this.db.findMany({
        where: {
          Loja_Sigla: sigla,
          Ativo: "Sim",
          Tipo: tipo
        },
        include: {
          tb_universos: {
            select: {
              Universo: true
            }
          }
        }
      });
      return colaboradores2;
    }
    if (universoId) {
      const colaboradores2 = await this.db.findMany({
        where: {
          Loja_Sigla: sigla,
          Ativo: "Sim",
          Id_Universo: universoId
        },
        include: {
          tb_universos: {
            select: {
              Universo: true
            }
          }
        }
      });
      return colaboradores2;
    }
    const colaboradores = await this.db.findMany({
      where: {
        Loja_Sigla: sigla,
        Ativo: "Sim",
        OR: [{ Tipo: "Colaborador" }]
      },
      include: {
        tb_universos: {
          select: {
            Universo: true
          }
        }
      }
    });
    return colaboradores;
  }
  async desativarColaborador(id, {
    Acao,
    Administrador,
    Ativo,
    CheckIn,
    CheckIn_Status,
    Cor,
    Id_Universo,
    Senha,
    Status
  }) {
    await this.db.update({
      where: {
        Id: id
      },
      data: {
        Acao,
        Administrador,
        Ativo,
        CheckIn,
        CheckIn_Status,
        Cor,
        Id_Universo,
        Senha,
        Status
      }
    });
  }
  async buscarPorId(id) {
    const colaborador = await this.db.findFirst({
      where: {
        Id: id
      },
      include: {
        tb_universos: {
          select: {
            Universo: true,
            Id: true
          }
        }
      }
    });
    return colaborador;
  }
  async buscarPorEmail(email) {
    const colaborador = await this.db.findFirst({
      where: {
        Email: email
      }
    });
    return colaborador;
  }
  async criar({
    Loja_Sigla,
    Nome,
    Email,
    Tipo,
    Endereco,
    Telefone,
    Id_Universo,
    Senha,
    Funcao,
    Empresa,
    Administrador,
    Brigadista,
    Formacao_Data,
    Admissao_Data,
    Observacao
  }) {
    const colaborador = await this.db.create({
      data: {
        Loja_Sigla,
        Ativo: "Sim",
        Id_Key: `${Loja_Sigla}-${(0, import_crypto.randomUUID)()}`,
        Id_Universo,
        Tipo,
        Nome,
        Funcao: Funcao && null,
        Email,
        Administrador,
        Endereco,
        Empresa,
        Telefone,
        Senha: Senha || (0, import_crypto.randomUUID)(),
        Brigadista,
        Formacao_Data: Formacao_Data && null,
        Admissao_Data,
        Insert_Date: String(/* @__PURE__ */ new Date()),
        Observacao
      }
    });
    return colaborador;
  }
  async checkIn(id, {
    checkIn,
    status,
    checkInStatus,
    checkInDate,
    acao,
    cor,
    ip,
    browser
  }) {
    await this.db.update({
      where: {
        Id: id
      },
      data: {
        CheckIn: checkIn,
        CheckIn_Browser: browser,
        CheckIn_Date: checkInDate,
        CheckIn_IP: ip,
        CheckIn_Status: checkInStatus,
        Status: status,
        Acao: acao,
        Cor: cor
      }
    });
  }
  updateAdmin(id, Administrador) {
    throw new Error("Method not implemented.");
  }
  async informacaoColaboradores(loja) {
    const colaboradores = await prisma.tb_Colaboradores.count({
      where: {
        Loja_Sigla: loja,
        Ativo: "Sim",
        Tipo: "Colaboradore"
      }
    });
    const brigadistas = await prisma.tb_Colaboradores.count({
      where: {
        Loja_Sigla: loja,
        Ativo: "Sim",
        Tipo: "Colaboradore",
        Brigadista: "Sim"
      }
    });
    const terceiros = await prisma.tb_Colaboradores.count({
      where: {
        Loja_Sigla: loja,
        Ativo: "Sim",
        Tipo: "Terceiro"
      }
    });
    const visitantes = await prisma.tb_Colaboradores.count({
      where: {
        Loja_Sigla: loja,
        Ativo: "Sim",
        Tipo: "Terceiro"
      }
    });
    const offline = await prisma.tb_Colaboradores.count({
      where: {
        Loja_Sigla: loja,
        Ativo: "Sim",
        Status: "Ausente"
      }
    });
    return { colaboradores, brigadistas, terceiros, visitantes, offline };
  }
};

// src/modules/colaboradores/useCases/listarColaboradoresPorLoja/listarColaboradoresUseCase.ts
var ListarColaboradoresUseCase = class {
  constructor(colaboradoresRepository, lojaRepository) {
    this.colaboradoresRepository = colaboradoresRepository;
    this.lojaRepository = lojaRepository;
  }
  async execute({ nome, universoId, tipo }) {
    const loja = await this.lojaRepository.buscarPorSiglaOuNome(nome);
    if (!loja) {
      throw new AppErrors("Loja nao encontrada no sistema", 404);
    }
    const colaboradores = await this.colaboradoresRepository.listarColaboradoresPorTipoOuUniverso({
      sigla: loja.Loja_Sigla,
      tipo: tipo || null,
      universoId: universoId || null
    });
    return colaboradores;
  }
};

// src/modules/colaboradores/useCases/CheckInCheckout/CheckInOutUsecase.ts
var CheckInOutUsecase = class {
  constructor(colaboradoresRepository) {
    this.colaboradoresRepository = colaboradoresRepository;
  }
  async execute(id, ip, browser) {
    const colaborador = await this.colaboradoresRepository.buscarPorId(id);
    if (!colaborador) {
      throw new AppErrors("colaborador n\xE3o encontrado", 404);
    }
    if (colaborador.Ativo === "Nao") {
      throw new AppErrors("este colaborador n\xE3o est\xE1 ativo", 404);
    }
    const data = {
      checkIn: colaborador.CheckIn === 1 ? colaborador.CheckIn = 0 : colaborador.CheckIn = 1,
      status: colaborador.Status === "Presente" ? colaborador.Status = "Presente" : colaborador.Status = "Ausente",
      checkInStatus: colaborador.CheckIn_Status === "Presente" ? colaborador.CheckIn_Status = "Presente" : colaborador.CheckIn_Status = "Ausente",
      acao: colaborador.Acao === "Chek Out" ? colaborador.Acao = "Chek In" : colaborador.Acao = "Chek Out",
      cor: colaborador.Cor === "success" ? colaborador.Cor = "success" : colaborador.Cor = "Danger",
      checkInDate: /* @__PURE__ */ new Date(),
      ip,
      browser
    };
    await this.colaboradoresRepository.checkIn(id, data);
    const output = {
      nome: colaborador.Nome,
      acao: colaborador.Acao,
      data: colaborador.CheckIn_Date,
      status: colaborador.Status,
      universo: colaborador.tb_universos?.Universo
    };
    return output;
  }
};

// src/modules/colaboradores/useCases/criarColaborador/criarColaboradorUsecase.ts
var CriarColaboradorUsecase = class {
  constructor(colaboradorRepository) {
    this.colaboradorRepository = colaboradorRepository;
  }
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
    Observacao
  }) {
    const emailExiste = await this.colaboradorRepository.buscarPorEmail(
      String(Email)
    );
    if (emailExiste?.Email === Email && emailExiste.Loja_Sigla === Loja_Sigla) {
      throw new AppErrors("Email j\xE1 cadastrado nesta loja", 400);
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
        Observacao
      });
      return colaborador;
    } catch (error) {
      throw new AppErrors("Erro ao cadastrar colaborador", 500);
    }
  }
};

// src/modules/colaboradores/useCases/desativarColaborador/DesativarColaboradorUsecase.ts
var DesativarColaboradorUsecase = class {
  constructor(colaboradorRepository) {
    this.colaboradorRepository = colaboradorRepository;
  }
  async execute(id) {
    const colaborador = await this.colaboradorRepository.buscarPorId(id);
    if (!colaborador) {
      throw new AppErrors("colaborador n\xE3o encontrado", 404);
    }
    try {
      const data = {
        Ativo: "Nao",
        Id_Universo: null,
        Administrador: "Nao",
        CheckIn: 0,
        Status: colaborador.Status === "Presente" ? "Presente" : "Presente",
        CheckIn_Status: colaborador.Status === "Presente" ? "Presente" : "Presente",
        Senha: "AcessoBloqueado",
        Acao: "Check In",
        Cor: "danger"
      };
      await this.colaboradorRepository.desativarColaborador(
        colaborador.Id,
        data
      );
    } catch (error) {
      console.error(error);
      throw new AppErrors("Erro ao desativar o colaborador", 500);
    }
  }
};

// src/modules/colaboradores/useCases/informacoesColaboradores/informacoesColaboradoresUseCase.ts
var InformacoesColaboradoresUsecase = class {
  constructor(colaboradoresRepository, lojaRepository) {
    this.colaboradoresRepository = colaboradoresRepository;
    this.lojaRepository = lojaRepository;
  }
  async execute(nome) {
    const loja = await this.lojaRepository.buscarPorSiglaOuNome(nome);
    if (!loja) {
      throw new AppErrors("Loja nao encontrada no sistema", 404);
    }
    try {
      const resultado = await this.colaboradoresRepository.informacaoColaboradores(
        loja.Loja_Sigla
      );
      return resultado;
    } catch (error) {
      throw new AppErrors("Erro ao buscas dados", 500);
    }
  }
};

// src/modules/cidades/infra/prisma/repository/cidadesRepository.ts
var db2 = prisma.tb_Cidades;
var CidadeRepository = class {
  async criar(data) {
    await db2.create({
      data: {
        Cidade: data.cidade,
        Pais_Sigla: "BR",
        Estado_Sigla: data.estadoSigla,
        Insert_Date: /* @__PURE__ */ new Date()
      }
    });
  }
  async buscarPorCidade(cidade) {
    const resposta = await db2.findFirst({
      where: {
        Cidade: cidade
      }
    });
    return resposta;
  }
};

// src/modules/lojas/useCases/criarLoja/criarLojaUsecase.ts
var CriarLojaUsecase = class {
  constructor(lojasRepository, cidadesRepository, colaboradorRepository, universosRepository) {
    this.lojasRepository = lojasRepository;
    this.cidadesRepository = cidadesRepository;
    this.colaboradorRepository = colaboradorRepository;
    this.universosRepository = universosRepository;
  }
  async execute(data) {
    const siglaExiste = await this.lojasRepository.buscarPorSiglaOuNome(
      data.Loja_Sigla
    );
    if (siglaExiste) {
      throw new AppErrors("Sigla j\xE1 cadastrada no sistema");
    }
    const cnpjExiste = await this.lojasRepository.buscarPorCnpj(data.CNPJ);
    if (cnpjExiste) {
      throw new AppErrors("CNPJ J\xE1 cadastrado");
    }
    const cidadeExiste = await this.cidadesRepository.buscarPorCidade(
      data.Loja_Cidade
    );
    if (!cidadeExiste) {
      await this.cidadesRepository.criar({
        cidade: data.Loja_Cidade,
        estadoSigla: data.Loja_UF
      });
    }
    const loja = await this.lojasRepository.criar({
      CNPJ: data.CNPJ,
      Loja: data.Loja,
      Loja_Endereco: data.Loja_Endereco,
      Responsavel: data.Responsavel,
      Loja_Cidade: data.Loja_Cidade,
      Loja_Sigla: data.Loja_Sigla,
      Loja_Telefone: data.Loja_Telefone,
      Loja_UF: data.Loja_UF,
      Responsavel_Email: data.Responsavel_Email,
      Responsavel_Telefone: data.Responsavel_Telefone
    });
    const universo = await this.universosRepository.criar({
      Loja_Sigla: data.Loja_Sigla,
      Andar: "0",
      Zona: "0",
      Universo: "ADM"
    });
    await this.colaboradorRepository.criar({
      Loja_Sigla: data.Loja_Sigla,
      Administrador: "Sim",
      Email: data.Responsavel_Email,
      Brigadista: "Nao",
      Formacao_Data: "",
      Funcao: "Administrador",
      Id_Universo: universo.Id,
      Nome: data.Responsavel,
      Senha: "chapeira@chapeira",
      Observacao: "",
      Admissao_Data: "",
      Empresa: "DECATHLON",
      Endereco: "",
      Telefone: "",
      Tipo: "Colaborador"
    });
    return loja;
  }
};

// src/modules/lojas/useCases/dashBoard/dashBoardUseCase.ts
var DashBoardUsecase = class {
  constructor(lojasRepository) {
    this.lojasRepository = lojasRepository;
  }
  async execute(loja) {
    const lojaExiste = await this.lojasRepository.buscarPorSiglaOuNome(loja);
    if (!lojaExiste) {
      throw new AppErrors("Loja n\xE3o encontrada no sistema", 404);
    }
    const dados = await this.lojasRepository.dashBoard(lojaExiste.Loja_Sigla);
    return { dados };
  }
};

// src/modules/colaboradores/useCases/buscarPorId/buscarColaboradorPorIdUseCase.ts
var BuscarColaboradorPorIdUseCase = class {
  constructor(colaboradorRepository) {
    this.colaboradorRepository = colaboradorRepository;
  }
  async execute(id) {
    const colaborador = await this.colaboradorRepository.buscarPorId(id);
    if (!colaborador) {
      throw new AppErrors("Colaborador n\xE3o encontrado", 404);
    }
    const response = {
      id: colaborador.Id,
      nome: colaborador.Nome,
      universo: colaborador.tb_universos?.Universo,
      idUniverso: colaborador.Id_Universo,
      email: colaborador.Email,
      telefone: colaborador.Telefone,
      endereco: colaborador.Endereco,
      tipo: colaborador.Tipo,
      empresa: colaborador.Empresa,
      brigadista: colaborador.Brigadista,
      formacaoData: colaborador.Formacao_Data,
      admissaoData: colaborador.Admissao_Data,
      observacao: colaborador.Observacao,
      administrador: colaborador.Administrador
    };
    return response;
  }
};

// src/modules/contatosDeEmergencia/useCases/buscarContatoPorId/buscarContatoPorIdUseCase.ts
var BuscarContatoPorIdUseCase = class {
  constructor(contatosDeEmergencia) {
    this.contatosDeEmergencia = contatosDeEmergencia;
  }
  async execute(id) {
    const contato = await this.contatosDeEmergencia.buscarPorId(id);
    if (!contato) {
      throw new AppErrors("Contato n\xE3o encontrado", 404);
    }
    return contato;
  }
};

// src/modules/universos/useCases/buscarUniversoPorId/buscarUniversoPorIdUsecase.ts
var BuscarUniversoPorIdUSecase = class {
  constructor(univesoRepository) {
    this.univesoRepository = univesoRepository;
  }
  async execute(id) {
    const universo = await this.univesoRepository.buscarPorId(id);
    if (!universo) {
      throw new AppErrors("Universo n\xE3o encontrado", 404);
    }
    return universo;
  }
};

// src/modules/contatosDeEmergencia/useCases/criarContato/criarContatoDeEmergenciaUsecase.ts
var CriarContatoDeEmergenciaUsecase = class {
  constructor(contatosEmergenciaRepository) {
    this.contatosEmergenciaRepository = contatosEmergenciaRepository;
  }
  async execute(data) {
    const contatoExiste = await this.contatosEmergenciaRepository.buscarPorNomeELoja(
      data.lojaSigla,
      data.nomeContato
    );
    if (contatoExiste) {
      throw new AppErrors("Contato j\xE1 cadastrado nesta loja", 400);
    }
    const contato = await this.contatosEmergenciaRepository.criar({
      Contato: data.nomeContato,
      Telefone: data.telefone,
      Descricao: data.descricao,
      Loja_Sigla: data.lojaSigla
    });
    return { contato };
  }
};

// src/modules/invoice/infra/prisma/InvoiceRepository.ts
var InvoiceRepository = class {
  async criar(data) {
    const invoice = await prisma.tb_Lojas_Faturamentos.create({
      data: {
        Nota_Fiscal: data.Nota_Fiscal,
        Data_Faturamento: data.Data_Faturamento,
        Insert_Date: /* @__PURE__ */ new Date(),
        Loja_Sigla: data.Loja_Sigla,
        Pendente: true,
        Valor_Servicos: data.Valor_Servicos,
        Valor_Nota: data.Valor_Nota
      }
    });
    return invoice;
  }
};

// src/modules/invoice/useCases/importarInvoice/importarInvoiceUsecase.ts
var import_fs = require("fs");
var import_csv_parse = require("csv-parse");
var ImportarInvoiceUseCase = class {
  constructor(invoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }
  carregarArquivo(arquivo) {
    return new Promise((resolve, reject) => {
      const stream = (0, import_fs.createReadStream)(arquivo.path);
      const invoices = [];
      stream.pipe((0, import_csv_parse.parse)({ delimiter: "," })).on("data", async (linha) => {
        const [
          Loja_Sigla,
          Nota_Fiscal,
          Valor_Servicos,
          Valor_Nota,
          Data_Faturamento,
          Data_Vencimento
        ] = linha;
        invoices.push({
          Loja_Sigla,
          Nota_Fiscal,
          Valor_Servicos,
          Valor_Nota,
          Data_Faturamento: new Date(Data_Faturamento),
          Data_Vencimento: new Date(Data_Vencimento)
        });
      }).on("end", () => {
        import_fs.promises.unlink(arquivo.path);
        resolve(invoices);
      }).on("error", (err) => {
        reject(err);
      });
    });
  }
  async execute(arquivo) {
    const invoices = await this.carregarArquivo(arquivo);
    invoices.map(async (invoice) => {
      const {
        Loja_Sigla,
        Nota_Fiscal,
        Valor_Servicos,
        Valor_Nota,
        Data_Faturamento,
        Data_Vencimento
      } = invoice;
      await this.invoiceRepository.criar({
        Loja_Sigla,
        Data_Faturamento,
        Data_Vencimento,
        Nota_Fiscal,
        Valor_Nota,
        Valor_Servicos
      });
    });
  }
};

// src/modules/lojas/errors/lojaNaoEcontradaErro.ts
var LojaNaoEncontradaErro = class extends Error {
  constructor() {
    super("Loja n\xE3o encontrada no sistema");
  }
};

// src/modules/lojas/useCases/editarLoja/editarLojaUsecase.ts
var EditarLojaUsecase = class {
  constructor(lojaRepository) {
    this.lojaRepository = lojaRepository;
  }
  async execute(id, { Loja_Endereco, Loja_Telefone, Loja_Horario, Loja_Cidade }) {
    const loja = await this.lojaRepository.buscarPorId(id);
    if (!loja) {
      throw new LojaNaoEncontradaErro();
    }
    loja.Loja_Endereco = Loja_Endereco;
    loja.Loja_Telefone = Loja_Telefone;
    loja.Loja_Horario = Loja_Horario;
    loja.Loja_Cidade = Loja_Cidade;
    await this.lojaRepository.editar(loja);
    return loja;
  }
};

// src/modules/contatosDeEmergencia/useCases/deletarContato/deletarContatoUsecase.ts
var DeletarContatoUseCase = class {
  constructor(contatoRepository) {
    this.contatoRepository = contatoRepository;
  }
  async execute(id) {
    const contato = await this.contatoRepository.buscarPorId(id);
    if (!contato) {
      throw new AppErrors("Contato n\xE3o encontrado");
    }
    await this.contatoRepository.deletar(contato.Id);
  }
};

// src/modules/contatosDeEmergencia/useCases/editarContatoDeEmergencia/editarContatoDeEmergenciaUsecase.ts
var EditarContatoDeEmergenciaUsecase = class {
  constructor(contatosDeEmergenciaRepository) {
    this.contatosDeEmergenciaRepository = contatosDeEmergenciaRepository;
  }
  async execute(data) {
    const contato = await this.contatosDeEmergenciaRepository.buscarPorId(
      data.id
    );
    if (!contato) {
      throw new AppErrors("Contato n\xE3o encontrado", 404);
    }
    contato.Contato = data.contato;
    contato.Descricao = data.descricao;
    contato.Telefone = data.telefone;
    contato.Endereco = data.endereco;
    await this.contatosDeEmergenciaRepository.editar(contato);
  }
};

// src/modules/colaboradores/useCases/auth/authUseCase.ts
var AuthUsecase = class {
  constructor(colaboradorRepository) {
    this.colaboradorRepository = colaboradorRepository;
  }
  async execute(email, senha) {
    const admin = await this.colaboradorRepository.buscarPorEmail(email);
    if (!admin) {
      throw new AppErrors("Email ou senha invalidos", 401);
    }
    if (admin.Senha !== senha) {
      throw new AppErrors("Email ou senha invalidos", 401);
    }
    if (admin.Administrador !== "Sim") {
      throw new AppErrors("N\xE3o", 401);
    }
    return admin;
  }
};

// src/modules/colaboradores/useCases/editarColaborador/editarColaboradorUseCase.ts
var EditarColaboradorUseCase = class {
  constructor(colabotadoresRepository) {
    this.colabotadoresRepository = colabotadoresRepository;
  }
  async execute(data) {
    const colaborador = await this.colabotadoresRepository.buscarPorId(data.id);
    if (!colaborador) {
      throw new AppErrors("Colaborador n\xE3o encontrado", 404);
    }
    colaborador.Nome = data.nome;
    colaborador.Administrador = data.admin;
    colaborador.Id_Universo = data.universoId;
    colaborador.Brigadista = data.brigadista;
    colaborador.Formacao_Data = data.formacao;
    colaborador.Admissao_Data = data.admissao;
    colaborador.Email = data.email;
    colaborador.Telefone = data.telefone;
    colaborador.Funcao = data.funcao;
    colaborador.Endereco = data.endereco;
    colaborador.Observacao = data.observacao;
    colaborador.Empresa = data.empresa;
    try {
      await this.colabotadoresRepository.editar(colaborador);
      return colaborador;
    } catch (error) {
      throw new AppErrors("Erro ao editar usu\xE1rio");
    }
  }
};

// src/shared/container/providers/MailProvider/nodemailer/EthrealProvider.ts
var import_node_fs = __toESM(require("fs"));
var nodemailer = __toESM(require("nodemailer"));
var import_handlebars = __toESM(require("handlebars"));
var EthrealMailProvider = class {
  constructor() {
  }
  async enviarEmail(to, subject, variables, path) {
    await nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
      this.client = transporter;
    }).catch((err) => console.log(err));
    const templateFileContent = import_node_fs.default.readFileSync(path).toString("utf-8");
    const templateParse = import_handlebars.default.compile(templateFileContent);
    const templateHtml = templateParse(variables);
    const email = await this.client.sendMail({
      from: "Suporte@chapeira.com",
      to,
      subject,
      html: templateHtml
    });
    console.log("Message sent: %s", email);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(email));
  }
};

// src/modules/colaboradores/useCases/cadastrarNovaSenha/cadastrarNovaSenhaUseCase.ts
var import_fast_jwt = require("fast-jwt");
var CadastrarNovaSenhaUseCase = class {
  constructor(colaboradoresRepository, lojaRepository) {
    this.colaboradoresRepository = colaboradoresRepository;
    this.lojaRepository = lojaRepository;
  }
  async execute(token, senha, lojaSigla) {
    const decoder = (0, import_fast_jwt.createDecoder)();
    const decodedToken = decoder(token);
    const colaborador = await this.colaboradoresRepository.buscarPorEmail(
      decodedToken.sub
    );
    const loja = await this.lojaRepository.buscarPorSiglaOuNome(lojaSigla);
    if (colaborador?.Administrador === "Nao") {
      throw new AppErrors("n\xE3o autorizado", 401);
    }
    if (colaborador?.Loja_Sigla !== lojaSigla) {
      throw new AppErrors("sigla divergente", 401);
    }
    if (loja?.Pasta_WEB?.toUpperCase() !== lojaSigla.toUpperCase()) {
      throw new AppErrors("loja divergente", 402);
    }
    colaborador.Senha = senha;
    await this.colaboradoresRepository.editar(colaborador);
    return colaborador;
  }
};

// src/shared/container/index.ts
import_awilix.diContainer.register({
  contatosEmergenciaRepository: (0, import_awilix2.asClass)(ContatosEmergenciaRepository, {
    lifetime: import_awilix2.Lifetime.SINGLETON,
    dispose: (module2) => module2.dispose()
  })
});
import_awilix.diContainer.register({
  ethrealMailProvider: (0, import_awilix2.asClass)(EthrealMailProvider, {
    lifetime: import_awilix2.Lifetime.SINGLETON,
    dispose: (module2) => module2.dispose()
  })
});
import_awilix.diContainer.register({
  imagensRepository: (0, import_awilix2.asClass)(ImagensRepository, {
    lifetime: import_awilix2.Lifetime.SINGLETON,
    dispose: (module2) => module2.dispose()
  })
});
import_awilix.diContainer.register({
  lojasRepository: (0, import_awilix2.asClass)(LojaRepository, {
    lifetime: import_awilix2.Lifetime.SINGLETON,
    dispose: (module2) => module2.dispose()
  })
});
import_awilix.diContainer.register({
  universosRepository: (0, import_awilix2.asClass)(UniversoRepository, {
    lifetime: import_awilix2.Lifetime.SINGLETON,
    dispose: (module2) => module2.dispose()
  })
});
import_awilix.diContainer.register({
  cidadesRepository: (0, import_awilix2.asClass)(CidadeRepository, {
    lifetime: import_awilix2.Lifetime.SINGLETON,
    dispose: (module2) => module2.dispose()
  })
});
import_awilix.diContainer.register({
  colaboradoresRepository: (0, import_awilix2.asClass)(ColaboradoresRepository, {
    lifetime: import_awilix2.Lifetime.SINGLETON,
    dispose: (module2) => module2.dispose()
  })
});
import_awilix.diContainer.register({
  invoicesRepository: (0, import_awilix2.asClass)(InvoiceRepository, {
    lifetime: import_awilix2.Lifetime.SINGLETON,
    dispose: (module2) => module2.dispose()
  })
});
function diContatosEmergencia(request, reply, done) {
  request.diScope.register({
    buscarContatosUsecase: (0, import_awilix2.asFunction)(
      ({ contatosEmergenciaRepository }) => {
        return new BuscarContatosContatosUseCase(contatosEmergenciaRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    buscarContatoPorId: (0, import_awilix2.asFunction)(
      ({ contatosEmergenciaRepository }) => {
        return new BuscarContatoPorIdUseCase(contatosEmergenciaRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    criarContatoDeEmergencia: (0, import_awilix2.asFunction)(
      ({ contatosEmergenciaRepository }) => {
        return new CriarContatoDeEmergenciaUsecase(contatosEmergenciaRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    deletarContatoDeEmergencia: (0, import_awilix2.asFunction)(
      ({ contatosEmergenciaRepository }) => {
        return new DeletarContatoUseCase(contatosEmergenciaRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    editarContatoDeEmergencia: (0, import_awilix2.asFunction)(
      ({ contatosEmergenciaRepository }) => {
        return new EditarContatoDeEmergenciaUsecase(
          contatosEmergenciaRepository
        );
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  done();
}
function diImagens(request, reply, done) {
  request.diScope.register({
    buscarImagensUseCase: (0, import_awilix2.asFunction)(
      ({ imagensRepository }) => {
        return new BuscarImagensUseCase(imagensRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  done();
}
function diLojas(request, reply, done) {
  request.diScope.register({
    criarLojaUseCase: (0, import_awilix2.asFunction)(
      ({
        lojasRepository,
        cidadesRepository,
        colaboradoresRepository,
        universosRepository
      }) => {
        return new CriarLojaUsecase(
          lojasRepository,
          cidadesRepository,
          colaboradoresRepository,
          universosRepository
        );
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    listarLojasUseCase: (0, import_awilix2.asFunction)(
      ({ lojasRepository }) => {
        return new ListarLojasUsecase(lojasRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    buscarLojaPorSiglaOuNome: (0, import_awilix2.asFunction)(
      ({ lojasRepository }) => {
        return new BuscarLojaPorSiglaOuNomeUsecase(lojasRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    buscarLojaPorNomeUsecase: (0, import_awilix2.asFunction)(
      ({ lojasRepository }) => {
        return new BuscarLojaPorSiglaOuNomeUsecase(lojasRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    dashBoardUsecase: (0, import_awilix2.asFunction)(
      ({ lojasRepository }) => {
        return new DashBoardUsecase(lojasRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    editarLojaUsecase: (0, import_awilix2.asFunction)(
      ({ lojasRepository }) => {
        return new EditarLojaUsecase(lojasRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  done();
}
function diUniversos(request, reply, done) {
  request.diScope.register({
    listarUniversosPorLojaUsecase: (0, import_awilix2.asFunction)(
      ({ lojasRepository, universosRepository }) => {
        return new ListarUniversosPorLojaUsecase(
          universosRepository,
          lojasRepository
        );
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    criarUniversoUsecase: (0, import_awilix2.asFunction)(
      ({ universosRepository }) => {
        return new CriarUniversoUsecase(universosRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    editarUniversoUsecase: (0, import_awilix2.asFunction)(
      ({ universosRepository }) => {
        return new EditarUniversoUsecase(universosRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    deletarUniversoUsecase: (0, import_awilix2.asFunction)(
      ({ universosRepository, colaboradoresRepository }) => {
        return new DeletarUniversoUsecase(
          universosRepository,
          colaboradoresRepository
        );
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    buscarUniversoPorIdUSecase: (0, import_awilix2.asFunction)(
      ({ universosRepository }) => {
        return new BuscarUniversoPorIdUSecase(universosRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  done();
}
function diColaboradores(request, reply, done) {
  request.diScope.register({
    listarColaboradoresUsecase: (0, import_awilix2.asFunction)(
      ({ colaboradoresRepository, lojasRepository }) => {
        return new ListarColaboradoresUseCase(
          colaboradoresRepository,
          lojasRepository
        );
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    checkInCheckOutUsecase: (0, import_awilix2.asFunction)(
      ({ colaboradoresRepository }) => {
        return new CheckInOutUsecase(colaboradoresRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    criarColaboradorUsecase: (0, import_awilix2.asFunction)(
      ({ colaboradoresRepository }) => {
        return new CriarColaboradorUsecase(colaboradoresRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    desativarColaboradorUsecase: (0, import_awilix2.asFunction)(
      ({ colaboradoresRepository }) => {
        return new DesativarColaboradorUsecase(colaboradoresRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    buscarColaboradorPorIdUseCase: (0, import_awilix2.asFunction)(
      ({ colaboradoresRepository }) => {
        return new BuscarColaboradorPorIdUseCase(colaboradoresRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    informacoesColaboradoresUsecase: (0, import_awilix2.asFunction)(
      ({ colaboradoresRepository, lojasRepository }) => {
        return new InformacoesColaboradoresUsecase(
          colaboradoresRepository,
          lojasRepository
        );
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    authUsecase: (0, import_awilix2.asFunction)(
      ({ colaboradoresRepository }) => {
        return new AuthUsecase(colaboradoresRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    editarColaboradorUsecase: (0, import_awilix2.asFunction)(
      ({ colaboradoresRepository }) => {
        return new EditarColaboradorUseCase(colaboradoresRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  request.diScope.register({
    cadastrarNovaSenhaUsecase: (0, import_awilix2.asFunction)(
      ({ colaboradoresRepository, lojasRepository }) => {
        return new CadastrarNovaSenhaUseCase(
          colaboradoresRepository,
          lojasRepository
        );
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  done();
}
function diInvoices(request, reply, done) {
  request.diScope.register({
    importarInvoicesUseCase: (0, import_awilix2.asFunction)(
      ({ invoicesRepository }) => {
        return new ImportarInvoiceUseCase(invoicesRepository);
      },
      {
        lifetime: import_awilix2.Lifetime.SCOPED,
        dispose: (module2) => module2.dispose()
      }
    )
  });
  done();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  diColaboradores,
  diContatosEmergencia,
  diImagens,
  diInvoices,
  diLojas,
  diUniversos
});
