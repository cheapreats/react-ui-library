import React          from 'react';
import styled from 'styled-components';
import {PRIMARY_FONT} from "../variables";
import PropTypes      from 'prop-types';

const HeadingOneStyled = styled.h1`
    font-family: ${PRIMARY_FONT};
    color: black;
    padding-top: 20px;
    padding-bottom: 10px;
    margin: 0;
`;

export const HeadingOne = ({text}) => {
    return (
        <HeadingOneStyled>{text}</HeadingOneStyled>
    )
}

HeadingOne.propTypes = {
    text: PropTypes.string
};