import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonContext from '../utils/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Drawer, Dropdown, Modal } from 'rsuite';
import CartItem from '../components/CartItem';
import { useMergeState } from 'react-hooks-lib';
import cartBg from '../images/cartBg.svg'

const Logo = styled(Link)`
	color: ${props => props.theme.black};
	text-decoration: none;
	margin: 0;
	margin-right: auto;
	font-size: 1.2rem;
	font-weight: 600;
	&:hover, &:focus, &:active {
		text-decoration: none;
		color: ${props => props.theme.black};
	}
`
const Dot = styled.div`
	background-color: ${props => props.theme.primary};
	display: inline-block;
	height: 5px;
	width: 5px;
	border-radius: 20px;
	margin-left: ${props => props.theme.spacing(0.5)};
	&:hover {
		text-decoration: none;
		color: ${props => props.theme.primary};
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
	height: 100%;
	display: ${props => props.isEmpty ? 'flex' : 'inherit'};
	padding: 0 ${props => props.theme.spacing(2)};
	background: url(${cartBg}) center center no-repeat;
	background-size: cover;
	align-items: center;
	justify-content: center;
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
	font-size: 12px;
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
	padding: ${props => props.theme.spacing(2)} ${props => props.theme.spacing(3)};

	& * {
		font-family: ${props => props.theme.fontFamily};
	}

	@media(min-width: ${props => props.theme.smQuery}) {
		padding: ${props => props.theme.spacing(2)} ${props => props.theme.spacing(6)};
	}
`
const DrawerTitle = styled.span`
	font-family: ${props => props.theme.fontFamily};
	color: ${props => props.theme.black};
	font-size: 28px;
	line-height: 42px;
`
const ModalTitle = styled(DrawerTitle)`
	font-family: ${props => props.theme.fontFamily};
	color: ${props => props.theme.secondary};
	font-size: 18px;
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
	font-weight: 600;
`
const Text = styled.p`
	font-family: ${props => props.theme.fontFamily};
	font-size: 14px;
	span {
		color: ${props => props.theme.primary};
		font-weight: 600;
	}
`
const Cta = styled.button`
	background: ${props => props.theme.secondary}E6;
	padding: 8px 16px;
	border-radius: 50px;
	outline: none;
	cursor: pointer;
	color: ${props => props.theme.white};
	transition: all .1s ease;
	text-decoration: none;
	font-size: 12px;
	text-transform: uppercase;
	font-weight: 500;

    &:hover {
		background: ${props => props.theme.secondary};
		color: ${props => props.theme.white};
		text-decoration: none;
    }
	font-family: ${props => props.theme.fontFamily};
`
const EmptyCart = styled.p`
	font-size: 20px;
	padding: 0 ${props => props.theme.spacing(2)};
	text-align: center;
	font-family: ${props => props.theme.fontFamily};
	span {
		color: ${props => props.theme.primary};
		font-weight: 600;
	}
`
const DrawerBody = styled(Drawer.Body)`
	margin-left: 0;
	margin-right: 0;
`
const ModalBody = styled(Modal.Body)`
	background: url(${cartBg}) 0 0 no-repeat;
	background-size: cover;
	height: 300px;
	display: flex;
	align-items: center;
	justify-content: center;
	p {
		font-size: 20px;
	}
`
const CustomModal = styled(Modal)`
	width: ${props => props.full ? '100%' : '600px'}
`

const Header = props => {
	const context = useContext(CommonContext);
	const { theme, cartItems, showCart, setShowCart } = context;
	const {state, set} = useMergeState({
		items: [],
		total: 0,
		showMenu: false,
		isMobile: window.innerWidth <= 576,
		openModal: false
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

	const handleCheckout = (ev) => {
		setShowCart(false)
		set({openModal : true})
	}

	return (
		<AppBar theme={theme}>
			<Logo theme={theme} to="/">FakeStore<Dot theme={theme} /></Logo>
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
				full={!window.matchMedia(`(min-width: ${theme.smQuery})`).matches}
			>
				<Drawer.Header>
					<Drawer.Title>
						<DrawerTitle theme={theme}>Your Cart</DrawerTitle>
						<Divider theme={theme} width="20px"/>
					</Drawer.Title>
				</Drawer.Header>
				<DrawerBody>
					<CartList theme={theme} isEmpty={state.items.length === 0}>
						{state.items.length > 0 ? state.items.map((item, index) => {
							return <CartItem key={index} item={item} />
						}) : <EmptyCart theme={theme}>Ups, it seems like your <span>Fake</span> cart is empty!</EmptyCart>}
					</CartList>
				</DrawerBody>
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
						<Cta theme={theme} onClick={handleCheckout}>Checkout</Cta>
					</InfoContainer>}
				</Drawer.Footer>
			</Drawer>
			<CustomModal show={state.openModal} full={!window.matchMedia(`(min-width: ${theme.smQuery})`).matches} onHide={() => set({openModal: false})}>
				<Modal.Header>
					<Modal.Title><ModalTitle theme={theme}>That's all folks!</ModalTitle></Modal.Title>
				</Modal.Header>
				<ModalBody>
					<Text theme={theme}>We hope you enjoyed your <span>Fake</span> shopping experience.</Text>
				</ModalBody>
			</CustomModal>
		</AppBar>
	)
}

Header.propTypes = {}

export default Header
