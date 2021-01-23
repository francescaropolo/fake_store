import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonContext from '../utils/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Item = styled.div`
	width: 100%;
	border-radius: 5px;
	position: relative;
	box-shadow: 0px 1px 5px 0px ${props => props.theme.lightGrey};
	margin-bottom: ${props => props.theme.spacing(3)};
	cursor: pointer;
	text-decoration: none;
	color: ${props => props.theme.black};

	button {
		opacity: 0;
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
	background-color: ${props => props.theme.secondary}1A;
	border-radius: 0 0 5px 5px;
`
const Title = styled.h6`
	color: ${props => props.theme.black};
	margin: 0 0 ${props => props.theme.spacing(1)};
	height: 25px;
	@media(min-width: ${props => props.theme.smQuery}) {
		height: 50px;
	}
	text-transform: uppercase;
	&:hover {
		text-decoration: none;
		color: ${props => props.theme.black};
	}
`
const Price = styled.span`
	font-size: 14px;
	color: ${props => props.theme.grey};
	&:hover {
		text-decoration: none;
		color: ${props => props.theme.black};
	}
`
const Divider = styled.div`
	height: 2px;
	width: 20px;
	margin: ${props => props.theme.spacing(1)} 0 ${props => props.theme.spacing(0.5)};
	background-color: ${props => props.theme.secondary}
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
	const { id, title, description, category, price, image } = props.product;

	const handleAddItem = (ev) => {
		ev.stopPropagation();
		const updateCartItems = [...cartItems];
		updateCartItems.push(props.product);
		setCartItems(updateCartItems);
		setShowCart(true);
	}

	return (
		<Item theme={theme}>
			<CartButton theme={theme} onClick={handleAddItem}><FontAwesomeIcon icon={faShoppingBag} /></CartButton>
			<ItemContainer theme={theme} to={"/shop/product/" + id}>
				<ImgContainer bg={image} theme={theme}/>
				<InfoContainer theme={theme}>
					<Title theme={theme}>{title}</Title>
					<Divider theme={theme}/>
					<Price theme={theme}>{price}€</Price>
				</InfoContainer>
			</ItemContainer>
		</Item>
	)
}

ProductItem.propTypes = {

}

export default ProductItem
