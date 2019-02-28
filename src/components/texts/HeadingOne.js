import React          from 'react';
import styled from 'styled-components';
import {PRIMARY_FONT} from "../variables";
import PropTypes      from 'prop-types';

const HeadingOneStyled = styled.h1`
    font-family: ${PRIMARY_FONT};
    color: ${props => props.primary ? "white" : "black"};
    padding-top: 20px;
    padding-bottom: 10px;
    margin: 0;
    font-weight: ${props => props.bold ? "bold" : "normal"};
`;

export const HeadingOne = ({text, bold, className, children, primary}) => {
    return (
        <HeadingOneStyled className={className} bold={bold} primary={primary}>{text? text: children}</HeadingOneStyled>
    )
}

HeadingOne.propTypes = {
    text: PropTypes.node,
    bold: PropTypes.bool,
    primary: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node
};