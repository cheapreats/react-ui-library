import React from 'react';
import { TextLayoutProps } from '../_helpers/TextLayout';
import { Heading } from '../';

export const HeadingFour = ({
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
        type='h4'
        text={ text || children }
    />
);

HeadingFour.propTypes = TextLayoutProps;