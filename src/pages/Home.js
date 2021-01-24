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
	font-size: 3rem;
	line-height: 1;
	margin-bottom: ${props => props.theme.spacing(3)};
	@media(min-width: ${props => props.theme.lgQuery}) {
		font-size: 5rem;
	}

	${Highlight} {
		color: ${props => props.theme.primary};
	}
`
const Description = styled.p`
	margin-bottom: ${props => props.theme.spacing(3)};
	font-size: 16px;
	@media(min-width: ${props => props.theme.lgQuery}) {
		font-size: 24px;
	}
`
const Cta = styled(Link)`
	background: ${props => props.theme.white};
	padding: 8px 16px;
	border: 1px solid ${props => props.theme.secondary};
	border-radius: 50px;
	outline: none;
	cursor: pointer;
	color: ${props => props.theme.secondary};
	transition: all .1s ease;
	text-decoration: none;
	font-size: 18px;
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
const NewArrivalsContainer = styled.section`
	background-color: ${props => props.theme.primary};
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
	height: 15px;
	width: 15px;
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
		newArrivals: [],
		error: null
	})

	useEffect(() => {
		getNewArrivals();
	}, [])

	const getNewArrivals = () => {
		fetch('https://fakestoreapi.com/products?limit=5')
		.then(res => res.json())
		.then(json => {
			set({
				newArrivals: json,
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
					<Title theme={theme}>Being <Highlight>FAKE</Highlight> has never been easier <Dot theme={theme}/></Title>
					<Description theme={theme}>A lot of products you may think you should buy, but you can't.</Description>
					<Cta theme={theme} to="/shop">Shop now</Cta>
				</HeroText>
				<HeroImgContainer theme={theme}>
					<HeroImg src={hero}/>
				</HeroImgContainer>
			</HeroContainer>
			<NewArrivalsContainer theme={theme}>
				<Container marginTop={0}>
					<SectionTitle theme={theme}>New arrivals</SectionTitle>
					<Divider theme={theme}/>
					{state.isLoading ? <Loader color="white" /> : <ProductsList theme={theme}>
						{state.newArrivals.map((product, index) => {
							return <ProductItem product={product} key={index} />
						})}
					</ProductsList>}
				</Container>
			</NewArrivalsContainer>
		</React.Fragment>
	)
}

Home.propTypes = {

}

export default Home
