import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonContext, { theme } from '../utils/context';
import bg from '../images/bg.svg'

const PageContainer = styled.div`
	width: 100%;
	max-width: 1020px;
	margin: 0 auto;
	height: 100%;
	background: ${props => props.withBg ? `url('${bg}') center center no-repeat` : 'transparent'};
	background-size: cover;
	background-attachment: fixed;
	padding: ${props => props.theme.spacing(2)} ${props => props.theme.spacing(4)};
	margin-top: ${props => props.theme.spacing(props.marginTop)};
	& * {
		font-family: ${props => props.theme.fontFamily};
	}
`

const Container = props => {
	const context = useContext(CommonContext);
	const { theme } = context;

	return (
		<PageContainer theme={theme} marginTop={props.marginTop} withBg={props.withBg}>
			{props.children}
		</PageContainer>
	)
}

Container.defaultProps = {
	marginTop: 10,
	withBg: false
}
Container.propTypes = {
	marginTop: PropTypes.number
}

export default Container
