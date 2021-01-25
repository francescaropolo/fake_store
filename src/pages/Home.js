import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import Container from '../components/Container'
import CommonContext from '../utils/context';
import hero from '../images/hero.svg'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMergeState } from 'react-hooks-lib';
import ProductItem from '../components/ProductItem';
import Loader from '../components/Loader';

const HeroContainer = styled.section`
	margin-top: ${props => props.theme.spacing(12)};
	padding-bottom: ${props => props.theme.spacing(10)};
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap-reverse;
	&:hover {
		img {
			transform: scale(1.03) rotate(5deg);
		}
	}
	& * {
		font-family: ${props => props.theme.fontFamily};
	}
	@media(min-width: ${props => props.theme.smQuery}) {
		padding-bottom: 0;
	}
`
const HeroText = styled.div`
	width: 100%;
	padding: 0 ${props => props.theme.spacing(3)};
	@media(min-width: ${props => props.theme.smQuery}) {
		padding-left: 10%;
		width: 40%;
	}
`
const Highlight = styled.span`
`
const Title = styled.h1`
	font-size: 1.8rem;
	line-height: 1;
	margin-bottom: ${props => props.theme.spacing(3)};
	@media(min-width: ${props => props.theme.lgQuery}) {
		font-size: 2.8rem;
	}

	${Highlight} {
		color: ${props => props.theme.primary};
	}
`
const Subtitle = styled.p`
	margin-bottom: ${props => props.theme.spacing(3)};
	font-size: 14px;
	@media(min-width: ${props => props.theme.lgQuery}) {
		font-size: 14px;
	}
`
const Cta = styled(Link)`
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
`
const HeroImgContainer = styled.div`
	width: 100%;
	overflow: hidden;
	@media(min-width: ${props => props.theme.smQuery}) {
		width: 60%;
	}
`
const HeroImg = styled.img`
	width: 100%;
	height: auto;
	transition: all .8s ease-in-out;
`
const TrendingItemsContainer = styled.section`
	padding: ${props => props.theme.spacing(4)} ${props => props.theme.spacing(5)};
`
const Divider = styled.div`
	height: 2px;
	width: 20px;
	margin-bottom: ${props => props.theme.spacing(3)};
	background-color: ${props => props.theme.secondary}
`
const ProductsList = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 250px);
	column-gap: 16px;
	overflow: hidden;
	overflow-x: auto;
`
const SectionTitle = styled.h3`
	color: ${props => props.theme.black};
`
const Dot = styled.div`
	background-color: ${props => props.theme.secondary};
	display: inline-block;
	height: 8px;
	width: 8px;
	border-radius: 20px;
	&:hover {
		text-decoration: none;
		color: ${props => props.theme.secondary};
	}
`

const Home = props => {
	const context = useContext(CommonContext);
	const { theme, cartItems, setCartItems, setShowCart } = context;
	const {state, set} = useMergeState({
		isLoading: true,
		trendingItems: [],
		error: null
	})

	useEffect(() => {
		getTrendingItems();
	}, [])

	const getTrendingItems = () => {
		fetch('https://fakestoreapi.com/products?limit=5')
		.then(res => res.json())
		.then(json => {
			set({
				trendingItems: json,
				isLoading: false
			})
		})
		.catch(error => {
			set({
				error: error,
				isLoading: false
			})
		})
	}

	return (
		<React.Fragment>
			<HeroContainer theme={theme}>
				<HeroText theme={theme}>
					<Title theme={theme}>Being <Highlight>Fake</Highlight> has never been easier <Dot theme={theme}/></Title>
					<Subtitle theme={theme}>Discover the fake trending fashion, a lot of products you may think you should buy... but you can't.</Subtitle>
					<Cta theme={theme} to="/shop">Shop now</Cta>
				</HeroText>
				<HeroImgContainer theme={theme}>
					<HeroImg src={hero}/>
				</HeroImgContainer>
			</HeroContainer>
			<TrendingItemsContainer theme={theme}>
				<Container marginTop={0}>
					<SectionTitle theme={theme}>Trending items</SectionTitle>
					<Divider theme={theme}/>
					{state.isLoading ? <Loader color="white" /> : <ProductsList theme={theme}>
						{state.trendingItems.map((product, index) => {
							return <ProductItem product={product} key={index} />
						})}
					</ProductsList>}
				</Container>
			</TrendingItemsContainer>
		</React.Fragment>
	)
}

Home.propTypes = {

}

export default Home
