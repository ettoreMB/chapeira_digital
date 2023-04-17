import { Container, FillerStyles } from './styles'

interface ProgressBarProps {
  bgColor: string
  completed: number
}

export default function ProgressBar({ bgColor, completed }: ProgressBarProps) {
  return (
    <Container>
      <FillerStyles bgColor={bgColor} width={completed}>
        <span>{`${completed}%`}</span>
      </FillerStyles>
    </Container>
  )
}
