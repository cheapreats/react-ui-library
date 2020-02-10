import React from 'react';
import styled from 'styled-components';
import { Times } from 'styled-icons/fa-solid/Times';
import { flex, darken, transition, clickable } from '@Utils/Mixins';
import { Main } from '@Utils/BaseStyles';

export interface TagProps {
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    onClick?: Function;
}

export const Tag: React.FC<TagProps> = ({
    icon = Times,
    children,
    onClick = () => {},
    ...props
}): React.ReactElement => {
    return (
        <TagDiv {...props}>
            {children}
            <Icon as={icon} />
        </TagDiv>
    );
};

export default Tag;

const TagDiv = styled.span`
    ${transition(['background-color', 'border-color', 'color'])}
    ${flex('center')}

    ${({ theme, ...props }): string => {
        const color = darken(theme.colors.input.default, 0.2);
        return `
            ${Main({
                padding: theme.dimensions.tag.padding,
                ...props,
            })}
            font-size: ${theme.dimensions.tag.fontSize};
            border: 1.5px solid ${color};
            color: ${color};

            &:hover {
                background-color: ${theme.colors.primary};
                border-color: ${theme.colors.primary};
                color: white;
            }

            ${clickable(theme.colors.primary, 0.1, [
                'background-color',
                'border-color',
            ])}
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
