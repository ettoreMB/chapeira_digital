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

// src/modules/imagens/useCases/buscarImagens/buscarImagensUseCase.ts
var buscarImagensUseCase_exports = {};
__export(buscarImagensUseCase_exports, {
  BuscarImagensUseCase: () => BuscarImagensUseCase
});
module.exports = __toCommonJS(buscarImagensUseCase_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BuscarImagensUseCase
});
