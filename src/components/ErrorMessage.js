import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Message } from 'rsuite'
import CommonContext from '../utils/context'

const CustomMessage = styled(Message)`
	font-family: ${props => props.theme.fontFamily};
`
const ErrorTitle = styled.span`
	font-size: 1.5rem;
`

const ErrorMessage = props => {
	const context = useContext(CommonContext);
	const { theme } = context;

	return (
		<CustomMessage type="error" title={<ErrorTitle theme={theme}>Ups, something went wrong!</ErrorTitle>} description={props.error} />
	)
}

ErrorMessage.propTypes = {

}

export default ErrorMessage
