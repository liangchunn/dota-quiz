import { Store } from '../types/Store'

export const getGameModeString = (gameMode: Store.App['gameMode']) => {
  switch (gameMode) {
    case 'CLASSIC':
      return 'Classic'
    case 'HARDCORE_CLASSIC':
      return 'Hardcore Classic'
    case 'TIMED':
      return 'Timed'
  }
}
