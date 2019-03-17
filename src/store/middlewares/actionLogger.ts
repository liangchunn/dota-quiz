import { Middleware } from 'redux'
;(window as any).__GLOBAL_ACTIONS__ = []

export const actionLogger: Middleware = store => next => {
  return action => {
    ;(window as any).__GLOBAL_ACTIONS__.push([store.getState(), action])
    return next(action)
  }
}
