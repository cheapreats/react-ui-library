import React from 'react';
import styled from 'styled-components';
import TextLayout, { TextLayoutProps } from '../_helpers/TextLayout';


const Text = styled(TextLayout)`
    font-size: 0.8rem;
    color: #7d7d7d;
`;

export const SmallText = ({
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

SmallText.propTypes = TextLayoutProps;