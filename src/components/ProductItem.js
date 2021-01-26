import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonContext from '../utils/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Item = styled.div`
	width: 100%;
	position: relative;
	background-color: ${props => props.theme.white};
	border: 1px solid ${props => props.theme.lightGrey}1A;
	margin-bottom: ${props => props.theme.spacing(3)};
	cursor: pointer;
	text-decoration: none;
	color: ${props => props.theme.black};

	button {
		opacity: 1;
		@media(min-width: ${props => props.theme.smQuery}) {
			opacity: 0;
		}
	}

	&:hover {
		button {
			opacity: 1;
		}
	}
`
const ItemContainer = styled(Link)`
	width: 100%;
	text-decoration: none;
	color: ${props => props.theme.black};
	display: block;
	&:hover {
		text-decoration: none;
		color: ${props => props.theme.black};
	}
`
const ImgContainer = styled.div`
	margin: ${props => props.theme.spacing(2)} 0;
	width: 100%;
	height: 200px;
	padding: ${props => props.theme.spacing(2)};
	overflow: hidden;
	background: url(${props => props.bg}) 0 0 no-repeat;
	background-size: contain;
	background-position: center;
`
const InfoContainer = styled.section`
	padding: ${props => props.theme.spacing(2)};
`
const Category = styled.p`
	color: ${props => props.theme.grey};
	margin: 0 0 ${props => props.theme.spacing(1)};
	font-size: 12px;
	line-height: 1;
	text-transform: capitalize;
	&:hover {
		text-decoration: none;
		color: ${props => props.theme.grey};
	}
`
const Title = styled.h6`
	color: ${props => props.theme.black};
	margin: 0 0 ${props => props.theme.spacing(1)};
	font-size: 14px;
	line-height: 1.2;
	font-weight: 500;
	&:hover {
		text-decoration: none;
		color: ${props => props.theme.black};
	}
`
const Price = styled.span`
	font-size: 14px;
	color: ${props => props.theme.secondary};
	font-weight: 600;
	&:hover {
		text-decoration: none;
		color: ${props => props.theme.secondary};
	}
`
const CartButton = styled.button`
	width: 35px;
	height: 35px;
	border-radius: 50px;
	border: 1px solid ${props => props.theme.primary};
	background: ${props => props.theme.white};
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	right: ${props => props.theme.spacing(2)};
	top: ${props => props.theme.spacing(2)};
	color: ${props => props.theme.primary};
	cursor: pointer;
	transition: all .1s ease;
	outline: none;

	&:hover {
		background: ${props => props.theme.primary};
		color: ${props => props.theme.white};
	}
`

const ProductItem = props => {
	const context = useContext(CommonContext);
	const { theme, cartItems, setCartItems, setShowCart } = context;
	const { id, title, category, price, image } = props.product;

	const handleAddItem = (ev) => {
		ev.stopPropagation();
		const updateCartItems = [...cartItems];
		updateCartItems.push(props.product);
		setCartItems(updateCartItems);
		setShowCart(true);
	}

	const getShorterTitle = (str) => {
		const strArr = str.split(" ");
		return strArr.slice(0, 4).join(" ")
	}

	return (
		<Item theme={theme}>
			<CartButton theme={theme} onClick={handleAddItem}><FontAwesomeIcon icon={faShoppingBag} /></CartButton>
			<ItemContainer theme={theme} to={"/shop/product/" + id}>
				<ImgContainer bg={image} theme={theme}/>
				<InfoContainer theme={theme}>
					<Category theme={theme}>{category}</Category>
					<Title theme={theme}>{getShorterTitle(title)}</Title>
					<Price theme={theme}>{price}€</Price>
				</InfoContainer>
			</ItemContainer>
		</Item>
	)
}

ProductItem.propTypes = {
	product: PropTypes.object.isRequired
}

export default ProductItem
