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

function App() {
  return (
    <ProvideContext>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/shop/product/:id" component={Product} />
          <Route exact path="/shop" component={Products} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </ProvideContext>
  );
}

export default App;
