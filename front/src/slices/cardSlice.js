import { createSlice } from '@reduxjs/toolkit'

export const cardSlice = createSlice({
  name: 'Card',
  // Define initial state of the reducer/slice
  initialState: {
    current_card:{},
  },
  // Define the reducers 
  reducers: {
    update_selected_card: (state, action) => {
        state.current_card = action.payload
    },
}
})

// Action creators are generated for each case reducer function
export const { update_selected_card } = cardSlice.actions

export default cardSlice.reducer