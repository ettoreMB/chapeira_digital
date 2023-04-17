import styled from 'styled-components'

interface ButtonProps {
  width: string
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

export const UniversosContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`
export const Botao = styled.button<ButtonProps>`
  width: ${(props) => `${props.width}%`};
  color: ${({ theme }) => theme.colors.zinc['zinc-50']};
  background: ${({ theme }) => theme.colors.neutral[500]};
  border: none;
  border-radius: 8px;
  padding: 1.28rem 0;
  font-size: 2rem;
  transition: 0.2 ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.sky['sky-500']};
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 5rem;
  display: flex;
  flex-direction: column;

  h2 {
    margin-top: 3rem;
  }
`
