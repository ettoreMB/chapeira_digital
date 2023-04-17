import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;

  background: white;
  padding: 1rem;

  > div {
    width: 100%;
    display: flex;
    gap: 20px;
    flex-direction: row;
  }
`
export const Title = styled.div`
  width: 100%;
  background: blue;
  color: white;
  text-align: center;
`
export const Barra = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid green;
  height: 32px;
  align-items: center;

  div {
    height: 100%;
    display: flex;
    flex-direction: row;
    border: 1px solid black;
  }

  & + div {
  }
`
