import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonContext, { theme } from '../utils/context';

const PageContainer = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing(2)};
  margin-top: ${props => props.theme.spacing(10)};
`

const Container = props => {
  const context = useContext(CommonContext);
  const { theme } = context;

  return (
    <PageContainer theme={theme}>
      {props.children}
    </PageContainer>
  )
}

Container.propTypes = {

}

export default Container
