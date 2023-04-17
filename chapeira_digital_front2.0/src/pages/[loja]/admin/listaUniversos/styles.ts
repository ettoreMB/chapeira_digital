import styled from 'styled-components'

interface TrProps {
  numero: number
}

interface TdProps {
  status: 'Presente' | 'Ausente' | any
}

export const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 1rem;
  padding: 1rem 0;
`

export const Table = styled.table`
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  text-align: left;

  thead {
    background-color: ${({ theme }) => theme.colors.zinc['zinc-50']};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

    th {
      border: 1px solid ${({ theme }) => theme.colors.zinc['zinc-200']};
      border-radius: 8px;
      padding: 0.5rem;
      font-size: 22px;
      background-color: ${({ theme }) => theme.colors.gray[600]};
    }

    .acao {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  tbody {
    tr {
      width: 100%;

      td {
        &:first-child {
          width: 15%;
          padding: 0 0.3rem;
        }
      }
    }
  }
`
export const Acao = styled.td`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0.3rem;
`
export const TableRow = styled.tr<TrProps>`
  background: ${(props) =>
    props.numero % 2 === 0
      ? props.theme.colors.white
      : props.theme.colors.zinc['zinc-200']};
`
export const TableDiv = styled.td`
  padding: 0.3rem 1rem;
`
export const StatusBadge = styled.div<TdProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  div {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ status, theme }) =>
      status === 'Presente' ? theme.colors.green : theme.colors.red};
  }
`
export const AcaoButton = styled.button<TdProps>`
  border: none;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  background: #22c55e;
  color: #fafafa;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ status, theme }) =>
    status === 'Presente' ? theme.colors.red : theme.colors.green};
  color: ${({ theme }) => theme.colors.zinc['zinc-50']};
`
