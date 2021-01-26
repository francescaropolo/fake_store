import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonContext from '../utils/context';

const FooterContainer = styled.footer`
	background-color: ${props => props.theme.white};
	border-top: 1px solid ${props => props.theme.primary};
	width: 100%;
	display: flex;
	align-item: center;
	justify-content: center;
	padding: ${props => props.theme.spacing(2)};
	& * {
		font-family: ${props => props.theme.fontFamily};
	}
`
const FooterText = styled.p`
	margin: 0;
	color: ${props => props.theme.black};
`
const Strong = styled.span`
	font-weight: 500;
`
const Highlight = styled(Strong)`
	color: ${props => props.theme.primary};
`

const Footer = props => {
	const context = useContext(CommonContext);
	const { theme } = context;
	
	return (
		<FooterContainer theme={theme}>
			<FooterText theme={theme}>&copy; <Strong>FakeStore</Strong>. Designed by <Highlight theme={theme}>Francesca Ropolo</Highlight></FooterText>
		</FooterContainer>
	)
}

Footer.propTypes = {}

export default Footer
