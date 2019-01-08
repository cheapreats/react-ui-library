import React          from 'react';
import styled from 'styled-components';
import {PRIMARY_FONT} from "../variables";
import PropTypes      from 'prop-types';

const HeadingTwoStyled = styled.h2`
    font-family: ${PRIMARY_FONT};
    color: black;
    padding-top: 20px;
    padding-bottom: 10px;
    margin: 0;
    font-weight: ${props => props.bold ? "bold" : "normal"};
`;

export const HeadingTwo = ({text, bold, className, children}) => {
    return (
        <HeadingTwoStyled className={className} bold={bold}>{text? text: children}</HeadingTwoStyled>
    )
}

HeadingTwo.propTypes = {
    text: PropTypes.string,
    bold: PropTypes.bool,
    children: PropTypes.string
};