import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import NotFound from './pages/NotFound';
import TheNavBar from './components/TheNavBar';
import { ShoppingCartProvider } from './Context/StoreContext';
import ShoppingCart from './components/ShoppingCart';

function App() {
	return (
		<>
			<ShoppingCartProvider>
				<TheNavBar />
				<Container className='mb-4'>
					<Routes>
						<Route path={'/'} element={<Home />} />
						<Route path='/store' element={<Store />} />
						<Route path='/about' element={<About />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</Container>
				<ShoppingCart />
			</ShoppingCartProvider>
		</>
	);
}

export default App;
