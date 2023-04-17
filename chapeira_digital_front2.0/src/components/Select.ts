import styled from 'styled-components'

export default styled.select`
  width: 100%;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  height: 52px;
  border-radius: 4px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  border: 2px solid #fff;
  transition: border-color 0.2s ease-in;
  border-color: ${({ theme }) => theme.colors.sky['sky-600']};
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.sky['sky-600']};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[400]};
    border-color: ${({ theme }) => theme.colors.sky['sky-600']};
    opacity: 1;
  }
`
