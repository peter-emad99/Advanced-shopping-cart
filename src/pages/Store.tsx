import React from 'react';
import storeItems from '../data/items.json';
import { Col, Row } from 'react-bootstrap';
import StoreItem from '../components/StoreItem';
function Store() {
	return (
		<>
			<h1>Store</h1>
			<Row md={2} xs={1} lg={3} className='g-3'>
				{storeItems.map((item) => {
					return (
						<Col key={item.id}>
							<StoreItem {...item}></StoreItem>
						</Col>
					);
				})}
			</Row>
		</>
	);
}

export default Store;
