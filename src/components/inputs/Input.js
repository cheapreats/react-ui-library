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
    opacity: 0.8;
    &:focus {
        opacity: 1;
        transition: all ease 0.3s;
    }
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
        onKeyPress,
        value,
        className
    }) => {
    return (
        <div className={className}>
<<<<<<< HEAD
            {title ? <FormTitle htmlFor={name}>{title}</FormTitle> : null}
            <FormInputField type={type} placeholder={placeholder} name={name} onChange={onChange} value={value}></FormInputField>
=======
            {title ? <FormTitle for={name}>{title}</FormTitle> : null}
            <FormInputField type={type} placeholder={placeholder} name={name} onChange={onChange} onKeyPress={onKeyPress} value={value}></FormInputField>
>>>>>>> 0299b874170719288663b338151c1175ef166cd3
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
    onKeyPress: PropTypes.func,
    value: PropTypes.string,
    className: PropTypes.string
};
