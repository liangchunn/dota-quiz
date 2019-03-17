import React from 'react'
import styled from 'styled-components'

const Wrapper = styled('div')`
  width: 100%;
  height: 25px;
  background-color: #f8bbd0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InnerWrapper = styled('div')`
  display: flex;
  max-width: 600px;
  width: 600px;
`

const Title = styled('p')`
  text-transform: uppercase;
  margin: 0;
  padding: 0 8px 0 8px;
  font-weight: 700;
`

export function SuperHeader(): React.FunctionComponentElement<{}> {
  return (
    <Wrapper>
      <InnerWrapper>
        <Title>Dota Quiz</Title>
      </InnerWrapper>
    </Wrapper>
  )
}
