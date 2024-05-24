import { createAsyncThunk } from '@reduxjs/toolkit'
import { Pizza, SearchPizzaParams } from './types'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	'pizza/fetchPizzaStatus',
	async (params) => {
		const API_URL = 'https://6570330709586eff6640e311.mockapi.io/items'
		const { sortBy, order, category, search, currentPage } = params
		const { data } = await axios.get<Pizza[]>(
			`${API_URL}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)

		return data
	}
)
