import React from 'react';
import styled from 'styled-components';
import TextLayout, { TextLayoutProps } from '../_helpers/TextLayout';

const Text = styled(TextLayout)`
    color: #464646;
`;

export const Paragraph = ({
    className,
    margin,
    lineHeight,
    bold,
    text,
    children,
}) => (
    <Text
        className={ className }
        margin={ margin }
        lineHeight={ lineHeight }
        bold={ bold }
        text={ text || children }
    />
)

Paragraph.propTypes = TextLayoutProps;
