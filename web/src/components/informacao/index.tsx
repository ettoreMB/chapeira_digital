import { Info } from './styles'

interface InformacaoProps {
  informacao: {
    valor: number
    titulo: string
  }
  tipo: 'colaborador' | 'brigadista' | 'servicos' | 'terceiro' | 'offline'
}

export default function Informacao({ tipo, informacao }: InformacaoProps) {
  function selecionaCor() {
    switch (tipo) {
      case 'colaborador':
        return '#0284C7'
      case 'brigadista':
        return '#EF4444'
      case 'servicos':
        return '#EAB308'
      case 'terceiro':
        return '#3B82F6'
      case 'offline':
        return '#383838'
      default:
        return '#0284C7'
    }
  }

  return (
    <Info background={selecionaCor()}>
      <span>{informacao.valor}</span>
      <span>{informacao.titulo}</span>
    </Info>
  )
}
