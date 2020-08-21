import React from 'react';
import styled from 'styled-components';
import { Compass } from '@styled-icons/fa-solid/Compass';
import { MainInterface, ResponsiveInterface } from '../Utils/BaseStyles';
import { ImplicitPropsInterface } from '../Utils/Hooks';
import { Mixins } from '../Utils';
import { Paragraph as P } from '../Text';

export interface NavigationFootnoteProps
    extends MainInterface,
        ResponsiveInterface,
        ImplicitPropsInterface,
        React.HTMLAttributes<HTMLDivElement> {
    url: string;
    text: string;
}

export const NavigationFootnote: React.FC<NavigationFootnoteProps> = ({
    url,
    text,
    ...props
}): React.ReactElement => (
    <NavigationFooter {...props}>
        <Button href={url} rel="noopener noreferrer" target="_blank">
            <Icon />
            <Paragraph margin="0 auto 0 12px" color="white" bold>
                {text}
            </Paragraph>
        </Button>
    </NavigationFooter>
);

const Button = styled.a`
    ${Mixins.transition(['background-color'])}
    ${Mixins.flex('center')}
    ${({ theme }): string => `
        background-color: ${Mixins.darken(theme.colors.primary, 0.1)};
        ${Mixins.clickable(Mixins.darken(theme.colors.primary, 0.1), 0.1)}
    `}
    width: 100%;
    text-decoration: none;
    color: inherit;
    box-sizing: border-box;
    color: white;
    padding: 14px 20px;
`;

const Icon = styled(Compass)`
    flex-shrink: 0;
    color: white;
    width: 30px;
    box-sizing: border-box;
    padding: 4px;
`;

const Paragraph = styled(P)`
    ${Mixins.transition(['max-width', 'margin', 'opacity'])}
    max-width: 255px;
    overflow: hidden;
    white-space: nowrap;
    ${Mixins.media(
        'tablet',
        `
        max-width: 0;
        opacity: 0;
        margin-left: 0;
        margin: 0;
    `,
    )}
`;

const NavigationFooter = styled.div`
    margin: auto 0 0;
`;
