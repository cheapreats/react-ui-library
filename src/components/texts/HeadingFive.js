import React          from 'react';
import styled from 'styled-components';
import {PRIMARY_FONT} from "../variables";
import PropTypes      from 'prop-types';

const HeadingFiveStyled = styled.h5`
    font-family: ${PRIMARY_FONT};
    color: black;
    padding-top: 20px;
    padding-bottom: 10px;
    margin: 0;
    font-weight: ${props => props.bold ? "bold" : "normal"};
`;

export const HeadingFive = ({text, bold, className, children}) => {
    return (
        <HeadingFiveStyled className={className} bold={bold}>{text? text: children}</HeadingFiveStyled>
    )
}

HeadingFive.propTypes = {
    text: PropTypes.node,
    bold: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node
};