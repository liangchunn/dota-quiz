import React from 'react'
import { Store } from '../../types/Store'
import styled, { keyframes } from 'styled-components'
import { sample } from 'lodash'
import { LOSE_TEXT, WIN_TEXT } from '../../util/constants'

type Props = {
  score: Store.App['score']
  highestStreak: Store.App['highestStreak']
  gameState: Store.App['gameState']
  currentCount: number
  handleRestart: () => any
  children?: React.ReactNode
  currentItemElement: JSX.Element
  answerElement: JSX.Element[]
}

const WrapperKeyFrames = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const ModalKeyFrames = keyframes`
  from {
    transform: scale(0.75);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`

const Wrapper = styled('div')`
  transform-origin: top center;
  animation: ${WrapperKeyFrames} 0.5s ease;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  flex-direction: column;
  background-color: white;
`

const Modal = styled('div')`
  margin: 0 auto;
  display: flex;
  // width: 400px;
  padding: 16px;
  flex-direction: column;
  align-items: center;
  animation: ${ModalKeyFrames} 0.5s ease;
`

const Title = styled('h1')`
  margin: 0 0 16px 0;
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
    <Wrapper>
      <Modal>
        <Title>
          {props.gameState === 'GAME_OVER'
            ? sample(LOSE_TEXT)
            : sample(WIN_TEXT)}
        </Title>
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
      </Modal>
    </Wrapper>
  )
}
