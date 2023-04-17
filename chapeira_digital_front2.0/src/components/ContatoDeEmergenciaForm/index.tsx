/* eslint-disable react/display-name */

import { forwardRef } from 'react'
import Button from '../Button'
import FormGroup from '../FormGroup'
import { StyledInput } from '../StyledInput'
import { Form } from './styles'
import UseContatodeEmergenciaForm from './useContatoDeEmergenciaForm'

interface Props {
  titulo: string
  onSubmit: any
}

const ContatoDeEmergenciaForm = forwardRef(
  ({ titulo, onSubmit }: Props, ref) => {
    const {
      contato,
      descricao,
      telefone,
      handleContato,
      handleDescricao,
      handleTelefone,
      handleSubmit,
    } = UseContatodeEmergenciaForm({ ref, onSubmit })
    return (
      <Form onSubmit={handleSubmit}>
        <span>{titulo}</span>
        <FormGroup label="Contato">
          <StyledInput value={contato} onChange={handleContato} />
        </FormGroup>
        <FormGroup label="Telefone">
          <StyledInput value={telefone} onChange={handleTelefone} />
        </FormGroup>
        <FormGroup label="Descrição">
          <StyledInput value={descricao} onChange={handleDescricao} />
        </FormGroup>
        <Button>Salvar</Button>
      </Form>
    )
  },
)

export default ContatoDeEmergenciaForm
