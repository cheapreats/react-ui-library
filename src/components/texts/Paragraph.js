import styled from 'styled-components';
import {PRIMARY_FONT} from "../variables";
import React          from 'react';
import PropTypes      from 'prop-types';

const ParagraphStyled = styled.p`
    font-family: ${PRIMARY_FONT};
    color: black;
    padding-top: 10px;
    font-weight: bold;
    padding-bottom: 10px;
    opacity: 0.7;
    margin: 0;
    font-weight: ${props => props.bold ? "bold" : "normal"};
`;

export const Paragraph = ({text, bold}) => {
    return (
        <ParagraphStyled bold={bold}>{text}</ParagraphStyled>
    )
}

Paragraph.propTypes = {
    text: PropTypes.string,
    bold: PropTypes.bool
};
