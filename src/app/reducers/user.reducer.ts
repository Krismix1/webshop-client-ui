import { UserState } from './../store/store'

const INITIAL_STATE: UserState = { account: null }

export function userReducer (state: UserState = INITIAL_STATE, action: any) {
  switch (action.type) {
    default:
      return state
  }
}
