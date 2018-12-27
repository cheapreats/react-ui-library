import React from 'react';
import styled from 'styled-components';
import {PRIMARY_FONT} from "../styles/fonts";

const FormTitle = styled.p`
    font-family: ${PRIMARY_FONT};
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0 0 2px;
    color: gray;
`;

const FormInputField = styled.input`
    font-family: ${PRIMARY_FONT};
    font-size: 14px;
    font-weight: bold;
    background-color: rgba(0,0,0,0.05);
    border-radius: 10px;
    border: none;
    outline: none;
    margin-top: 7px;
    padding: 10px 20px 10px 20px;
    width: calc(100% - 40px);
`;

const InformationMessage = styled.p`
    font-family: ${PRIMARY_FONT};
    font-size: 14px;
    font-weight: bold;
    margin: 2px 0 0 10px;
    color: grey;
`;

const ErrorMessage = styled.p`
    font-family: ${PRIMARY_FONT};
    font-size: 14px;
    font-weight: bold;
    margin: 2px 0 0 10px;
    color: red;
`;

export default ({
        title,
        type,
        placeholder,
        name,
        information,
        error,
        onChange,
        value
    }) => {
    return (
        <React.Fragment>
            {title ? <FormTitle>{title}</FormTitle> : null}
            <FormInputField type={type} placeholder={placeholder} name={name} onChange={onChange} value={value}></FormInputField>
            {information ? <InformationMessage>{information}</InformationMessage> : null}
            {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        </React.Fragment>
    )
};