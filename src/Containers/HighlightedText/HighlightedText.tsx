import React from 'react';
import styled from 'styled-components';
import { Heading } from '@Text';
import { flex } from '@Utils/Mixins';

interface RowProps {
    padding?: string;
    width?: number;
}

export interface HighlightedTextProps {
    labels: Array<string>;
    options: Array<Array<string>>;
    display?: string;
    type?: string;
    padding?: string;
    width?: number;
    size?: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
    labels,
    options,
    display,
    type,
    padding,
    width,
    size,
    children,
    ...props
}): React.ReactElement => (
    <HighlightedRow padding={padding} width={width} {...props}>
        <p>
        We’re a <a href="/about/about_team.htm">team</a> of professionals working
        hard to provide free learning content.
        </p>
    </HighlightedRow>
);

const HighlightedRow = styled.div<RowProps>`
    padding: ${(props): string => props.padding || '10px 10px'};
    width: ${(props): number | undefined => props.width}px;
`;
