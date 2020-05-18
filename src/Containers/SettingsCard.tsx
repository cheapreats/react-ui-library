import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { MainInterface, ResponsiveInterface } from '../Utils/BaseStyles';
import { Mixins } from '../Utils';
import { Card as C } from './Card';
import { Heading } from '../Text';

interface SettingsCardProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    heading: string;
    icon: StyledIcon;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({
    children,
    heading,
    icon,
    ...props
}): React.ReactElement => {
    return (
        <Card {...props}>
            <CardHeading type="h2">
                <HeadingIcon as={icon} />
                {heading}
            </CardHeading>
            {children}
        </Card>
    );
};

const CardHeading = styled(Heading)`
    ${Mixins.flex('center')}
    margin: 5px 0 20px;
    font-weight: bold;
    line-height: 1;
    flex-wrap: wrap;
    font-size: 1.4rem;
    text-align: center;
`;
const HeadingIcon = styled.svg`
    width: 22px;
    flex-shrink: 0;
    margin: 5px 12px;
`;
const Card = styled(C)`
    ${Mixins.flex('column')}
    padding: 20px 25px;
    width: calc(50% - 20px);
    box-sizing: border-box;
    margin: 10px;
    ${Mixins.media(
        'tablet',
        `
        width: 100%;
        margin: 10px 0;
    `,
    )}
`;
