import React from 'react';
import { Button, Card } from 'react-bootstrap';
import formatCurrency from '../utilities/formatCurrency';
import { useShoppingCartContext } from '../Context/StoreContext';
type StoreItemProps = {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
};
function StoreItem({ name, id, imgUrl, price }: StoreItemProps) {
	let { getItemQuantity, decrementItemQuantity, incrementItemQuantity, removeFromCart } =
		useShoppingCartContext();
	let quantity = getItemQuantity(id);
	return (
		<Card className='h-100'>
			<Card.Img
				variant='top'
				src={imgUrl}
				height='200px'
				style={{
					objectFit: 'cover',
				}}
			/>
			<Card.Body className='d-flex flex-column'>
				<Card.Title className='d-flex justify-content-between align-items-center mb-3 gap-2'>
					<span className='fs-2'>{name}</span>
					<span className='text-muted'>{formatCurrency(price)}</span>
				</Card.Title>
				<div className='mt-auto '>
					{quantity === 0 ? (
						<Button onClick={(e) => incrementItemQuantity(id)} className='w-100'>
							+ Add to Cart
						</Button>
					) : (
						<div className='d-flex flex-column justify-content-center align-items-center gap-2 '>
							<div className='d-flex align-items-center gap-2 '>
								<Button
									onClick={(e) => decrementItemQuantity(id)}
									className='d-flex align-items-center justify-content-center fs-5 fw-bold  '
									style={{
										padding: '1rem',
										lineHeight: '1',
										width: '2rem',
										height: '2rem',
									}}
								>
									-
								</Button>
								<span>
									<span className='fs-4'>{quantity}</span> in cart
								</span>
								<Button
									onClick={(e) => incrementItemQuantity(id)}
									className='d-flex align-items-center justify-content-center fs-5 fw-bold'
									style={{
										padding: '1rem',
										lineHeight: '1',
										width: '2rem',
										height: '2rem',
									}}
								>
									+
								</Button>
							</div>
							<div>
								<Button
									onClick={(e) => removeFromCart(id)}
									size='sm'
									variant='danger'
								>
									Remove
								</Button>
							</div>
						</div>
					)}
				</div>
			</Card.Body>
		</Card>
	);
}

export default StoreItem;
