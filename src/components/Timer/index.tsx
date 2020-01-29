import React, { useEffect, useState } from 'react'
import { TIMER_BASE_TIME_MS } from '../../util/constants'
import { Store } from '../../types/Store'

const TICK_INTERVAL = 100

type Props = {
  triesLeft: number
  gameState: Store.App['gameState']
  reduceTries: () => any
  setProgress: (progress: number) => any
}

export function Timer(props: Props): React.FunctionComponentElement<Props> {
  const [prevTries, setPrevTries] = useState<null | number>(null)
  const [prevGameState, setPrevGameState] = useState<
    null | Store.App['gameState']
  >(null)
  const [countdown, setCountdown] = useState(TIMER_BASE_TIME_MS)
  if (props.triesLeft !== prevTries) {
    setPrevTries(props.triesLeft)
  }
  if (props.gameState !== prevGameState) {
    setPrevGameState(props.gameState)
  }
  if (
    props.triesLeft !== prevTries ||
    (props.gameState === 'WAITING' && prevGameState === 'SUCCESS')
  ) {
    setCountdown(TIMER_BASE_TIME_MS)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        countdown > 0 &&
        (prevGameState === 'WAITING' || prevGameState === 'FAIL') &&
        props.triesLeft > 0
      ) {
        setCountdown(countdown - TICK_INTERVAL)
        props.setProgress(
          ((countdown - TICK_INTERVAL) / TIMER_BASE_TIME_MS) * 100
        )
      }
      if (countdown <= 0 && props.triesLeft > 0) {
        props.reduceTries()
      }
    }, TICK_INTERVAL)
    return () => {
      clearTimeout(timer)
    }
  })
  return null as any
}
