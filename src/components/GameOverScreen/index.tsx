import React from 'react'
import { Store } from '../../types/Store'
import styled, { keyframes } from 'styled-components'
import { sample } from 'lodash'
import { LOSE_TEXT, WIN_TEXT } from '../../util/constants'
import { ModalWrapper, Modal } from '../Modal'
import { getGameModeString } from '../../util/getGameModeString'

type Props = {
  score: Store.App['score']
  highestStreak: Store.App['highestStreak']
  gameState: Store.App['gameState']
  currentCount: number
  handleRestart: () => any
  handleModeReselect: () => any
  children?: React.ReactNode
  currentItemElement: JSX.Element
  answerElement: JSX.Element[]
  gameMode: Store.App['gameMode']
}

const GameOverWrapperKeyFrames = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const GameOverModalKeyFrames = keyframes`
  from {
    transform: scale(0.75);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`

const GameOverWrapper = styled(ModalWrapper)`
  transform-origin: top center;
  animation: ${GameOverWrapperKeyFrames} 0.5s ease;
`

const GameOverModal = styled(Modal)`
  animation: ${GameOverModalKeyFrames} 0.5s ease;
`

const Title = styled('h1')`
  margin: 0 0 8px 0;
  text-align: center;
`

const Score = styled('h2')`
  margin: 0;
  font-size: 4rem;
`

const Label = styled('p')`
  margin: 0;
  text-transform: uppercase;
  color: grey;
  font-weight: 500;
  font-size: 0.75rem;
`

const GameModeLabel = styled(Label)`
  color: black;
  margin-bottom: 8px;
`

const BoxWrapper = styled('div')`
  display: flex;
  & > div {
    margin: 16px;
  }
`

const Box = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RetryButton = styled('button')`
  border: 2px solid black;
  font-size: 1.5rem;
  border-radius: 4px;
  margin: 8px;
`

const ItemsWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  & > div {
    margin: 4px;
  }
`

const Items = styled('div')`
  display: flex;
  margin-bottom: 8px;
  flex-wrap: wrap;
  justify-content: center;
  & > div {
    margin: 4px;
  }
`

export function GameOverScreen(
  props: Props
): React.FunctionComponentElement<Props> {
  return (
    <GameOverWrapper>
      <GameOverModal>
        <Title>
          {props.gameState === 'GAME_OVER'
            ? sample(LOSE_TEXT)
            : sample(WIN_TEXT)}
        </Title>
        <GameModeLabel>MODE: {getGameModeString(props.gameMode)}</GameModeLabel>
        {props.gameState === 'GAME_OVER' && (
          <ItemsWrapper>
            <Items>{props.currentItemElement}</Items>
            <Items>{props.answerElement}</Items>
          </ItemsWrapper>
        )}
        <Box>
          <Label>Your final score</Label>
          <Score>{props.score}</Score>
        </Box>
        <BoxWrapper>
          <Box>
            <Label>Highest Streak</Label>
            <Score>{props.highestStreak}</Score>
          </Box>
          <Box>
            <Label>Completed Items</Label>
            <Score>
              {props.gameState === 'GAME_OVER'
                ? props.currentCount - 1
                : props.currentCount}
            </Score>
          </Box>
        </BoxWrapper>

        <RetryButton onClick={props.handleRestart}>
          {props.gameState === 'GAME_OVER' ? 'Retry' : 'Start Over'}
        </RetryButton>
        <RetryButton onClick={props.handleModeReselect}>
          Change Game Mode
        </RetryButton>
      </GameOverModal>
    </GameOverWrapper>
  )
}
