import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonContext, { theme } from '../utils/context';

const PageContainer = styled.div`
	width: 100%;
	max-width: 1020px;
	margin: 0 auto;
	height: 100%;
	padding: ${props => props.theme.spacing(2)};
	margin-top: ${props => props.theme.spacing(props.marginTop)};
	& * {
		font-family: ${props => props.theme.fontFamily};
	}
`

const Container = props => {
	const context = useContext(CommonContext);
	const { theme } = context;

	return (
		<PageContainer theme={theme} marginTop={props.marginTop}>
			{props.children}
		</PageContainer>
	)
}

Container.defaultProps = {
	marginTop: 10
}
Container.propTypes = {
	marginTop: PropTypes.number
}

export default Container
