import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Categories from './../components/Categories'
import Skeleton from './../components/PizzaBlock/Skeleton'
import Sort, { sortList } from './../components/Sort'
import PizzaBlock from './../components/PizzaBlock/index'
import Pagination from '../components/Pagination'

import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../redux/slices/filterSlice'

const qs = require('qs')

const API_URL = 'https://6570330709586eff6640e311.mockapi.io/items'

const Home = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const { categoryId, currentPage, sort } = useSelector((state) => state.filter)
	const searchValue = useSelector((state) => state.search.searchValue)

	const fetchPizzas = () => {
		setIsLoading(true)
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		axios({
			method: 'get',
			url: `${API_URL}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		})
			.then((res) => {
				setItems(res.data)
				setIsLoading(false)
			})
			.catch((err) => console.warn(err))
	}

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			})

			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sort, searchValue, currentPage])

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))

			const sort = sortList.find(
				(obj) => obj.sortProperty === params.sortProperty
			)

			dispatch(
				setFilters({
					...params,
					sort,
				})
			)
			isSearch.current = true
		}
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)

		if (!isSearch.current) {
			fetchPizzas()
		}

		isSearch.current = false
	}, [categoryId, sort, searchValue, currentPage])

	const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

	const skeletons = [...new Array(4)].map((_, index) => (
		<Skeleton key={index} />
	))

	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
			<Pagination />
		</div>
	)
}

export default Home
