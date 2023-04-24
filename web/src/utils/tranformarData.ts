export function transformarData(data: string) {}

export const handleData = {
  tranformarData(data: string) {
    return Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'medium',
    }).format(new Date(data))
  },

  criarData() {
    return Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'medium',
    }).format(new Date())
  },
}
