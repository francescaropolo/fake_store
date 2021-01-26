import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useMergeState } from 'react-hooks-lib'
import { Link, useParams } from 'react-router-dom'
import Container from '../components/Container'
import ProductItem from '../components/ProductItem'
import Loader from '../components/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components'
import CommonContext from '../utils/context'
import { Input } from 'rsuite'
import CustomBreadcrumb, { BreadcrumbItem } from '../components/Breadcrumb'

const ProductContainer = styled.section`
	padding-top: ${props => props.theme.spacing(4)};
	display: grid;
	grid-template-columns: 1fr;
	row-gap: ${props => props.theme.spacing(4)};
	grid-template-row: repeat(2, auto);
	@media(min-width: ${props => props.theme.smQuery}) {
		grid-template-columns: repeat(2, 1fr);
		column-gap: ${props => props.theme.spacing(8)};
		grid-template-row: auto;
	}
`
const ProductImageContainer = styled.div``
const Img = styled.img`
	max-width: 100%;
	height: auto;
`
const ProductDescription = styled.section``
const Title = styled.h1`
	font-size: 1.5rem;
	line-height: 1.1;
	margin-bottom: ${props => props.theme.spacing(3)};
	@media(min-width: ${props => props.theme.smQuery}) {
		font-size: 1.8rem;
	}
`
const Price = styled.span`
	font-size: 18px;
	color: ${props => props.theme.secondary};
	font-weight: 600;
	margin-bottom: ${props => props.theme.spacing(3)};
	display: inline-block;
`
const Description = styled.p`
	margin-bottom: ${props => props.theme.spacing(3)};
`
const QuantityContainer = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: center;
	margin-bottom: ${props => props.theme.spacing(3)};
	padding-bottom: ${props => props.theme.spacing(3)};
	border-bottom: 1px solid ${props => props.theme.lightGrey};
	@media(min-width: ${props => props.theme.smQuery}) {
		justify-content: space-between;
		flex-wrap: nowrap;
	}
`
const QuantityActions = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: ${props => props.theme.spacing(2)};
	@media(min-width: ${props => props.theme.smQuery}) {
		margin-bottom: 0;
	}
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
	width: 40px;
	height: 40px;
	border-radius: 50px;
	font-size: 20px;

	&:hover {
		background-color: ${props => props.theme.lightGrey}66;
	}
`
const Cta = styled.button`
	background: ${props => props.theme.primary}E6;
	padding: 8px 16px;
	border-radius: 50px;
	outline: none;
	width: 100%;
	cursor: pointer;
	color: ${props => props.theme.white};
	transition: all .1s ease;
	text-decoration: none;
	font-size: 12px;
	text-transform: uppercase;
	font-weight: 500;

    &:hover {
		background: ${props => props.theme.primary};
		color: ${props => props.theme.white};
		text-decoration: none;
	}

	@media(min-width: ${props => props.theme.smQuery}) {
		margin-left: ${props => props.theme.spacing(2)};
	}
`
const QuantityInput = styled(Input)`
	width: 50px;
	margin: 0 ${props => props.theme.spacing(1)};
`
const DescriptionContainer = styled.section`
	padding-top: ${props => props.theme.spacing(12)};
	margin-bottom: ${props => props.theme.spacing(12)};
`
const DescriptionTitle = styled.h6`
	font-weight: 500;
	text-transform: uppercase;
	width: 100%;
	padding-bottom: ${props => props.theme.spacing(1.5)};
	border-bottom: 1px solid ${props => props.theme.lightGrey};
	color: ${props => props.theme.primary};
	margin-bottom: ${props => props.theme.spacing(3)};
`
const RelatedProducts = styled.section``
const Divider = styled.div`
	height: 2px;
	width: 20px;
	margin-bottom: ${ props => props.theme.spacing(3) };
	background-color: ${ props => props.theme.secondary }
`
const ProductsList = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: repeat(3, auto);
	row-gap: 16px;
	@media(min-width: ${props => props.theme.smQuery}) {
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: auto;
		column-gap: 16px;
	}
`
const SectionTitle = styled.h3`
	color: ${ props => props.theme.black };
`
const Text = styled.p`
	text-transform: capitalize;
	font-size: 12px;
	margin-bottom: ${ props => props.theme.spacing(2) };
	span {
		font-weight: 600;
	}
