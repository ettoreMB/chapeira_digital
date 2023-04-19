import styled from 'styled-components'

interface StackProps {
  direction?: 'row' | 'column'
}

export const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction && `column`};
`

export const DashboadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
