export type Pizza = {
	id: string
	title: string
	price: number
	imageUrl: string
	type: number
	size: number
	count: number
}

export type SearchPizzaParams = {
	sortBy: string
	order: string
	category: string
	search: string
	currentPage: string
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface PizzaSliceState {
	items: Pizza[]
	status: Status
}
