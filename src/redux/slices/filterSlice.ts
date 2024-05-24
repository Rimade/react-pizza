import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum SortPropertyEnum {
	RATING_DESC = 'rating',
	RATING_ASC = '-rating',
	TITLE_DESC = 'title',
	TITLE_ASC = '-title',
	PRICE_DESC = 'price',
	PRICE_ASC = '-price',
}

export type Sort = {
	name: string
	sortProperty: SortPropertyEnum
}

export interface FilterSliceState {
	categoryId: number
	sort: Sort
	currentPage: number
	searchValue: string
	// value: string
}

const initialState: FilterSliceState = {
	searchValue: '',
	// value: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности',
		sortProperty: SortPropertyEnum.RATING_DESC,
	},
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
		// setValue(state, action: PayloadAction<string>) {
		// 	state.value = action.payload
		// },
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setFilters(state, action: PayloadAction<FilterSliceState>) {
			if (Object.keys(action.payload).length) {
				state.currentPage = Number(action.payload.currentPage)
				state.categoryId = Number(action.payload.categoryId)
				state.sort = action.payload.sort
			} else {
				state.currentPage = 1
				state.categoryId = 0
				state.sort = {
					name: 'популярности',
					sortProperty: SortPropertyEnum.RATING_DESC,
				}
			}
		},
	},
})

export const selectFilter = (state: RootState) => state.filter
export const selectSearch = (state: RootState) => state.filter
export const selectSort = (state: RootState) => state.filter.sort

export const {
	setCategoryId,
	setSort,
	setCurrentPage,
	setFilters,
	setSearchValue,
	// setValue,
} = filterSlice.actions

export default filterSlice.reducer
