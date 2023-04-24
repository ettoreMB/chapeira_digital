import styled from 'styled-components'

export const Table = styled.table`
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  text-align: left;

  @media (max-width: 405px) {
    /* width: min-content; */
    flex: 1;
  }
`
