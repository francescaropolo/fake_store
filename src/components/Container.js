import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonContext from '../utils/context';
import bg from '../images/bg.svg'

const PageContainer = styled.div`
	width: 100%;
	height: 100%;
	background: ${props => props.withBg ? `url('${bg}') center center no-repeat` : 'transparent'};
	background-size: cover;
	background-attachment: fixed;
`
const Paper = styled.div`
	width: 100%;
	max-width: 1020px;
	margin: 0 auto;
	height: 100%;
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
		<PageContainer withBg={props.withBg}>
			<Paper theme={theme} marginTop={props.marginTop}>
				{props.children}
			</Paper>
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
