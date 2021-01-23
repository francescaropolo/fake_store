import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonContext from '../utils/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Item = styled.li`
	list-style: 0;
	width: 100%;
	position: relative;
	border-bottom: 1px solid ${props => props.theme.grey};
	&:last-child {
		border-bottom: 0;
	}
	text-decoration: none;
`
const LinkContainer = styled(Link)`
	// width: 100%;
	cursor: pointer;
	text-decoration: none;
	color: ${props => props.theme.black};
	display: flex;
	align-items: center;
	justofy-content: flex-start;
	text-decoration: none;
	&:hover {
		text-decoration: none;
		color: ${props => props.theme.black};
	}
`
const ImgContainer = styled.div`
	min-width: 150px;
	height: 100px;
	overflow: hidden;
	background: url(${props => props.bg}) 0 0 no-repeat;
	background-size: contain;
	background-position: center;
`
const InfoContainer = styled.section`
	height: 100%;
	padding: ${props => props.theme.spacing(2)};
	border-radius: 0 5px 5px 0;
`
const Title = styled.h6`
	font-size: 12px;
	line-height: 12px;
	margin: 0 0 ${props => props.theme.spacing(1)};
	height: 25px;
	@media(min-width: ${props => props.theme.smQuery}) {
		height: 50px;
	}
	text-transform: uppercase;
`
const Quantity = styled.span`
	font-size: 14px;
	color: ${props => props.theme.grey}
`
const Price = styled.span`
	font-size: 14px;
	color: ${props => props.theme.grey}
`
const Divider = styled.div`
	height: 2px;
	width: 20px;
	margin: ${props => props.theme.spacing(1)} 0 ${props => props.theme.spacing(0.5)};
	background-color: ${props => props.theme.secondary}
`
const RemoveButton = styled.button`
	width: 35px;
	height: 35px;
	border-radius: 20px;
	position: absolute;
	bottom: ${props => props.theme.spacing(2)};
	right: ${props => props.theme.spacing(2)};

`
const CartItem = props => {
	const context = useContext(CommonContext);
	const { theme, cartItems, setCartItems } = context;
	const { id, title, description, category, price, image, quantity } = props.item;

	const handleRemoveItem = (ev) => {
		ev.stopPropagation();

		const updateCartItems = [...cartItems];
		const myProduct = {...props.item};
		delete myProduct.quantity;
		const productIndex = updateCartItems.indexOf(myProduct);
		updateCartItems.splice(productIndex, 1);
		setCartItems(updateCartItems)
	}

	return (
		<Item theme={theme}>
			<LinkContainer to={"/shop/product/" + id}>
				<ImgContainer bg={image} theme={theme}/>
				<InfoContainer theme={theme}>
					<Title theme={theme}>{title}</Title>
					<Quantity theme={theme}>Quantity: {quantity}</Quantity>
					<Divider theme={theme}/>
					<Price theme={theme}>{price}€</Price>
				</InfoContainer>
			</LinkContainer>
			<RemoveButton onClick={handleRemoveItem} theme={theme}>
				<FontAwesomeIcon icon={faTrashAlt} />
			</RemoveButton>
		</Item>
	)
}

CartItem.propTypes = {

}

export default CartItem
