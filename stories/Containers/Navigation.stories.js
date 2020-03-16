import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Navigation } from '../../src';

import { Compass } from 'styled-icons/fa-solid/Compass';
import { Mixins } from '../../src/Utils';
import { Paragraph as P } from '../../src/Text';
import styled from 'styled-components';

storiesOf('Navigation', module)
    .addDecorator(withKnobs)
    .add('with default', () => <Navigation />)
    .add('with footer', () => <Navigation footer={<DashboardNavFooter />} />);

const DashboardNavFooter = () => (
    <NavigationFooter>
        <Button rel="noopener noreferrer" target="_blank">
            <Icon />
            <Paragraph margin="0 auto 0 12px" color="white" bold>
                To Terminal
            </Paragraph>
        </Button>
    </NavigationFooter>
);

const Button = styled.a`
    ${Mixins.transition(['background-color'])}
    ${Mixins.flex('center')}
    ${({ theme }) => `
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

const NavigationFooter = styled.div`
    margin: auto 0 0;
`;

const Icon = styled(Compass)`
    flex-shrink: 0;
    color: white;
    width: 30px;
    box-sizing: border-box;
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
    `,
    )}
`;
