import React, { Component } from 'react'
import styled from 'styled-components'
import Game from './components/Game'
import ModeSelect from './components/ModeSelect'
import { Store } from './types/Store'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { selectGameMode } from './store/actions/appActions'

const AppContainer = styled('div')`
  max-width: 600px;
  margin: 0 auto;
`
const AppDescription = styled('p')`
  margin: 0;
  margin-top: 16px;
`

const AppDescriptionSuper = styled(AppDescription)`
  font-weight: 500;
  font-size: 1.25rem;
`

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
`

class App extends Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
> {
  selectClassic = () => this.props.selectGameMode('CLASSIC')
  selectHardcoreClassic = () => this.props.selectGameMode('HARDCORE_CLASSIC')
  selectTimed = () => this.props.selectGameMode('TIMED')

  render() {
    const { gameMode } = this.props
    return (
      <AppContainer>
        {gameMode === 'NONE' && (
          <Wrapper>
            <AppDescriptionSuper>
              Test your Dota 2 item knowledge
            </AppDescriptionSuper>
            <AppDescription>Select a mode to begin</AppDescription>
            <ModeSelect
              selectClassic={this.selectClassic}
              selectHardcoreClassic={this.selectHardcoreClassic}
              selectTimed={this.selectTimed}
            />
          </Wrapper>
        )}
        {gameMode !== 'NONE' && <Game />}
      </AppContainer>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectGameMode: selectGameMode(dispatch)
})

const mapStateToProps = (state: Store.All) => ({
  gameMode: state.App.gameMode
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
