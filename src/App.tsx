import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import './scss/app.scss'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const NotFound = lazy(
	() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
)
const FullPizza = lazy(
	() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza')
)

const App: React.FC = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="" element={<Home />} />
					<Route
						path="cart"
						element={
							<Suspense fallback={<div>Loading...</div>}>
								<Cart />
							</Suspense>
						}
					/>
					<Route
						path="pizza/:id"
						element={
							<Suspense fallback={<div>Loading...</div>}>
								<FullPizza />
							</Suspense>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
