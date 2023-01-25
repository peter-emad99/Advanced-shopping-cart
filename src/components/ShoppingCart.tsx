import React from 'react';
import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCartContext } from '../Context/StoreContext';
import CartItem from './CartItem';
import formatCurrency from '../utilities/formatCurrency';
import storeItems from '../data/items.json';

function ShoppingCart() {
	const { closeCart, isOpen, cartItems } = useShoppingCartContext();

	function totalPrice() {
		let totalPrice = cartItems.reduce((total, cartItem) => {
			let item = storeItems.find((i) => i.id === cartItem.id);
			// return item?.price||0 * cartItem.quantity + total;
			if (item) {
				return item.price * cartItem.quantity + total;
			} else {
				return total;
			}
		}, 0);
		return formatCurrency(totalPrice);
	}
	return (
		<Offcanvas show={isOpen} onHide={closeCart} placement='end'>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Shopping Cart</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Stack gap={3}>
					{cartItems.map((item) => (
						<CartItem key={item.id} {...item} />
					))}
					{cartItems.length > 0 && (
						<div className='ms-auto me-auto fw-bolder fs-5'>Total: {totalPrice()}</div>
					)}
				</Stack>
			</Offcanvas.Body>
		</Offcanvas>
	);
}

export default ShoppingCart;
