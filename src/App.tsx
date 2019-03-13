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

const Container = styled('div')`
  display: flex;
`

class App extends Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
> {
  nextChoice = () => {
    if (this.props.gameState === 'SUCCESS') {
      this.props.nextQuiz()
    }
  }
  restartGame = () => {
    if (this.props.gameState === 'GAME_OVER') {
      this.props.restartGame()
    }
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
      streak
    } = this.props
    const [current, total] = this.props.currentProgress
    const item = selectItem(currentItem)
    return (
      <div>
        <h2>Dota Quiz</h2>
        <h3>Score: {score} points</h3>
        <h3>Tries: {tries} left</h3>
        <h3>
          Streak: {streak} (+{Math.pow(streak, 2) * 0.01 * 200})
        </h3>
        <h3>
          {current} of {total}
        </h3>

        <Item
          img={process.env.REACT_APP_CDN_URL + item.img}
          name={item.dname}
        />
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
            console.log(guesses)
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
        <button disabled={gameState !== 'SUCCESS'} onClick={this.nextChoice}>
          NEXT
        </button>
        <button disabled={gameState !== 'GAME_OVER'} onClick={this.restartGame}>
          RESTART
        </button>
      </div>
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
