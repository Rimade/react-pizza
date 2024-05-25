import React, { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import qs from 'qs'

import {
	Categories,
	Skeleton,
	Sort,
	PizzaBlock,
	Pagination,
} from '../components'

import { sortList } from '../components/Sort'
import { setCategoryId } from '../redux/filter/slice'
import { selectFilter, selectSearch } from '../redux/filter/selectors'
import { useAppDispatch } from '../redux/store'
import { selectPizzaData } from '../redux/pizza/selectors'
import { fetchPizzas } from '../redux/pizza/asyncActions'

const Home: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const { categoryId, currentPage, sort } = useSelector(selectFilter)
	const { items, status } = useSelector(selectPizzaData)
	const { searchValue } = useSelector(selectSearch)

	const getPizzas = async () => {
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''
		dispatch(
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				currentPage: String(currentPage),
			})
		)

		window.scrollTo(0, 0)
	}
	// useEffect(() => {
	// 	if (isMounted.current) {
	// 		const queryString = qs.stringify(
	// 			{
	// 				sortProperty: sort.sortProperty,
	// 				categoryId: categoryId > 0 ? categoryId : null,
	// 				currentPage,
	// 			},
	// 			{ skipNulls: true }
	// 		)

	// 		navigate(`?${queryString}`)
	// 	}

	// 	if (!window.location.search) {
	// 		dispatch(fetchPizzas({} as SearchPizzaParams))
	// 	}
	// 	isMounted.current = true
	// }, [categoryId, sort, searchValue, currentPage])

	// useEffect(() => {
	// 	if (window.location.search) {
	// 		const params = qs.parse(
	// 			window.location.search.substring(1)
	// 		) as unknown as SearchPizzaParams

	// 		const sort = sortList.find((obj) => obj.sortProperty === params.sortBy)

	// 		dispatch(
	// 			setFilters({
	// 				searchValue: params.search,
	// 				categoryId: Number(params.category),
	// 				currentPage: Number(params.currentPage),
	// 				sort: sort || sortList[0],
	// 			})
	// 		)
	// 		isSearch.current = true
	// 	}
	// }, [])

	useEffect(() => {
		if (!isSearch.current) {
			getPizzas()
		}

		isSearch.current = false
	}, [categoryId, sort, searchValue, currentPage])

	const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)

	const skeletons = [...new Array(4)].map((_, index) => (
		<Skeleton key={index} />
	))

	const onChangeCategory = useCallback((idx: number) => {
		dispatch(setCategoryId(idx))
	}, [])

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort value={sort} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === 'error' ? (
				<div className="content__error-info">
					<h2>Произошла ошибка 😟</h2>
					<p>К сожалению, не удалось получить питсы. Попробуйте позже...</p>
				</div>
			) : (
				<div className="content__items">
					{status === 'loading' ? skeletons : pizzas}
				</div>
			)}
			<Pagination />
		</div>
	)
}

export default Home
