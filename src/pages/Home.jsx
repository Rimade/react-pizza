import React, { useEffect, useState } from 'react'

import Categories from './../components/Categories'
import Skeleton from './../components/PizzaBlock/Skeleton'
import Sort from './../components/Sort'
import PizzaBlock from './../components/PizzaBlock/index'

const Home = () => {
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	// console.log(items)
	useEffect(() => {
		fetch('https://6570330709586eff6640e311.mockapi.io/items')
			.then((res) => res.json())
			.then((arr) => {
				setItems(arr)
				setIsLoading(false)
			})
	}, [])

	const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

	const skeletons = [...new Array(4)].map((_, index) => (
		<Skeleton key={index} />
	))

	return (
		<>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
		</>
	)
}

export default Home
