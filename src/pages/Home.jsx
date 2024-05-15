import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Categories from './../components/Categories'
import Skeleton from './../components/PizzaBlock/Skeleton'
import Sort from './../components/Sort'
import PizzaBlock from './../components/PizzaBlock/index'
import Pagination from '../components/Pagination'

import { useSelector } from 'react-redux'

const API_URL = 'https://6570330709586eff6640e311.mockapi.io/items'

const Home = () => {
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const categoryId = useSelector((state) => state.filter.categoryId)
	const currentPage = useSelector((state) => state.filter.currentPage)
	const sortType = useSelector((state) => state.filter.sort)
	const searchValue = useSelector((state) => state.search.searchValue)

	useEffect(() => {
		setIsLoading(true)
		const sortBy = sortType.sortProperty.replace('-', '')
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''
		axios({
			method: 'get',
			url: `${API_URL}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		}).then((res) => {
			setItems(res.data)
			setIsLoading(false)
		})
		window.scrollTo(0, 0)
	}, [categoryId, sortType, searchValue, currentPage])

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
