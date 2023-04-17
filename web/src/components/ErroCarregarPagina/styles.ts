import styled from 'styled-components'

export const Container = styled.div`
  width: 740px;
  margin: 0 auto;
  font-size: 2rem;
  height: 100vh;
  display: flex;
  align-items: inherit;
  justify-content: center;
  flex-direction: column;
  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 2rem;
    font-size: 1.5rem;
  }
  span {
    display: inline-flex;
    gap: 4px;
    align-items: center;
  }
`
