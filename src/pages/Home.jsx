import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Categories from './../components/Categories'
import Skeleton from './../components/PizzaBlock/Skeleton'
import Sort from './../components/Sort'
import PizzaBlock from './../components/PizzaBlock/index'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'

const API_URL = 'https://6570330709586eff6640e311.mockapi.io/items'

const Home = () => {
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [categoryId, setCategoryId] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sortProperty: 'rating',
	})
	const { searchValue } = React.useContext(SearchContext)

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
				<Categories
					value={categoryId}
					onChangeCategory={(id) => setCategoryId(id)}
				/>
				<Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
			<Pagination
				currentPage={currentPage}
				onChangePage={(number) => setCurrentPage(number)}
			/>
		</div>
	)
}

export default Home
