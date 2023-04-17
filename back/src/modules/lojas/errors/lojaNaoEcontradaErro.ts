export class LojaNaoEncontradaErro extends Error {
  constructor() {
    super('Loja não encontrada no sistema')
  }
}
