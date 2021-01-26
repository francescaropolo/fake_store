import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'rsuite'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Container = styled(Breadcrumb)`
	padding: 0;
`
export const BreadcrumbItem = styled(Breadcrumb.Item)`
	font-family: ${props => props.theme.fontFamily};
	font-weight: ${props => props.active ? 400 : 600};
	color: ${props => props.active ? props.theme.grey : props.theme.primary};
	a {
		color: ${props => props.active ? props.theme.grey : props.theme.primary};
	}
`

const CustomBreadcrumb = props => {
	return (
		<Container separator={<FontAwesomeIcon icon={faChevronRight} size="xs"/>}>
			{props.children}
		</Container>
	)
}

CustomBreadcrumb.propTypes = {}

export default CustomBreadcrumb
