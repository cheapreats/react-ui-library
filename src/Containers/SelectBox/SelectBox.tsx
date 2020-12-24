import React from 'react';
import styled from 'styled-components';

export interface SelectBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    text?: string;
    align?: string;
    isSelected?: boolean;
    children?: React.ReactNode;
    padding?: string;
    margin?: string;
    bold?: boolean;
    size: string;
    onSelect?: (event: React.SyntheticEvent<HTMLDivElement, Event>) => void;
}

export const SelectBox: React.FC<SelectBoxProps> = ({
    text,
    children,
    size = 'default',
    onSelect,
    ...props
}): React.ReactElement => (
    <SelectBoxDiv {...props} size={size} onClick={onSelect}>
        {text}
        {children}
    </SelectBoxDiv>
);

const SelectBoxDiv = styled.div<SelectBoxProps>`
    ${({ theme, ...props }): string => `
        box-shadow: ${theme.depth[2]};
        border-radius: ${theme.dimensions.radius};
        background-color: ${props.isSelected && theme.colors.primary};
        color: ${props.isSelected && theme.colors.background};
        padding: ${props.padding || theme.dimensions.padding.default};
        text-align: ${props.align || 'center'};
        margin: ${props.margin};
        font-weight: ${props.bold && 'bold'};
        font-size: ${theme.font.size[props.size] || props.size};
`};
`;
