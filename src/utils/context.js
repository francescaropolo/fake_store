import React, { useState } from 'react';

const useCommonContext = () => {
	const [cartItems, setCartItems] = useState([]);
	const [showCart, setShowCart] = useState(false);
	const theme = {
		secondary: '#FF9000',
		primary: '#3B60E4',
		lightGrey: '#E9E9E9',
		grey: '#666',
		black: '#363537',
		white: '#FCFCFC',
		smQuery: '576px',
		mdQuery: '768px',
		lgQuery: '1024px',
		fontFamily: 'Montserrat',
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