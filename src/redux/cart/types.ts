export type CartItem = {
	id: string
	title: string
	price: number
	imageUrl: string
	type: string
	size: number
	count: number
}

export interface CartItemProps {
	id: string
	price: number
	size: number
	title: string
	type: number
	imageUrl: string
	count: number
}

export interface CartSliceState {
	totalPrice: number
	items: CartItem[]
}
