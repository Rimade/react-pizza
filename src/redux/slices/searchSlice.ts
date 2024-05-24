import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface SearchSliceState {
	value: string
}

const initialState: SearchSliceState = {
	value: '',
}

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setValue(state, action) {
			state.value = action.payload
		},
	},
})

export const selectSearch = (state: RootState) => state.search

export const { setValue } = searchSlice.actions

export default searchSlice.reducer
