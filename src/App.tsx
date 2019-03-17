import React, { Component } from 'react'
import Item from './components/Item'
import { Store } from './types/Store'
import { connect } from 'react-redux'
import {
  selectCurrentItem,
  selectCurrentChoices,
  selectCurrentGuessState,
  selectCurrentGuesses,
  selectCurrentProgress
} from './store/selectors/appSelector'
import { selectItem } from './util/selectItemData'
import styled from 'styled-components'
import { Dispatch } from 'redux'
import {
  toggleGuess,
  removeGuess,
  addGuess,
  nextQuiz,
  restartGame
} from './store/actions/appActions'
import { Status } from './components/Status'
import { Score } from './components/Score'
import { Header } from './components/Header'
import { GameOverScreen } from './components/GameOverScreen'

const AppContainer = styled('div')`
  max-width: 600px;
  margin: 0 auto;
`

const Container = styled('div')`
  display: flex;
  justify-content: center;
  max-width: 100%;
  flex-wrap: wrap;
  margin-bottom: 8px;
  & > div {
    margin: 8px;
  }
`

const StatusContainer = styled('div')`
  display: flex;
  justify-content: center;
  margin-bottom: 0px;
`

class App extends Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
> {
  nextChoice = () => {
    this.props.nextQuiz()
  }
  restartGame = () => {
    this.props.restartGame()
  }
  render() {
    const {
      currentItem,
      choices,
      guesses,
      guessesIndex,
      gameState,
      score,
      tries,
      streak,
      highestStreak
    } = this.props
    const [current, total] = this.props.currentProgress
    const streakBonus = Math.pow(streak, 2) * 0.01 * 200
    const item = selectItem(currentItem)
    return (
      <AppContainer>
        <Header
          triesLeft={tries}
          streak={streak}
          streakBonus={streakBonus}
          currentCount={current}
          totalCount={total}
        />
        {(gameState === 'GAME_OVER' || gameState === 'GAME_WON') && (
          <GameOverScreen
            score={score}
            highestStreak={highestStreak}
            currentCount={current}
            handleRestart={this.restartGame}
            gameState={gameState}
            currentItemElement={
              <Item
                img={process.env.REACT_APP_CDN_URL + item.img}
                name={item.dname}
              />
            }
            answerElement={guesses.map(guess => {
              if (guess !== null) {
                const item = selectItem(guess)
                return (
                  <Item
                    img={process.env.REACT_APP_CDN_URL + item.img}
                    name={item.dname}
                  />
                )
              } else {
                return <Item img={''} name={''} />
              }
            })}
          />
        )}
        <StatusContainer>
          <Status gameState={gameState} nextHandler={this.nextChoice} />
        </StatusContainer>
        <Container>
          <Item
            img={process.env.REACT_APP_CDN_URL + item.img}
            name={item.dname}
          />
        </Container>
        <Container>
          {guesses.map((guess, index) => {
            if (guess !== null) {
              const item = selectItem(guess)
              return (
                <Item
                  img={process.env.REACT_APP_CDN_URL + item.img}
                  name={item.dname}
                  onClick={() => this.props.removeGuess(index)}
                />
              )
            } else {
              return <Item img={''} name={''} />
            }
          })}
        </Container>
        <Container>
          {choices.map((choice, index) => {
            const item = selectItem(choice)
            return (
              <Item
                img={process.env.REACT_APP_CDN_URL + item.img}
                name={item.dname}
                onClick={() => this.props.addGuess(index)}
                disabled={!!~guessesIndex.indexOf(index)}
              />
            )
          })}
        </Container>
        <Container>
          <Score score={score} />
        </Container>
      </AppContainer>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleGuess: toggleGuess(dispatch),
  removeGuess: removeGuess(dispatch),
  addGuess: addGuess(dispatch),
  nextQuiz: nextQuiz(dispatch),
  restartGame: restartGame(dispatch)
})

const mapStateToProps = (state: Store.All) => ({
  gameState: state.App.gameState,
  score: state.App.score,
  tries: state.App.tries,
  streak: state.App.streak,
  highestStreak: state.App.highestStreak,
  currentItem: selectCurrentItem(state),
  choices: selectCurrentChoices(state),
  guesses: selectCurrentGuessState(state),
  guessesIndex: selectCurrentGuesses(state),
  currentProgress: selectCurrentProgress(state)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
