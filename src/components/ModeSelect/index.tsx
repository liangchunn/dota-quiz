import React from 'react'
import styled from 'styled-components'

const BoxWrapper = styled('div')`
  display: flex;
  justify-content: center;
  margin: 16px;
`

const BoxInner = styled('div')`
  display: flex;
  flex-direction: column;
`

const Box = styled('button')`
  border: 2px solid black;
  border-radius: 4px;
  height: 50px;
  font-size: 1.5rem;
  margin-bottom: 16px;
`

type Props = {
  selectClassic: () => any
  selectHardcoreClassic: () => any
  selectTimed: () => any
}

class ModeSelect extends React.Component<Props> {
  render() {
    return (
      <BoxWrapper>
        <BoxInner>
          <Box onClick={this.props.selectClassic}>Classic</Box>
          <Box onClick={this.props.selectHardcoreClassic}>Hardcore Classic</Box>
          <Box onClick={this.props.selectTimed}>Timed Classic</Box>
        </BoxInner>
      </BoxWrapper>
    )
  }
}

export default ModeSelect
