import React from 'react'
import styled, { css } from 'styled-components'

const Icon = styled('div')<{ img: string; disabled: boolean }>`
  width: 85px;
  height: 65px;
  background-image: url(${props => props.img});
  background-position: center;
  background-size: cover;
  opacity: ${props => (props.disabled ? '0.5' : '1')};
  cursor: pointer;
  outline: none;
`

const NameTag = styled('span')`
  padding: 4px;
  text-shadow: 0px 0px 2px black;

  position: absolute;
  bottom: 0px;
  font-weight: bold;
  font-size: 0.75rem;
  color: white;
  user-select: none;
`

const Wrapper = styled('div')<{ gameOver: boolean }>`
  position: relative;
  ${props =>
    props.gameOver
      ? css`
          border: 2px solid red;
        `
      : css`
          border: 2px solid black;
        `}
  border-radius: 4px;
`

type Props = {
  img: string
  name: string
  onClick?: any
  disabled?: boolean
  gameOver?: boolean
}

function Item(props: Props): React.FunctionComponentElement<Props> {
  function handleClick() {
    if (!props.disabled && props.onClick) {
      props.onClick()
    }
  }
  return (
    <Wrapper gameOver={!!props.gameOver}>
      <Icon img={props.img} onClick={handleClick} disabled={!!props.disabled}>
        <NameTag>{props.name}</NameTag>
      </Icon>
    </Wrapper>
  )
}

export default Item
