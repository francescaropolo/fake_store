import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonContext from '../utils/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmileWink } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
	background-color: ${props => props.theme.black};
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
	color: ${props => props.theme.white};
`

const Footer = props => {
	const context = useContext(CommonContext);
	const { theme } = context;
	
	return (
		<FooterContainer theme={theme}>
			<FooterText theme={theme}>&copy; FAKE Store <FontAwesomeIcon icon={faSmileWink} /></FooterText>
		</FooterContainer>
	)
}

Footer.propTypes = {

}

export default Footer
