import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'
import { setCurrentPage } from '../../redux/filter/slice'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilter } from '../../redux/filter/selectors'

const Pagination: React.FC = () => {
	const dispatch = useDispatch()
	const { currentPage } = useSelector(selectFilter)

	return (
		<>
			<ReactPaginate
				className={styles.root}
				breakLabel="..."
				nextLabel=">"
				previousLabel="<"
				onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
				pageRangeDisplayed={4}
				pageCount={3}
				forcePage={currentPage - 1}
			/>
		</>
	)
}

export default Pagination
