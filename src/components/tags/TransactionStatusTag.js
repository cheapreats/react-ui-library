import React          from 'react';
import styled, {css}      from "styled-components";
import PropTypes      from 'prop-types';
import {PRIMARY_FONT} from "../variables";

const TransactionStatusTagStyled = styled.span`
    font-family: ${PRIMARY_FONT};
    font-weight: bold;
    padding: 10px;
    border-radius: 20px;
    padding-left: 20px;
    padding-right: 20px;
    box-shadow: rgba(0,0,0,0.2) 2px 2px 5px;

    ${props => props.status === "authorized" && css`
        background-color: rgba(249, 99, 32, 0.73);
        color: white;
    `}
    ${props => props.status === "captured" && css`
        background-color: rgba(30, 182, 18, 0.89);
        color: white;
    `}
`;

export const TransactionStatusTag = ({status}) => {
    return (
        <TransactionStatusTagStyled status={status}>{status}</TransactionStatusTagStyled>
    );
}

TransactionStatusTag.propTypes = {
    status: PropTypes.string,
};
