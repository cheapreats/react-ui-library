import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { ImplicitPropsInterface } from '../../Utils/Hooks';
import { Mixins } from '../../Utils';
import { Paragraph as P } from '../../Text';

export interface NavigationFooterProps
    extends MainInterface,
        ResponsiveInterface,
        ImplicitPropsInterface,
        React.HTMLAttributes<HTMLDivElement> {
    url: string;
    text: string;
    icon: StyledIcon;
}

export const NavigationFooter: React.FC<NavigationFooterProps> = ({
    url,
    text,
    icon,
    ...props
}): React.ReactElement => (
    <NavigationFooterContainer {...props}>
        <Button href={url} rel="noopener noreferrer" target="_blank">
            <Icon as={icon} />
            <Paragraph margin="0 auto 0 12px" color="white" bold>
                {text}
            </Paragraph>
        </Button>
    </NavigationFooterContainer>
);

const Button = styled.a`
    ${Mixins.transition(['background-color'])}
    ${Mixins.flex('center')}
    ${({ theme }): string => `
        background-color: ${Mixins.darken(theme.colors.primary, 0.1)};
        ${Mixins.clickable(Mixins.darken(theme.colors.primary, 0.1), 0.1)}
        color:${theme.colors.background};
    `}
    width: 100%;
    text-decoration: none;
    color: inherit;
    box-sizing: border-box;
    padding: 14px 20px;
`;

const Icon = styled.svg`
    flex-shrink: 0;
    ${({ theme }) => `
    color:${theme.colors.background};
    `}
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

const NavigationFooterContainer = styled.div`
    margin: auto 0 0;
`;
