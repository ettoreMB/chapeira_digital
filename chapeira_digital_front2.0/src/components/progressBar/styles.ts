import styled from 'styled-components'

interface FillerStyledPorops {
  bgColor: string
  width: number
}

export const Container = styled.div`
  height: 20;
  width: '100%';
  background: '#e0e0de';
  border-radius: 50;
  margin: 50;
`
export const FillerStyles = styled.div<FillerStyledPorops>`
  height: '100%';
  width: ${({ width }) => `${width}%`};
  background: ${({ bgColor }) => bgColor};
  border-radius: 'inherit';
  text-align: 'right';
`

export const LabelStyles = styled.span`
  padding: 5;
  color: 'white';
  font-weight: 'bold';
`
