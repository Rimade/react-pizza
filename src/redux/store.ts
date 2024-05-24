import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import filter from './slices/filterSlice'
import pizza from './slices/pizzaSlice'
import search from './slices/searchSlice'
import cart from './slices/cart/slice'

export const store = configureStore({
	reducer: { filter, search, cart, pizza },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
