import React from 'react'
import styled from 'styled-components'

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

export function Header(props: Props): React.FunctionComponentElement<Props> {
  return (
    <Container>
      <Label>{props.triesLeft} tries left</Label>
      <Label>
        x{props.streak} (+{props.streakBonus})
      </Label>
      <Label>
        {props.currentCount} of {props.totalCount}
      </Label>
    </Container>
  )
}
