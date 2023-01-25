import { current } from 'immer';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { useLocalStorage } from '../hooks/useLocaleStorage';

type ShoppingProviderProps = {
	children: ReactNode;
};
export type CartItem = {
	id: number;
	quantity: number;
};
interface ShoppingCartContext {
	getItemQuantity(id: number): number;
	incrementItemQuantity(id: number): void;
	decrementItemQuantity(id: number): void;
	removeFromCart(id: number): void;
	cartItems: CartItem[];
	cartQuantity: number;
	isOpen: boolean;
	openCart(): void;
	closeCart(): void;
}
const ShoppingCartContext = createContext({} as ShoppingCartContext);

function useShoppingCartContext() {
	return useContext(ShoppingCartContext);
}
function ShoppingCartProvider({ children }: ShoppingProviderProps) {
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);
	const [isOpen, setIsOpen] = useLocalStorage('isOpen', false);

	const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	function getItemQuantity(id: number) {
		return cartItems.find((item) => item.id === id)?.quantity || 0;
	}
	function incrementItemQuantity(id: number) {
		setCartItems((currItems) => {
			let item = currItems.find((i) => i.id === id);
			if (item == null) {
				currItems.push({ id, quantity: 1 });
			} else {
				currItems[currItems.indexOf(item)].quantity++;
			}
		});
	}
	function decrementItemQuantity(id: number) {
		setCartItems((currItems) => {
			let item = currItems.find((i) => i.id === id);
			if (item == null) {
				return;
			} else if (item.quantity === 1) {
				currItems.splice(currItems.indexOf(item), 1);
				// return currItems.filter((item) => item.id !== id);
			} else {
				currItems[currItems.indexOf(item)].quantity--;
			}
		});
	}
	function removeFromCart(id: number) {
		setCartItems((currItems) => {
			let item = currItems.find((i) => i.id === id);
			if (item) {
				currItems.splice(currItems.indexOf(item), 1);
			}
			// return currItems.filter((item) => item.id !== id);
		});
	}
	return (
		<ShoppingCartContext.Provider
			value={{
				getItemQuantity,
				incrementItemQuantity,
				decrementItemQuantity,
				removeFromCart,
				cartItems,
				cartQuantity,
				openCart,
				closeCart,
				isOpen,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
}
export { useShoppingCartContext, ShoppingCartProvider };
