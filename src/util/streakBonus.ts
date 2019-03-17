import { BASE_POINTS } from './constants'

export const calculateStreakBonus = (streak: number) => {
  return Math.pow(streak, 2) * 0.01 * BASE_POINTS
}
