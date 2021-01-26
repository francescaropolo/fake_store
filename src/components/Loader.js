import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import CommonContext from "../utils/context";


/* STYLES */
const progressRotate = keyframes`
  0% {
        transform: rotate(0deg);
    }
    12.5% {
        transform: rotate(180deg);
        animation-timing-function: linear;
    }
    25% {
        transform: rotate(630deg);
    }
    37.5% {
        transform: rotate(810deg);
        animation-timing-function: linear;
    }
    50% {
        transform: rotate(1260deg);
    }
    62.5% {
        transform: rotate(1440deg);
        animation-timing-function: linear;
    }
    75% {
        transform: rotate(1890deg);
    }
    87.5% {
        transform: rotate(2070deg);
        animation-timing-function: linear;
    }
    100% {
        transform: rotate(2520deg);
    }
`

const progressRotateInner = keyframes`
    0% {
        transform: rotate(-30deg);
    }
    29.4% {
        border-left-color: transparent;
    }
    29.41% {
        border-left-color: currentColor;
    }
    64.7% {
        border-bottom-color: transparent;
    }
    64.71% {
        border-bottom-color: currentColor;
    }
    100% {
        border-left-color: currentColor;
        border-bottom-color: currentColor;
        transform: rotate(225deg);
    }
`
const LoaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoaderComponent = styled.progress`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-sizing: border-box;
    border: none;
    border-radius: 50%;
    width: 94px;
    height: 94px;
    color: ${props => props.theme[props.color]};
    background-color: transparent;
    font-size: 16px;
    overflow: hidden;

    &::-webkit-progress-bar {
        background-color: transparent;
    }

    -webkit-mask-image: linear-gradient(transparent 50%, black 50%), linear-gradient(to right, transparent 50%, black 50%);
    mask-image: linear-gradient(transparent 50%, black 50%), linear-gradient(to right, transparent 50%, black 50%);
    animation: ${progressRotate} 6s infinite cubic-bezier(0.3, 0.6, 1, 1);

    &::before,
    &::-webkit-progress-value {
        content: "";
        display: block;
        box-sizing: border-box;
        margin-bottom: 8px;
        border: solid 8px transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        width: 100% !important;
        height: 100%;
        background-color: transparent;
        animation: ${progressRotateInner} 0.75s infinite linear alternate;
    }
`;

const Container = styled.div`
    position: relative;
    margin-bottom: 16.5px;
`

const Loader = (props) => {
    const context = useContext(CommonContext);
    const { theme } = context;

	return (
		<LoaderContainer>
			<Container>
				<LoaderComponent theme={theme} color={props.color}/>
			</Container>
		</LoaderContainer>
	)
}


Loader.defaultProps = {
    color: 'primary'
}

Loader.propTypes = {
    color: PropTypes.string
}

export default React.memo(Loader);