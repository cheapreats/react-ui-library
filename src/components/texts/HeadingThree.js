import React from 'react';
import { TextLayoutProps } from '../_helpers/TextLayout';
import { Heading } from '../';

export const HeadingThree = ({
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
        type='h3'
        text={ text || children }
    />
);

HeadingThree.propTypes = TextLayoutProps;