import React          from 'react';
import styled from 'styled-components';
import {PRIMARY_FONT} from "../variables";
import PropTypes      from 'prop-types';

const HeadingFourStyled = styled.h4`
    font-family: ${PRIMARY_FONT};
    color: black;
    padding-top: 20px;
    padding-bottom: 10px;
    margin: 0;
    font-weight: ${props => props.bold ? "bold" : "normal"};
`;

export const HeadingFour = ({text, bold, className, children}) => {
    return (
        <HeadingFourStyled className={className} bold={bold}>{text? text: children}</HeadingFourStyled>
    )
}

HeadingFour.propTypes = {
    text: PropTypes.node,
    bold: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node
};