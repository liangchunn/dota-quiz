import React, { memo, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { sample } from 'lodash'
import { Store } from '../../types/Store'
import { ENCOURAGEMENT_TEXT } from '../../util/constants'

type Props = {
  gameState: Store.App['gameState']
  nextHandler: () => any
}

const StateKeyFrames = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-30px);
    opacity: 0;
  }
`

const State = styled('div')`
  display: block;
  font-weight: 700;
  font-size: 1.5rem;
  opacity: 0;
  margin: 0;
  animation: ${StateKeyFrames} 0.5s linear;
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
      return <State>{sample(ENCOURAGEMENT_TEXT)}</State>
    case 'FAIL':
      return <State>Wrong!</State>
    default:
      return <State key={'None'}> ‏‏‎ </State>
  }
})
