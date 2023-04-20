import { useContext } from 'react'

import { Container } from './styles'
import Card from '../../components/Card'

import Layout from '@/layout'
import servicosImg from '../../assets/Decatlhon_Servicos.png'
import visitanteImg from '../../assets/Decathlon_Visitante.png'
import dashBoardImg from '../../assets/DashBoard.png'

import plantaImg from '../../assets/Planta_Combate_Incendio_Small.png'
import emergenciaImg from '../../assets/Telefone.jpg'
import { BsPeopleFill } from 'react-icons/bs'
import { lojaSiglaContext } from '@/contexts/lojaSiglaContext'

export default function Home() {
  const { lojaSigla } = useContext(lojaSiglaContext)

  return (
    <Layout barraInformacao>
      <Container>
        <Card
          titulo="Colaboradores Chekin/out"
          icon={<BsPeopleFill size={116} />}
          link={`${lojaSigla}/universos`}
        />
        <Card
          titulo="Serviços Chekin/out"
          img={servicosImg}
          link={`${lojaSigla}/listaColaboradores?tipo=Terceiro`}
        />
        <Card
          titulo="visitantes Chekin/out"
          img={visitanteImg}
          link={`${lojaSigla}/listaColaboradores?tipo=Visitante`}
        />
        <Card
          titulo="DashBoard"
          img={dashBoardImg}
          link={`${lojaSigla}/dashboard`}
        />

        <Card
          titulo="Planta da Loja"
          img={plantaImg}
          link={`${lojaSigla}/plantaDaLoja`}
        />
        <Card
          titulo="Contatos de emergência"
          img={emergenciaImg}
          link={`${lojaSigla}/contatosDeEmergencia`}
        />
      </Container>
    </Layout>
  )
}
