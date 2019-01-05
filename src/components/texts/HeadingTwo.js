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
    font-weight: ${props => props.bold && "bold"};
`;

export const HeadingTwo = ({text, bold}) => {
    return (
        <HeadingTwoStyled bold={bold}>{text}</HeadingTwoStyled>
    )
}

HeadingTwo.propTypes = {
    text: PropTypes.string,
    bold: PropTypes.bool
};