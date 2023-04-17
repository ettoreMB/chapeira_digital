import styled from 'styled-components'

export const Form = styled.form`
  width: 100%;
  max-width: 1140px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 1rem;
  padding: 1rem 0;
  background: white;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;

  > div {
    width: 100%;
    display: inline-flex;
  }

  & + div {
  }
`
