import styled from 'styled-components'

export const Container = styled.div`
  min-width: 305px;
  height: 250px;
  border-radius: 8px;
  margin-top: 1rem;
  display: flex;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray['600']};
  text-align: center;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  flex-direction: column;
  transition: 0.2 ease-in;
  div {
    width: 100%;
    height: 130px;

    img {
      width: auto;
      max-height: 100px;
      height: auto;
      object-fit: contain;
    }
  }
  h5 {
    font-weight: bold;
    font-size: 1.2rem;
  }

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 1180px) {
    justify-content: center;
  }

  @media (max-width: 664px) {
    justify-content: center;
  }
  @media (max-width: 510px) {
    justify-content: center;
  }
  @media (max-width: 440px) {
  }

  @media (max-width: 375px) {
    justify-content: center;
  }
`
