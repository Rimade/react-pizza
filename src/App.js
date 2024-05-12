import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Categories from './components/Categories'
import Sort from './components/Sort'
import PizzaBlock from './components/PizzaBlock'
import './scss/app.scss'
import Skeleton from './components/PizzaBlock/Skeleton'

function App() {
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
		<div className="App">
			<div className="wrapper">
				<Header />
				<div className="content">
					<div className="container">
						<div className="content__top">
							<Categories />
							<Sort />
						</div>
						<h2 className="content__title">Все пиццы</h2>
						<div className="content__items">
							{isLoading ? skeletons : pizzas}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
