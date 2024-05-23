import React, { memo } from 'react'
// import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate'
// import { selectFilter, setCategoryId } from '../redux/slices/filterSlice'
// import { useDispatch, useSelector } from 'react-redux'

type CategoriesProps = {
	value: number
	onChangeCategory: (idx: number) => void
}

const categories = [
	'Все',
	'Мясные',
	'Вегетарианские',
	'Гриль',
	'Острые',
	'Закрытые',
]
const Categories: React.FC<CategoriesProps> = memo(
	({ onChangeCategory, value }) => {
		// const dispatch = useDispatch()
		// const { categoryId } = useSelector(selectFilter)
		// useWhyDidYouUpdate('Categories', { value, onChangeCategory })

		return (
			<div className="categories">
				<ul>
					{categories.map((categoryName, index) => (
						<li
							key={index}
							onClick={() => onChangeCategory(index)}
							className={value === index ? 'active' : ''}
						>
							{categoryName}
						</li>
					))}
				</ul>
			</div>
		)
	}
)

export default Categories
