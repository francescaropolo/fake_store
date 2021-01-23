import React, { useState } from 'react';

const useCommonContext = () => {
	const [cartItems, setCartItems] = useState([]);
	const [showCart, setShowCart] = useState(false);
	const theme = {
		primary: '#FF9000',
		secondary: '#3B60E4',
		lightGrey: '#E9E9E9',
		grey: '#666',
		black: '#363537',
		white: '#FCFCFC',
		smQuery: '576px',
		mdQuery: '768px',
		lgQuery: '1024px',
		spacing: (value) => {
			return `${value * 8}px`
		}
	}
	return {
		cartItems,
		setCartItems,
		showCart,
		setShowCart,
		theme
	}
}

const CommonContext = React.createContext();

export const ProvideContext = ({children}) => {
	const context = useCommonContext();
	return <CommonContext.Provider value={context}>{children}</CommonContext.Provider>
}

export default CommonContext;