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
    iconBehaviour?: 'Hover' | 'None' | 'Always';
}

export const Tag: React.FC<TagProps> = ({
    icon = Times,
    children,
    isHoverable = true,
    iconBehaviour = 'Hover',
    ...props
}): React.ReactElement => (
    <TagDiv {...props} isHoverable={isHoverable}>
        {children}
        {!!isHoverable && <Icon as={icon} iconBehaviour={iconBehaviour} />}
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

const Icon = styled.svg<{ iconBehaviour: string }>`
    ${transition(['width', 'margin-left'])}
    height: auto;
    width: 0;
    margin-left: 0;

    ${({ iconBehaviour }): string => {
        switch(iconBehaviour) {
        case 'Always':
            return `
                    width: 10px;
                    margin-left: 10px;
                `
        case 'Hover':
            return `
                    ${TagDiv}:hover & {
                        ${iconBehaviour === 'Hover' ? `
                            width: 10px;
                            margin-left: 10px;
                        ` : ``
}
                    }
                `
        case 'None':
            return `
                    width: 0;
                    margin-left: 0;
                `
        default:
            return `
                    width: 0;
                    margin-left: 0;
                `
        }
    }}
`;
