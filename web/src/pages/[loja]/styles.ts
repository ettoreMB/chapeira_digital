import styled from 'styled-components'

export const Container = styled.div`
  flex-wrap: wrap;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  flex-direction: row;
  gap: 1rem;
  margin: 0 auto;
  justify-content: space-between;

  @media (max-width: 1180px) {
    padding: 0 1rem;
    justify-content: center;
  }

  @media (max-width: 600px) {
    padding: 0 1rem;
    display: flex;
  }
`
