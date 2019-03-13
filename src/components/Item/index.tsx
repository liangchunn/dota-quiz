import React from 'react'
import styled, { css } from 'styled-components'

const Icon = styled('button')<{ img: string; disabled: boolean }>`
  width: 85px;
  height: 60px;
  background-image: url(${props => props.img});
  opacity: ${props => (props.disabled ? '0.5' : '1')};
  border: 2px solid black;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  &:hover {
    border: 2px solid red;
  }
`

type Props = {
  img: string
  name: string
  onClick?: any
  disabled?: boolean
}

function Item(props: Props): React.FunctionComponentElement<Props> {
  return (
    <Icon img={props.img} onClick={props.onClick} disabled={!!props.disabled} />
  )
}

export default Item
