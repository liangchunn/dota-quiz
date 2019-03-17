import React from 'react'
import styled from 'styled-components'
import { GameOverScreen } from '../GameOverScreen'
import Item from '../Item'
import { selectItemById } from '../../util/selectItemData'
import { Status } from '../Status'
import { Score } from '../Score'
import { connect } from 'react-redux'
import {
  removeGuess,
  toggleGuess,
  restartGame,
  nextQuiz,
  addGuess,
  clearGameMode,
  reduceTries
} from '../../store/actions/appActions'
import { Dispatch } from 'redux'
import {
  selectCurrentItem,
  selectCurrentChoices,
  selectCurrentGuessState,
  selectCurrentGuesses,
  selectCurrentProgress
} from '../../store/selectors/appSelector'
import { Store } from '../../types/Store'
import { Header } from '../Header'
import { calculateStreakBonus } from '../../util/streakBonus'
import { Timer } from '../Timer'
import { setProgress } from '../../store/actions/progressBarActions'

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

class Game extends React.Component<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
> {
  nextChoice = () => {
    this.props.nextQuiz()
  }
  restartGame = () => {
    this.props.restartGame()
  }
  clearGameMode = () => {
    this.props.clearGameMode()
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
      highestStreak,
      gameMode
    } = this.props
    const [current, total] = this.props.currentProgress
    const streakBonus = calculateStreakBonus(streak)
    const item = selectItemById(currentItem)
    return (
      <div>
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
            handleModeReselect={this.clearGameMode}
            gameState={gameState}
            gameMode={gameMode}
            currentItemElement={
              <Item
                img={process.env.REACT_APP_CDN_URL + item.img}
                name={item.dname}
              />
            }
            answerElement={guesses.map(guess => {
              if (guess !== null) {
                const item = selectItemById(guess)
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
        {gameMode === 'TIMED' && (
          <Timer
            triesLeft={tries}
            reduceTries={this.props.reduceTries}
            gameState={gameState}
            setProgress={this.props.setProgress}
          />
        )}
        <Container>
          <Item
            img={process.env.REACT_APP_CDN_URL + item.img}
            name={item.dname}
          />
        </Container>
        <Container>
          {guesses.map((guess, index) => {
            if (guess !== null) {
              const item = selectItemById(guess)
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
            const item = selectItemById(choice)
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
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleGuess: toggleGuess(dispatch),
  removeGuess: removeGuess(dispatch),
  addGuess: addGuess(dispatch),
  nextQuiz: nextQuiz(dispatch),
  restartGame: restartGame(dispatch),
  clearGameMode: clearGameMode(dispatch),
  reduceTries: reduceTries(dispatch),
  setProgress: setProgress(dispatch)
})

const mapStateToProps = (state: Store.All) => ({
  gameState: state.App.gameState,
  score: state.App.score,
  tries: state.App.tries,
  streak: state.App.streak,
  highestStreak: state.App.highestStreak,
  gameMode: state.App.gameMode,
  currentItem: selectCurrentItem(state),
  choices: selectCurrentChoices(state),
  guesses: selectCurrentGuessState(state),
  guessesIndex: selectCurrentGuesses(state),
  currentProgress: selectCurrentProgress(state)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
