import styled from 'styled-components'

export const Container = styled.div`
  flex-wrap: wrap;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;
  margin: 0 auto;
  justify-content: space-between;

  @media (max-width: 1180px) {
    justify-content: flex-start;
  }
  @media (max-width: 1090px) {
    justify-content: flex-start;
  }

  @media (max-width: 969px) {
    justify-content: center;
  }
  @media (max-width: 815px) {
    justify-content: center;
  }

  @media (max-width: 600px) {
    padding: 0 1rem;
    display: flex;
  }
`
