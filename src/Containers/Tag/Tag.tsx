import React from 'react';
import styled from 'styled-components';
import { Times } from '@styled-icons/fa-solid/Times';
import { clickable, darken, flex, transition } from '@Utils/Mixins';
import { Main } from '@Utils/BaseStyles';

interface ITagDiv extends React.HTMLAttributes<HTMLSpanElement> {
    isHoverable?: boolean;
}

export interface TagProps extends ITagDiv {
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({
    icon = Times,
    children,
    isHoverable = true,
    ...props
}): React.ReactElement => (
    <TagDiv {...props} isHoverable={isHoverable}>
        {children}
        {!!isHoverable && <Icon as={icon} />}
    </TagDiv>
);

export default Tag;

const TagDiv = styled.span<ITagDiv>`
    ${transition(['background-color', 'border-color', 'color'])}
    ${flex('center')}
  ${({ theme, isHoverable, ...props }): string => {
        const color = darken(theme.colors.input.default, 0.2);
        const hoverClickable = clickable(theme.colors.primary, 0.1, [
            'background-color',
            'border-color',
        ]);
        return `
            ${Main({
                padding: theme.dimensions.tag.padding,
                ...props,
            })}
            font-size: ${theme.dimensions.tag.fontSize};
            border: 1.5px solid ${color};
            color: ${theme.colors.text};
            ${
                isHoverable
                    ? `&:hover {
                background-color: ${theme.colors.primary};
                border-color: ${theme.colors.primary};
                color: white;
            }
            ${hoverClickable}
            `
                    : ''
            }
            
        `;
    }}
  display: inline-flex;
    border-radius: 999px;
    font-weight: bold;
`;

const Icon = styled.svg`
    ${transition(['width', 'margin-left'])}
    height: auto;
    width: 0;
    margin-left: 0;
    ${TagDiv}:hover & {
        width: 10px;
        margin-left: 10px;
    }
`;
