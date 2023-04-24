import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Layout from '@/layout'
import { api } from '@/services/api'
import { ImageContainer } from './styles'

interface ImagesProps {
  nome: string
  imageType: string
  src: string
  descricao: string
}

export default function PlantaDaLoja() {
  const router = useRouter()
  const { loja } = router.query
  const [images, setImages] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)

  useEffect(() => {
    async function loadImagens() {
      try {
        setCarregando(true)
        const { data } = await api.get(`/imagens/${loja}`)
        setImages(data)
      } catch {
        setErro(true)
      } finally {
        setCarregando(false)
      }
    }

    if (loja) {
      loadImagens()
    }
    return () => {}
  }, [loja])
  return (
    <Layout
      botaoVoltar
      carregando={carregando}
      erroCarregar={erro}
      tituloPagina="Planta da loja"
    >
      <h1>Planta da loja</h1>

      {images?.map((imagem: ImagesProps) => (
        <ImageContainer key={Math.random()}>
          <span>{!imagem.descricao && 'Planta da Loja'}</span>
          <div className="imageBox">
            <Image
              src={`data:${imagem.imageType};base64,${imagem.src}`}
              width={100}
              height={100}
              alt="Imagen planta da loja"
            />
          </div>
        </ImageContainer>
      ))}
    </Layout>
  )
}
