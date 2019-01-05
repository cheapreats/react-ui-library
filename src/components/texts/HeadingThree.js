import React          from 'react';
import styled from 'styled-components';
import {PRIMARY_FONT} from "../variables";
import PropTypes      from 'prop-types';

const HeadingThreeStyled = styled.h3`
    font-family: ${PRIMARY_FONT};
    color: black;
    padding-top: 20px;
    padding-bottom: 10px;
    margin: 0;
    font-weight: ${props => props.bold ? "bold" : "normal"};
`;

export const HeadingThree = ({text, bold}) => {
    return (
        <HeadingThreeStyled bold={bold}>{text}</HeadingThreeStyled>
    )
}

HeadingThree.propTypes = {
    text: PropTypes.string,
    bold: PropTypes.bool
};