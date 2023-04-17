/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import Button from '../Button'
import FormGroup from '../FormGroup'
import { StyledInput } from '../StyledInput'
import { Form } from './styles'
import UseUniversoForm from './useUniversoForm'

interface Props {
  titulo?: string
  onSubmit: (() => Promise<void>) | ((data: any) => Promise<void>)
}

const UniversoForm = forwardRef(({ titulo = '', onSubmit }: Props, ref) => {
  const {
    universoNome,
    andar,
    zona,
    handleAndar,
    handleUniversoNome,
    handleZona,
    handleSubmit,
  } = UseUniversoForm({ onSubmit, ref })

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <span>{titulo}</span>
      <FormGroup label="Nome">
        <StyledInput value={universoNome} onChange={handleUniversoNome} />
      </FormGroup>
      <FormGroup label="Andar">
        <StyledInput value={andar} onChange={handleAndar} />
      </FormGroup>
      <FormGroup label="Zona">
        <StyledInput value={zona} onChange={handleZona} />
      </FormGroup>
      <Button type="submit">Salvar</Button>
    </Form>
  )
})

export default UniversoForm
