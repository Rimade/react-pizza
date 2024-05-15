import React from 'react'
import { setCategoryId } from '../redux/slices/filterSlice'
import { useDispatch, useSelector } from 'react-redux'

function Categories() {
	const dispatch = useDispatch()
	const categoryId = useSelector((state) => state.filter.categoryId)
	const categories = [
		'Все',
		'Мясные',
		'Вегетарианские',
		'Гриль',
		'Острые',
		'Закрытые',
	]

	return (
		<div className="categories">
			<ul>
				{categories.map((categoryName, index) => (
					<li
						key={index}
						onClick={() => dispatch(setCategoryId(index))}
						className={categoryId === index ? 'active' : ''}
					>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
