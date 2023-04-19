import Button from '@/components/Button'
import FormGroup from '@/components/FormGroup'

import { StyledInput } from '@/components/StyledInput'

import Layout from '@/layout'

import { Form } from './styles'
import useEditarLoja from '../../../../../hooks/useEditarLoja'

export default function Loja() {
  const use = useEditarLoja()
  const {
    lojaData,
    endereco,
    cidade,
    telefone,
    horario,
    handleEndereco,
    handleCidade,
    handleTelefone,
    handleHorario,
    handleSubmit,
    carregarLoja,
  } = use
  return (
    <Layout botaoVoltar admin>
      <Form>
        <div>
          <FormGroup label="Sigla" width={20}>
            <StyledInput value={lojaData?.sigla} disabled />
          </FormGroup>
          <FormGroup label="Loja">
            <StyledInput value={lojaData?.loja} disabled />
          </FormGroup>
        </div>

        <FormGroup label="Endereco">
          <StyledInput value={endereco} onChange={handleEndereco} />
        </FormGroup>
        <div>
          <FormGroup label="Cidade" width={30}>
            <StyledInput value={cidade} onChange={handleCidade} />
          </FormGroup>
          <FormGroup label="UF">
            <StyledInput value={lojaData?.UF} disabled />
          </FormGroup>
        </div>
        <div>
          <FormGroup label="Telefone">
            <StyledInput value={telefone} onChange={handleTelefone} />
          </FormGroup>
          <FormGroup label="Horário de Funcionamento">
            <StyledInput value={horario} onChange={handleHorario} />
          </FormGroup>
        </div>
        <div>
          <Button onClick={handleSubmit}>Salvar</Button>
          <Button danger onClick={carregarLoja}>
            Cancelar
          </Button>
        </div>
      </Form>
    </Layout>
  )
}
