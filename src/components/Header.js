import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonContext from '../utils/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Drawer, Dropdown } from 'rsuite';
import CartItem from '../components/CartItem';
import { useMergeState } from 'react-hooks-lib';

const Logo = styled(Link)`
	color: ${props => props.theme.primary};
	text-decoration: none;
	margin: 0;
	margin-right: auto;
	font-size: 2rem;
	font-weight: 600;
	&:hover {
		text-decoration: none;
		color: ${props => props.theme.primary};
	}

	@media(min-width: ${props => props.theme.smQuery}) {
		margin-right: 0;
	}
`
const Dot = styled.div`
	background-color: ${props => props.theme.secondary};
	display: inline-block;
	height: 10px;
	width: 10px;
	border-radius: 20px;
	&:hover {
		text-decoration: none;
		color: ${props => props.theme.secondary};
	}
`
const Button = styled.button`
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
const CartList = styled.ul`
	padding: 0;
	margin: 0;
`
const Menu = styled.ul`
	padding: 0;
	margin: 0;
	
	li {
		display: inline-block;
		list-style: none;
		margin: 0 ${props => props.theme.spacing(2)};
	}
`
const MenuItem = styled(Link)`
	color: ${props => props.theme.black};
	text-decoration: none;
	border-bottom: 2px solid transparent;
	transition: all .2s ease;
	font-size: 18px;
	text-transform: uppercase;
	&:hover, &:active, &:focus, &:visited {
		text-decoration: none;
		color: ${props => props.theme.black};
		border-bottom: 2px solid ${props => props.theme.secondary};
	}
`
const AppBar = styled.header`
	background-color: ${props => props.theme.white};
	position: fixed;
	top: 0;
	left: 0;
	box-shadow: 0px 1px 5px 0px ${props => props.theme.lightGrey};
	width: 100%;
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: ${props => props.theme.spacing(2)} ${props => props.theme.spacing(3.5)};
	& * {
		font-family: ${props => props.theme.fontFamily};
	}
	@media(min-width: ${props => props.theme.smQuery}) {
		justify-content: space-between;
	}
`
const DrawerTitle = styled.span`
	font-family: ${props => props.theme.fontFamily};
	color: ${props => props.theme.black};
	font-size: 28px;
	line-height: 42px;
`
const Divider = styled.div`
	height: 2px;
	width: ${props => props.width};
	margin-bottom: ${props => props.theme.spacing(3)};
	background-color: ${props => props.theme.secondary}
`
const DrawerInfo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-family: ${props => props.theme.fontFamily};
	margin-bottom: ${props => props.theme.spacing(2)};
	&:first-child {
		margin-bottom: 0;
	}
`
const InfoContainer = styled.div`
	text-align: center;	
`
const Total = styled(DrawerInfo)`
	// padding-top: ${props => props.theme.spacing(2)};
	font-weight: 600;
`
const Text = styled.p`
	font-family: ${props => props.theme.fontFamily};
	font-size: 14px;
`
const Cta = styled.button`
	font-family: ${props => props.theme.fontFamily};
	background: ${props => props.theme.white};
	padding: 8px 16px;
	border: 1px solid ${props => props.theme.secondary};
	border-radius: 50px;
	outline: none;
	cursor: pointer;
	color: ${props => props.theme.secondary};
	transition: all .1s ease;
	font-size: 16px;
	text-transform: uppercase;
	font-weight: 500;

    &:hover {
        background: ${props => props.theme.secondary};
		color: ${props => props.theme.white};
	}
`

const Header = props => {
	const context = useContext(CommonContext);
	const { theme, cartItems, showCart, setShowCart } = context;
	const {state, set} = useMergeState({
		items: [],
		total: 0,
		showMenu: false,
		isMobile: false
	})

	useEffect(() => {
		prepareItems();
	}, [cartItems])
	
	useEffect(() => {
		const handleResize = () => set({isMobile: window.innerWidth <= 576});
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});

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
			<Logo theme={theme} to="/">FAKE Store <Dot theme={theme} /></Logo>
			{!state.isMobile ? <Menu theme={theme}>
				<li><MenuItem theme={theme} to="/">Home</MenuItem></li>
				<li><MenuItem theme={theme} to="/shop">Shop</MenuItem></li>
			</Menu> :
			<Dropdown
				renderTitle={() => {
					return <Button theme={theme}><FontAwesomeIcon icon={faBars} /></Button>
				}}
			>
				<Dropdown.Item componentClass={MenuItem} theme={theme} to="/">Home</Dropdown.Item>
				<Dropdown.Item componentClass={MenuItem} theme={theme} to="/shop">Shop</Dropdown.Item>
			</Dropdown>}
			<Button theme={theme} onClick={() => setShowCart(true)}>
				<FontAwesomeIcon icon={faShoppingBag} />
				{cartItems.length > 0 && <Badge theme={theme}>{cartItems.length}</Badge>}
			</Button>
			<Drawer
				show={showCart}
				onHide={() => setShowCart(false)}
				size="xs"
			>
				<Drawer.Header>
					<Drawer.Title>
						<DrawerTitle theme={theme}>Your Cart</DrawerTitle>
						<Divider theme={theme} width="20px"/>
					</Drawer.Title>
				</Drawer.Header>
				<Drawer.Body>
					<CartList>
						{state.items.length > 0 ? state.items.map((item, index) => {
							return <CartItem key={index} item={item} />
						}) : "Your cart is empty"}
					</CartList>
				</Drawer.Body>
				<Drawer.Footer>
					{state.items.length > 0 && <InfoContainer>
						<DrawerInfo theme={theme}>
							<Text theme={theme}>Subtotal</Text>
							<Text theme={theme}>{(state.total).toFixed(2)}€</Text>
						</DrawerInfo>
						<DrawerInfo theme={theme}>
							<Text theme={theme}>Shipping</Text>
							<Text theme={theme}>FREE</Text>
						</DrawerInfo>
						<Divider theme={theme} width="100%" />
						<Total theme={theme}>
							<Text theme={theme}>Total</Text>
							<Text theme={theme}>{(state.total).toFixed(2)}€</Text>
						</Total>
						<Cta theme={theme}>Checkout</Cta>
					</InfoContainer>}
				</Drawer.Footer>
			</Drawer>
		</AppBar>
	)
}

Header.propTypes = {

}

export default Header
