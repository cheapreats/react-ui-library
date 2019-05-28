import React from 'react';

export const LabelLayout = ({
    name,
    label,
    description,
    error,
    success,
    children,
    className
}) => {
    const layoutProps = {
        description,
        success,
        error,
        className
    };

    return (
        <Layout { ...layoutProps }>
            { label && <label htmlFor={ name }>{ label }</label> }
            { description && <span id={`#${ name }-info`}>{ description }</span> }
            { children }
            { error && <label id={`#${ name }-error`}>{ error }</label> }
        </Layout>
    );
}