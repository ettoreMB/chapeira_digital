import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 36px;
  background: #fafafa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

  display: flex;
  align-items: center;
  padding: 0.3rem;

  .box {
    max-width: 1140px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin: 0 auto;
  }
`
export const Loading = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`
export const ErroContainer = styled.div`
  justify-content: flex-start;

  button {
    margin-left: 0.5rem;
    border: none;
    padding: 2px;
    background: ${({ theme }) => theme.colors.sky['sky-600']};
    color: white;
    border-radius: 8px;
    font-size: 1rem;
  }
`
