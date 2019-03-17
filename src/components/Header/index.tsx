import React, { memo } from 'react'
import styled, { keyframes, css } from 'styled-components'

type Props = {
  streak: number
  streakBonus: number
  currentCount: number
  totalCount: number
  triesLeft: number
}

const Container = styled('div')`
  display: flex;
  padding: 8px;
  justify-content: space-between;
`

const Label = styled('div')`
  font-weight: 500;
`

const TriesKeyFrames = keyframes`
  from {
    transform: scale(1.5)
  }
  to {
    transform: scale(1)
  }
`

const TriesShakeKeyFrames = keyframes`
0% { transform: translate(2px, 1px) rotate(0deg); }
10% { transform: translate(-1px, -2px) rotate(-1deg); }
20% { transform: translate(-3px, 0px) rotate(1deg); }
30% { transform: translate(0px, 2px) rotate(0deg); }
40% { transform: translate(1px, -1px) rotate(1deg); }
50% { transform: translate(-1px, 2px) rotate(-1deg); }
60% { transform: translate(-3px, 1px) rotate(0deg); }
70% { transform: translate(2px, 1px) rotate(-1deg); }
80% { transform: translate(-1px, -1px) rotate(1deg); }
90% { transform: translate(2px, 2px) rotate(0deg); }
100% { transform: translate(1px, -2px) rotate(-1deg); }
`

const TriesLabel = styled(Label)<{ triesLeft: number }>`
  transform-origin: top left;
  ${props =>
    props.triesLeft !== 3 &&
    props.triesLeft !== 0 &&
    css`
      animation: ${TriesKeyFrames} 0.5s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    `}
`

const TriesLabelShake = styled(Label)<{ triesLeft: number }>`
  transform-origin: center;
  color: ${props => (props.triesLeft <= 1 ? '#ff1744' : 'inherit')};
  ${props =>
    props.triesLeft === 1 &&
    css`
      animation: ${TriesShakeKeyFrames} 1s infinite;
    `}
`

const Tries = memo(function({
  triesLeft
}: {
  triesLeft: number
}): React.FunctionComponentElement<{ triesLeft: number }> {
  return (
    <TriesLabel key={Math.random()} triesLeft={triesLeft}>
      <TriesLabelShake triesLeft={triesLeft}>
        {triesLeft === 1 ? '1 try' : `${triesLeft} tries`} left
      </TriesLabelShake>
    </TriesLabel>
  )
})

export function Header(props: Props): React.FunctionComponentElement<Props> {
  return (
    <Container>
      <Tries triesLeft={props.triesLeft} />
      <Label>
        x{props.streak} (+{props.streakBonus})
      </Label>
      <Label>
        {props.currentCount} of {props.totalCount}
      </Label>
    </Container>
  )
}
