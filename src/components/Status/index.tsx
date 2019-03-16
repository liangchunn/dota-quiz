import React, { memo, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Store } from '../../types/Store'

type Props = {
  gameState: Store.App['gameState']
  nextHandler: () => any
}

const StateKeyFrames = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
`

const GameOverKeyFrames = keyframes`
  from {
    transform: scale(3);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`

const State = styled('div')`
  display: block;
  font-weight: 700;
  font-size: 2rem;
  opacity: 0;
  animation: ${StateKeyFrames} 0.5s linear;
`

const GameOverState = styled(State)`
  opacity: 1;
  animation ${GameOverKeyFrames} 1s ease;
`

export const Status = memo(function(
  props: Props
): React.FunctionComponentElement<Props> {
  useEffect(() => {
    if (props.gameState === 'SUCCESS') {
      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        props.nextHandler()
      }, 750)
    }
  }, [props.gameState])

  switch (props.gameState) {
    case 'SUCCESS':
      return <State>Correct!</State>
    case 'FAIL':
      return <State>Wrong!</State>
    case 'GAME_OVER':
      return <GameOverState>Game Over!</GameOverState>
    default:
      return <State key={'None'}> ‏‏‎ </State>
  }
})
