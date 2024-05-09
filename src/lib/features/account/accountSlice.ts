import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  items: string[]
}

const initialState: CounterState = {
  items: []
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    getAccount: (state, action) => {
      state.items.push(action.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { getAccount } = accountSlice.actions

export default accountSlice.reducer
