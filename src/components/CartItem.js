import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonContext from '../utils/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Input } from 'rsuite';

const Item = styled.li`
	list-style: none;
	width: 100%;
	position: relative;
	background-color: ${props => props.theme.white};
	margin-bottom: ${props => props.theme.spacing(1)};
	&:last-child {
		border-bottom: 0;
	}
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	@media(min-width: ${props => props.theme.smQuery}) {
		flex-wrap: nowrap;
		justify-content: flex-start;
	}
`
const LinkContainer = styled(Link)`
	cursor: pointer;
	text-decoration: none;
	color: ${props => props.theme.black};
	
	* {
		text-decoration: none;
	}
	&:hover, &:focus, &:active {
		text-decoration: none;
		color: ${props => props.theme.black};
	}
`
const ImgContainer = styled.div`
	min-width: 100px;
	height: 100px;
	overflow: hidden;
	background: url(${props => props.bg}) 0 0 no-repeat;
	background-size: contain;
	background-position: center;
`
const InfoContainer = styled.section`
	height: 100%;
	width: 100%;
	padding: ${props => props.theme.spacing(2)};
	border-radius: 0 5px 5px 0;
`
const Title = styled.h6`
	font-size: 12px;
	line-height: 12px;
	margin: 0 0;
	padding-right: ${props => props.theme.spacing(1)};
	color: ${props => props.theme.black};
	text-transform: uppercase;
	@media(min-width: ${props => props.theme.smQuery}) {
		color: ${props => props.theme.black};
		margin: 0 0 ${props => props.theme.spacing(1)};
	}
	&:hover, &:focus, &:active {
		text-decoration: none;
		color: ${props => props.theme.black};
	}
`
const Price = styled.span`
	font-size: 14px;
	color: ${props => props.theme.primary};
	font-weight: 600;
	&:hover, &:focus, &:active {
		text-decoration: none;
		color: ${props => props.theme.primary};
	}
`
const Divider = styled.div`
	height: 2px;
	width: 20px;
	margin: ${props => props.theme.spacing(1)} 0 ${props => props.theme.spacing(2)};
	background-color: ${props => props.theme.secondary};
	@media(min-width: ${props => props.theme.smQuery}) {
		margin: ${props => props.theme.spacing(1)} 0 ${props => props.theme.spacing(6)};
	}
`
const PriceContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`
const QuantityActions = styled.div`
	display: flex;
	align-items: center;
`
const QuantityButton = styled.button`
	background-color: transparent;
	color: ${props => props.theme.black};
	border: none;
	outline: none;
	transition: all .1s ease;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	border-radius: 50px;

	&:hover {
		background-color: ${props => props.theme.lightGrey}66;
	}
`
const QuantityInput = styled(Input)`
	width: 50px;
	margin: 0 ${props => props.theme.spacing(1)};
	&:hover {
		text-decoration: none;
	}
`
const CloseButton = styled(QuantityButton)`
	position: absolute;
	width: 20px;
	height: 20px;
	top: 10px;
	right: 10px;
`

const CartItem = props => {
	const context = useContext(CommonContext);
	const { theme, cartItems, setCartItems } = context;
	const { id, title, price, image, quantity } = props.item;

	const getShorterTitle = (str) => {
		const strArr = str.split(" ");
		return strArr.slice(0, 4).join(" ")
	}

	const handleAdd = (ev) => {
		ev.stopPropagation();
		const updateCartItems = [...cartItems];
		updateCartItems.push(props.item);
		setCartItems(updateCartItems)
	}

	const handleRemove = (ev) => {
		ev.stopPropagation();
		const updateCartItems = [...cartItems];
		const myProduct = { ...props.item };
		delete myProduct.quantity;
		const productIndex = updateCartItems.indexOf(myProduct);
		updateCartItems.splice(productIndex, 1);
		setCartItems(updateCartItems)
	}

	const handleChangeQuantity = (value) => {
		const updateCartItems = [...cartItems];
		const otherItems = updateCartItems.filter(item => item.id !== id);

		for(let i = 0; i < value; i++) {
			otherItems.push(props.item)
		}
		
		setCartItems(otherItems)
	}

	return (
		<Item theme={theme}>
			<LinkContainer to={"/shop/product/" + id}>
				<ImgContainer bg={image} theme={theme}/>
			</LinkContainer>
			<InfoContainer theme={theme}>
				<LinkContainer to={"/shop/product/" + id}>
					<Title theme={theme}>{getShorterTitle(title)}</Title>
					<Divider theme={theme}/>
				</LinkContainer>
				<PriceContainer>
					<QuantityActions theme={theme}>
						<QuantityButton theme={theme} onClick={handleRemove}><FontAwesomeIcon icon={faMinus} size="xs" /></QuantityButton>
						<QuantityInput theme={theme} placeholder="Quantity" value={quantity} onChange={handleChangeQuantity} />
						<QuantityButton theme={theme} onClick={handleAdd}><FontAwesomeIcon icon={faPlus} size="xs" /></QuantityButton>
					</QuantityActions>
					<Price theme={theme}>{price}€</Price>
				</PriceContainer>
			</InfoContainer>
			<CloseButton theme={theme} onClick={() => handleChangeQuantity(0)}><FontAwesomeIcon icon={faTimes} size="xs" /></CloseButton>
		</Item>
	)
}

CartItem.propTypes = {
	item: PropTypes.object.isRequired
}

export default CartItem
