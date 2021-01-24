import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link, Route, Switch } from 'react-router-dom';
import Products from './pages/Shop';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { ProvideContext } from './utils/context';
import Header from './components/Header';
import 'rsuite/dist/styles/rsuite-default.css';
import Footer from './components/Footer';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100%;
`

function App() {
	return (
		<ProvideContext>
			<Router>
				<Wrapper>
					<Header />
					<Switch>
						<Route exact path="/cart" component={Cart} />
						<Route exact path="/shop/product/:id" component={Product} />
						<Route exact path="/shop" component={Products} />
						<Route exact path="/" component={Home} />
						<Route path="*" component={NotFound} />
					</Switch>
					<Footer />
				</Wrapper>
			</Router>
		</ProvideContext>
	);
}

export default App;
