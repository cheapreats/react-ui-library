import React from 'react';
import { TextLayoutProps } from '../_helpers/TextLayout';
import { Heading } from '../';

export const HeadingOne = ({
    className,
    margin,
    lineHeight,
    bold,
    children,
    text,
}) => (
    <Heading
        className={ className }
        margin={ margin }
        lineHeight={ lineHeight }
        bold={ bold }
        type='h1'
        text={ text || children }
    />
);

HeadingOne.propTypes = TextLayoutProps;