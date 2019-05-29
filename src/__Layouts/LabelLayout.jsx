import React from 'react';
import styled from 'styled-components';
import { useTransition } from '@Utils/Hooks';
import { flex } from '@Utils/Mixins';

export const LabelLayout = ({
    name,
    label,
    description,
    error,
    success,
    children,
    className
}) => {
    const [ , orErr, andErr ] = useTransition(error);
    const layoutProps = {
        description,
        success,
        className
    };

    return (
        <Layout { ...layoutProps }>
            { label && <Label htmlFor={ name }>{ label }</Label> }
            { description && <Info id={`#${ name }-info`}>{ description }</Info> }
            { children }
            {orErr && (
                <Label id={`#${ name }-error`} transition={ andErr } error>
                    { error }
                </Label>
            )}
        </Layout>
    );
}

const Layout = styled.div`
    ${ flex('column') }
`;

const Label = styled.label`
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 5px;
    ${({ error }) => error ? `
        margin-top: 5px;
        color: red;
    ` : ''}
`;

const Info = styled.span`
    font-size: 0.9rem;
    font-weight: bold;
    opacity: 0.7;
    margin: -5px 0 5px;
`;