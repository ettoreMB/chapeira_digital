import styled from 'styled-components'

export const Container = styled.div``

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  .custom-file-upload {
    border: 1px solid ${({ theme }) => theme.colors.sky['sky-600']};
    display: inline-block;
    padding: 8px 1rem;
    text-align: center;
    border-radius: 8px;
    height: 42px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.sky['sky-600']};
    font-weight: bold;
  }
  input[type='file'] {
    display: none;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  img {
    margin-bottom: 1rem;
    border: 1px solid black;
  }
`
export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  span {
    font-size: 1.5rem;
    font-weight: bold;
  }
  margin-bottom: 6px;
`
