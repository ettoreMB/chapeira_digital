import styled from 'styled-components'

export const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FormGroup = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: white;
  border: 2px solid #fff;
  transition: border-color 0.2s ease-in;
  border: 2px solid ${({ theme }) => theme.colors.sky['sky-600']};
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  padding-right: 4px;
  /* &:focus {
    border: 2px solid ${({ theme }) => theme.colors.sky['sky-600']};
  } */
`
export const Input = styled.input`
  width: 100%;
  background: #fff;
  height: 52px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  border: none;
  appearance: none;

  /* &:focus {
    border: 2px solid ${({ theme }) => theme.colors.sky['sky-600']};
  } */
`
