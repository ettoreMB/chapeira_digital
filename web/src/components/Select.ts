import styled from 'styled-components'

export default styled.select`
  width: 100%;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  height: 48px;
  border-radius: 8px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  border: 2px solid #fff;
  transition: border-color 0.2s ease-in;
  border: 1px solid ${({ theme }) => theme.colors.sky['sky-600']};
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.sky['sky-600']};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[400]};
    border-color: ${({ theme }) => theme.colors.sky['sky-600']};
    opacity: 1;
  }
`
