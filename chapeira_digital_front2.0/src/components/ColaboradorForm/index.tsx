/* eslint-disable react/display-name */
import { forwardRef } from 'react'
import Button from '../Button'
import FormGroup from '../FormGroup'
import Select from '../Select'
import { StyledInput } from '../StyledInput'
import { Form } from './styles'
import UseColaboradorForm from './useColaboradorForm'

interface Props {
  titulo: string
  onSubmit: (() => Promise<void>) | ((data: any) => Promise<void>)
}

const ColaboradorForm = forwardRef(({ titulo, onSubmit }: Props, ref) => {
  const {
    administrador,
    nome,
    email,
    tipo,
    endereco,
    telefone,
    universo,
    brigadista,
    formacaoData,
    empresa,
    admissaoData,
    observacao,
    universos,
    funcao,
    handleSubmit,
    handleAdministrador,
    handleNome,
    handleEmail,
    handleTipo,
    handleEndereco,
    handleTelefone,
    handleUniverso,
    handleBrigadista,
    handleFormacaoData,
    handleEmpresa,
    handleAdmissaoData,
    handleObservacao,
    handleFuncao,
  } = UseColaboradorForm({ ref, onSubmit })
  return (
    <Form onSubmit={handleSubmit}>
      <span>{titulo}</span>
      <div>
        <FormGroup label="Administrador" width={20}>
          <Select value={administrador} onChange={handleAdministrador}>
            <option value="Nao">Não</option>
            <option value="Sim">Sim</option>
          </Select>
        </FormGroup>
        <FormGroup label="Nome">
          <StyledInput onChange={handleNome} value={nome} />
        </FormGroup>
        <FormGroup label="Email">
          <StyledInput type="email" onChange={handleEmail} value={email} />
        </FormGroup>
        <FormGroup label="tipo">
          <Select onChange={handleTipo} value={tipo}>
            <option value="Colaborador">Colaborador</option>
            <option value="Terceiro">Terceiro</option>
            <option value="Vistante">Visitante</option>
          </Select>
        </FormGroup>
      </div>
      <div>
        <FormGroup label="Endereco">
          <StyledInput onChange={handleEndereco} value={endereco} />
        </FormGroup>
        <FormGroup label="Telefone" width={30}>
          <StyledInput onChange={handleTelefone} value={telefone} />
        </FormGroup>
      </div>
      <FormGroup label="Universo">
        <Select onChange={handleUniverso} value={universo}>
          <option value={''}>Selecione Um Universo</option>
          {universos.map((universo) => (
            <option key={universo.Id} value={universo.Id}>
              {universo.Universo}
            </option>
          ))}
        </Select>
      </FormGroup>
      <div>
        <FormGroup label="Brigadista" width={20}>
          <Select value={brigadista} onChange={handleBrigadista}>
            <option value="Nao">Não</option>
            <option value="Sim">Sim</option>
          </Select>
        </FormGroup>
        <FormGroup label="formação">
          <StyledInput
            type="date"
            onChange={handleFormacaoData}
            value={formacaoData}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup label="empresa">
          <StyledInput onChange={handleEmpresa} value={empresa} />
        </FormGroup>

        <FormGroup label="admissão">
          <StyledInput
            type="date"
            onChange={handleAdmissaoData}
            value={admissaoData}
          />
        </FormGroup>
        <FormGroup label="Função">
          <StyledInput onChange={handleFuncao} value={funcao} />
        </FormGroup>
      </div>
      <FormGroup label="oberservação">
        <StyledInput onChange={handleObservacao} value={observacao} />
      </FormGroup>
      <div>
        <Button>Salvar</Button>
        <Button danger>Cancelar</Button>
      </div>
    </Form>
  )
})

export default ColaboradorForm
