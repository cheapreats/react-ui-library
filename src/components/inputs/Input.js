import React          from 'react';
import styled         from 'styled-components';
import {PRIMARY_FONT, PRIMARY_COLOUR} from "../variables";
import PropTypes      from 'prop-types';

const FormTitle = styled.label`
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
    color: ${PRIMARY_COLOUR};
`;

export const Input = ({
        title,
        type = "text",
        placeholder,
        name,
        information,
        error,
        onChange,
        value,
        className
    }) => {
    return (
        <div className={className}>
            {title ? <FormTitle htmlFor={name}>{title}</FormTitle> : null}
            <FormInputField type={type} placeholder={placeholder} name={name} onChange={onChange} value={value}></FormInputField>
            {information ? <InformationMessage>{information}</InformationMessage> : null}
            {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        </div>
    )
};

Input.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    information: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    className: PropTypes.string
};
