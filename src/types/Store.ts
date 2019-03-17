import { generateChoice } from '../store/game/generateChoice'

export namespace Store {
  export interface App {
    itemList: string[]
    currentIndex: number
    answer: ReturnType<typeof generateChoice>['answer']
    choices: ReturnType<typeof generateChoice>['choices']
    guesses: (number | null)[]
    score: number
    choiceLength: number
    gameState: 'WAITING' | 'SUCCESS' | 'FAIL' | 'GAME_OVER' | 'GAME_WON'
    tries: number
    streak: number
    highestStreak: number
    gameMode: 'NONE' | 'CLASSIC' | 'HARDCORE_CLASSIC' | 'TIMED'
  }
  export interface TimerProgress {
    progress: number
  }
  export interface All {
    App: App
    TimerProgress: TimerProgress
  }
}
