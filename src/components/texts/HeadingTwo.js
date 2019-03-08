import React from 'react';
import { TextLayoutProps } from '../_helpers/TextLayout';
import { Heading } from '../';

export const HeadingTwo = ({
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
        type='h2'
        text={ text || children }
    />
);

HeadingTwo.propTypes = TextLayoutProps;