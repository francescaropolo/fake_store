import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonContext from '../utils/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Drawer } from 'rsuite';
import CartItem from '../components/CartItem';
import { useMergeState } from 'react-hooks-lib';

const AppBar = styled.header`
	background-color: ${props => props.theme.white};
	position: fixed;
	top: 0;
	left: 0;
	box-shadow: 0px 1px 5px 0px ${props => props.theme.lightGrey};
	width: 100%;
	z-index: 100;
	display: flex;
	align-item: center;
	justify-content: space-between;
	padding: ${props => props.theme.spacing(2)};
`
const Container = styled.div`
	position: relative;
`
const Logo = styled(Link)`
	color: ${props => props.theme.black};
	text-decoration: none;
	margin: 0;
	font-size: 30px;
`
const CartButton = styled.button`
	background-color: transparent;
	color: ${props => props.theme.black};
	border: none;
	outline: none;
	transition: all .1s ease;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 50px;
	font-size: 20px;

	&:hover {
		background-color: ${props => props.theme.lightGrey}66;
	}
`

const Badge = styled.span`
	position: absolute;
	font-size: 10px;
	color: ${props => props.theme.white};
	top: 0;
	right: 0;
	width: 18px;
	height: 18px;
	border-radius: 20px;
	background-color: ${props => props.theme.primary};
	display: flex;
	align-items: center;
	justify-content: center;
`
const CartPopup = styled.div`
	position: absolute;
	top: ${props => props.theme.spacing(2)};
	right: ${props => props.theme.spacing(2)};
`
const CartList = styled.ul`
	padding: 0;
	margin: 0;
`

const Header = props => {
	const context = useContext(CommonContext);
	const { theme, cartItems, showCart, setShowCart } = context;
	const {state, set} = useMergeState({
		items: [],
		total: 0
	})

	useEffect(() => {
		prepareItems();
	}, [cartItems])

	const prepareItems = () => {
		const myCartItems = [...cartItems];
		const itemsToShow = [];
		let total = 0;

		for(let i = 0; i < myCartItems.length; i++) {
			total += myCartItems[i].price;
			const index = itemsToShow.indexOf(itemsToShow.find(item => item.id === myCartItems[i].id));
			if(index !== -1) {
				itemsToShow[index].quantity += 1
			} else {
				itemsToShow.push({ ...myCartItems[i], quantity: 1})
			}
		}

		set({
			items: itemsToShow,
			total
		})
	}

	
	return (
		<AppBar theme={theme}>
			<Container>
				<Logo theme={theme} to="/">Fake Store</Logo>
				<CartButton theme={theme} onClick={() => setShowCart(true)}>
					<FontAwesomeIcon icon={faShoppingBag} />
					{cartItems.length > 0 && <Badge theme={theme}>{cartItems.length}</Badge>}
				</CartButton>
				<Drawer
					show={showCart}
					onHide={() => setShowCart(false)}
					size="xs"
				>
					<Drawer.Header>
						<Drawer.Title>Your Cart</Drawer.Title>
					</Drawer.Header>
					<Drawer.Body>
						<CartList>
							{state.items.length > 0 ? state.items.map((item, index) => {
								return <CartItem key={index} item={item} />
							}) : "Your cart is empty"}
						</CartList>
						{state.total}
					</Drawer.Body>
					<Drawer.Footer>
						
					</Drawer.Footer>
				</Drawer>
			</Container>
		</AppBar>
	)
}

Header.propTypes = {

}

export default Header
