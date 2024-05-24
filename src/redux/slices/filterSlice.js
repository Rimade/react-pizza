import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	value: '',
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload
		},
		setSearchValue(state, action) {
			state.searchValue = action.payload
		},
		setValue(state, action) {
			state.value = action.payload
		},
		setSort(state, action) {
			state.sort = action.payload
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload
		},
		setFilters(state, action) {
			if (Object.keys(action.payload).length) {
				state.currentPage = Number(action.payload.currentPage)
				state.categoryId = Number(action.payload.categoryId)
				state.sort = action.payload.sort
			} else {
				state.currentPage = 1
				state.categoryId = 0
				state.sort = {
					name: 'популярности',
					sortProperty: 'rating',
				}
			}
		},
	},
})

export const selectFilter = (state) => state.filter
export const selectSort = (state) => state.filter.sort
export const selectSearch = (state) => state.filter

export const {
	setCategoryId,
	setSort,
	setValue,
	setSearchValue,
	setCurrentPage,
	setFilters,
} = filterSlice.actions

export default filterSlice.reducer
