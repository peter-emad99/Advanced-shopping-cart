import React from 'react';
import storeItems from '../data/items.json';

import { CartItem as TCartItem, useShoppingCartContext } from '../Context/StoreContext';
import { Button, CloseButton, Stack } from 'react-bootstrap';
import formatCurrency from '../utilities/formatCurrency';

function CartItem({ id, quantity }: TCartItem) {
	const { removeFromCart } = useShoppingCartContext();
	let item = storeItems.find((item) => item.id === id);
	if (!item) return null;

	return (
		<Stack direction='horizontal' gap={2}>
			<img
				src={item.imgUrl}
				alt={item.name}
				style={{
					width: '125px',
					aspectRatio: '16/9',
					objectFit: 'cover',
				}}
				className='rounded-1 shadow-sm'
			/>
			<div className='d-flex flex-column'>
				<span>
					{item.name}
					{quantity > 1 && (
						<span
							className='text-muted '
							style={{
								fontSize: '0.3rem',
							}}
						>
							{' '}
							x{quantity}
						</span>
					)}
				</span>
				<span>{formatCurrency(item.price)}</span>
			</div>
			<div className='ms-auto fw-bold'>{formatCurrency(item.price * quantity)}</div>
			<Button onClick={(e) => removeFromCart(id)} size='sm' variant='outline-danger'>
				&times;
			</Button>
		</Stack>
	);
}

export default CartItem;
