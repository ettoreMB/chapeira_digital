import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.sky['sky-600']};
  height: 60px;
  color: ${({ theme }) => theme.colors.white};
`

export const Head = styled.header`
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  div {
    color: white;
    align-items: baseline;
    flex-direction: row;
    display: flex;
    gap: 8px;
  }
`

export const LogoContainer = styled.div`
  h1 {
    font-size: 2.25rem;
  }
  span {
    font-size: 1.5rem;
    font-weight: bold;
  }
`

export const AdminContainer = styled.div`
  span {
    margin-right: 4px;
  }
`
