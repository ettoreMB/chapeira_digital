import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 4rem auto;
  span {
    font-size: 2rem;
    text-transform: uppercase;
  }
`
export const Form = styled.form`
  flex-grow: 1;
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  padding: 1rem;

  .spanLink {
    font-size: 0.8rem;
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.sky['sky-400']};
    text-align: left;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.sky['sky-600']};
    }
  }
`
