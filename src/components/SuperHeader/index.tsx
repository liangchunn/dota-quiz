import React from 'react'
import styled from 'styled-components'
import { Store } from '../../types/Store'
import { connect } from 'react-redux'
import { clearGameMode } from '../../store/actions/appActions'
import { Dispatch } from 'redux'

const Wrapper = styled('div')`
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`

const InnerWrapper = styled('div')`
  display: flex;
  max-width: 600px;
  width: 600px;
  justify-content: space-between;
`

const Title = styled('p')`
  text-transform: uppercase;
  margin: 0;
  padding: 0 8px 0 8px;
  font-weight: 700;
`

const TitleButton = styled(Title)`
  color: #673ab7;
  user-select: none;
  cursor: pointer;
`

const Meter = styled(`div`)`
  height: 5px;
  background: #555;
  width: 100%;
  z-index: 1;
`

const MeterBar = styled('span')<{ progress: number }>`
  height: 100%;
  position: relative;
  width: ${props => props.progress}%;
  display: block;
  overflow: hidden;
  background-color: #f8bbd0;
  transition: width 0.1s linear;
`

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearGameMode: clearGameMode(dispatch)
})

const mapStateToProps = (state: Store.All) => ({
  progress: state.TimerProgress.progress,
  gameMode: state.App.gameMode
})

export const SuperHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(function(
  props: ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>
): React.FunctionComponentElement<{}> {
  return (
    <>
      <Wrapper>
        <InnerWrapper>
          <Title>THE SHOPKEEPER'S QUIZ</Title>
          {props.gameMode !== 'NONE' && (
            <TitleButton onClick={props.clearGameMode}>MODE SELECT</TitleButton>
          )}
        </InnerWrapper>
      </Wrapper>
      <Meter>
        <MeterBar progress={props.progress} />
      </Meter>
    </>
  )
})
