import Layout from '@/layout'
import { Container, FormContainer, ImageContainer } from './styles'
import { useState, ChangeEvent, FormEvent } from 'react'
import Button from '@/components/Button'
import { ImFileEmpty } from 'react-icons/im'
import { api } from '@/services/api'

import { useRouter } from 'next/router'
import { AxiosRequestConfig } from 'axios'
import toast from '@/utils/toast'
import Image from 'next/image'
export default function ImagensLoja() {
  const router = useRouter()
  const { loja } = router.query
  const [detectorDeFumacaImg, setDetectorDeFumacaImg] = useState<
    File | null | any
  >(null)
  const [combateAIncendioImg, setcCombateAIncendioImg] = useState<
    File | null | any
  >(null)
  const [previewDetectorImage, setPreviewDetectorImage] = useState('')
  const [previewCombateIncendioImage, setPreviewCombateIncendioImage] =
    useState('')

  function handleDetectorDeFumaca(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) {
      return
    }
    const file = e.target.files && e.target.files[0]

    setDetectorDeFumacaImg(file || null)
    if (file && !file.name.includes('.pdf')) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewDetectorImage(imageUrl)
    }
  }
  function handleCombateIncendio(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) {
      return
    }
    const file = e.target.files && e.target.files[0]

    setcCombateAIncendioImg(file || null)
    if (file && !file.name.includes('.pdf')) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewCombateIncendioImage(imageUrl)
    }
  }

  async function handleSubmitCombateIncendio(e: FormEvent) {
    e.preventDefault()
    const formData = new FormData()

    formData.append('imagem', combateAIncendioImg)
    formData.append('titulo', 'Planta Combate a Incêndio')

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    } as AxiosRequestConfig

    try {
      await api.post(`/imagens/salvar/${loja}`, formData, config)
      toast({ text: 'Imagem salva com sucesso', type: 'success' })
    } catch (error) {
      toast({ text: 'Erro ao salvar imagem', type: 'danger' })
    }
  }

  async function handleSubmitDetectorFumaca(e: FormEvent) {
    e.preventDefault()
    const formData = new FormData()

    formData.append('imagem', detectorDeFumacaImg)
    formData.append('titulo', 'Planta Detectores de Fumaça')

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    } as AxiosRequestConfig

    try {
      await api.post(`/imagens/salvar/${loja}`, formData, config)
      toast({ text: 'Imagem salva com sucesso', type: 'success' })
    } catch (error) {
      toast({ text: 'Erro ao salvar imagem', type: 'danger' })
    }
  }

  return (
    <Layout admin botaoVoltar>
      <Container>
        <FormContainer onSubmit={handleSubmitCombateIncendio}>
          <h2>Combate a incêndio</h2>

          {previewCombateIncendioImage ? (
            <>
              <ImageContainer>
                <Image
                  width={200}
                  height={200}
                  src={previewCombateIncendioImage}
                  alt="Pré-visualização da imagem"
                  style={{ width: '400px', height: '400px' }}
                />
                <span>Nome: {combateAIncendioImg?.name}</span>
              </ImageContainer>
            </>
          ) : (
            <ImFileEmpty size={200} />
          )}
          <div>
            <label htmlFor="combate" className="custom-file-upload">
              Selecionar arquivo
              <input
                onChange={handleCombateIncendio}
                type="file"
                id="combate"
              />
            </label>
            <Button>Enviar</Button>
          </div>
        </FormContainer>

        <FormContainer onSubmit={handleSubmitDetectorFumaca}>
          <h2>Detectores de fumaça</h2>

          {previewDetectorImage ? (
            <>
              <ImageContainer>
                <Image
                  width={200}
                  height={200}
                  src={previewDetectorImage}
                  alt="Pré-visualização da imagem"
                  style={{ width: '400px', height: '400px' }}
                />
                <span>Nome: {detectorDeFumacaImg?.name}</span>
              </ImageContainer>
            </>
          ) : (
            <ImFileEmpty size={200} />
          )}
          <div>
            <label htmlFor="detector" className="custom-file-upload">
              Selecionar arquivo
              <input
                onChange={handleDetectorDeFumaca}
                type="file"
                id="detector"
              />
            </label>
            <Button>Enviar</Button>
          </div>
        </FormContainer>
      </Container>
    </Layout>
  )
}