`
const LoaderContainer = styled.div`
    height: 70vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Product = props => {
	const context = useContext(CommonContext);
	const { theme, cartItems, setCartItems, setShowCart } = context;
	const { state, set } = useMergeState({
		product: null,
		isLoading: true,
		isLoadingRelated: true,
		error: null,
		quantity: 1
	})
	const { id } = useParams();

	useEffect(() => {
		set({isLoading: true, isLoadingRelated: true})
		setShowCart(false)
		getProductInfo();
	}, [id])
	
	useEffect(() => {
		if(state.product) {
			getRelatedItems();
		}
	}, [state.product])

	const getProductInfo = () => {
		fetch(`https://fakestoreapi.com/products/${id}`)
			.then(res => res.json())
			.then(json => {
				set({
					product: json,
					isLoading: false,
				})
			})
			.catch(error => {
				set({
					error: error,
					isLoading: false,
				})
			})
	}

	const getRelatedItems = () => {
		fetch(`https://fakestoreapi.com/products/category/${state.product.category}?limit=4`)
			.then(res => res.json())
			.then(json => {
				const selectedProduct = json.find(product => product.id === state.product.id);
				const selectedProductIndex = json.indexOf(selectedProduct)

				if (selectedProductIndex !== -1) {
					json.splice(selectedProductIndex, 1)
				} else {
					json.pop()
				}
				set({
					relatedItems: json,
					isLoadingRelated: false
				})
			})
			.catch(error => {
				set({
					error: error,
					isLoadingRelated: false
				})
			})
	}
	
	const handleAddToCart = (ev) => {
		const updateCartItems = [...cartItems];
		for(let i = 0; i < state.quantity; i++) {
			updateCartItems.push(state.product);
		}
		setCartItems(updateCartItems);
		setShowCart(true);
	}

	const handleAdd = (ev) => {
		let quantity = state.quantity;
		
		set({
			quantity: quantity += 1
		})
	}

	const handleRemove = (ev) => {
		let quantity = state.quantity;
		
		set({
			quantity: quantity -= 1
		})
	}

	const handleChangeQuantity = (value) => {
		set({
			quantity: value
		})
	}

	const getShorterDescription = (str) => {
		return str.substring(0, 130) + '...'
	}

	return (
		<Container withBg={true}>
			<CustomBreadcrumb>
				<BreadcrumbItem componentClass={Link} theme={theme} to="/">Home</BreadcrumbItem>
				<BreadcrumbItem componentClass={Link} theme={theme} to="/shop">Shop</BreadcrumbItem>
				<BreadcrumbItem active theme={theme}>{state.product ? state.product.title : '...'}</BreadcrumbItem>
			</CustomBreadcrumb>
			{state.isLoading ? <LoaderContainer><Loader /></LoaderContainer> :
				<React.Fragment>
					<ProductContainer theme={theme}>
						<ProductImageContainer theme={theme}>
							<Img src={state.product.image} />
						</ProductImageContainer>
						<ProductDescription theme={theme}>
							<Title theme={theme}>{state.product.title}</Title>
							<Price theme={theme}>{state.product.price}€</Price>
							<Description theme={theme}>{getShorterDescription(state.product.description)}</Description>
							<QuantityContainer theme={theme}>
								<QuantityActions theme={theme}>
									<QuantityButton theme={theme} onClick={handleRemove}><FontAwesomeIcon icon={faMinus} size="xs"/></QuantityButton>
									<QuantityInput theme={theme} placeholder="Quantity" value={state.quantity} onChange={handleChangeQuantity}/>
									<QuantityButton theme={theme} onClick={handleAdd}><FontAwesomeIcon icon={faPlus} size="xs"/></QuantityButton>
								</QuantityActions>
								<Cta onClick={handleAddToCart} theme={theme}>Add to cart</Cta>
							</QuantityContainer>
							<Text theme={theme}><span>Category:</span>  {state.product.category}</Text>
							<Text theme={theme}><span>SKU:</span>  2579-MK96</Text>
							<Text theme={theme}><span>Brand:</span>  FakeStore</Text>
						</ProductDescription>
					</ProductContainer>
					<DescriptionContainer theme={theme}>
						<DescriptionTitle theme={theme}>Description</DescriptionTitle>
						<Description theme={theme}>{state.product.description}</Description>
					</DescriptionContainer>
					<RelatedProducts>
						<SectionTitle theme={theme}>Related products</SectionTitle>
						<Divider theme={theme} />
						{state.isLoadingRelated ? <Loader /> : <ProductsList theme={theme}>
							{state.relatedItems.map((product, index) => {
								return <ProductItem product={product} key={index} />
							})}
						</ProductsList>}
					</RelatedProducts>
				</React.Fragment>
			}
		</Container>
	)
}

Product.propTypes = {}

export default Product
