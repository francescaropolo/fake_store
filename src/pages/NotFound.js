import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Container from '../components/Container'
import notFound from '../images/404.svg'
import styled from 'styled-components'
import CommonContext from '../utils/context'
import { Link } from 'react-router-dom'

const NotFoundContainer = styled.div`
	font-family: ${props => props.theme.fontFamily};
	height: 100%;
	width: 100%;
	background: url(${props => props.bgImg}) center center no-repeat;
	background-size: contain;
	display: flex;
	justify-content: center;
	margin-top: ${props => props.theme.spacing(15)};
	@media(min-width: ${props => props.theme.smQuery}) {
		background-size: cover;
	}
`

const NotFoundBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 70vh;
`
const Title = styled.h1`
	font-size: 50px;
	line-height: 1;
	color: ${props => props.theme.secondary};

	@media(min-width: ${props => props.theme.smQuery}) {
		font-size: 150px;
	}
`
const Subtitle = styled.p`
	font-size: 15px;
	text-transform: uppercase;
	color: ${props => props.theme.secondary};
	margin-bottom: ${props => props.theme.spacing(3)};
	@media(min-width: ${props => props.theme.smQuery}) {
		font-size: 30px;
	}
`
const Divider = styled.div`
	height: 2px;
	width: 70px;
	margin: ${props => props.theme.spacing(1)} 0 ${props => props.theme.spacing(0.5)};
	background-color: ${props => props.theme.primary}
`
const Cta = styled(Link)`
	background: ${props => props.theme.white};
	padding: 8px 16px;
	border: 1px solid ${props => props.theme.primary};
	border-radius: 50px;
	outline: none;
	cursor: pointer;
	color: ${props => props.theme.primary};
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
`

const NotFound = props => {
	const context = useContext(CommonContext);
	const { theme } = context;

	return (
		<NotFoundContainer bgImg={notFound} theme={theme}>
			<NotFoundBody>
				<Title theme={theme}>404</Title>
				<Divider theme={theme} />
				<Subtitle theme={theme}>Page not found</Subtitle>
				<Cta theme={theme} to="/">Return to homepage</Cta>
			</NotFoundBody>
		</NotFoundContainer>
	)
}

NotFound.propTypes = {

}

export default NotFound
