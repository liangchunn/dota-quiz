import React, { memo } from 'react'
import styled, { keyframes } from 'styled-components'
import { Store } from '../../types/Store'

type Props = {
  score: Store.App['score']
}

const ScoreKeyFrames = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
`

const ScoreLabel = styled('div')`
  font-weight: 700;
  animation: ${ScoreKeyFrames} 0.5s ease;
  font-size: 1.75rem;
`

export const Score = memo(function(
  props: Props
): React.FunctionComponentElement<Props> {
  return <ScoreLabel key={Math.random()}>{props.score}</ScoreLabel>
})
