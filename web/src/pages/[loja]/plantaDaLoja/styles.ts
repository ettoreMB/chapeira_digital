import styled from 'styled-components'

export const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;
  padding: 1rem;
  span {
    font-size: 30px;
  }

  .imageBox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    padding: 2rem;

    img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
`
