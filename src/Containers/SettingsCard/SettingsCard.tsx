import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { Mixins } from '@Utils';
import { Card as C } from '../Card/Card';
import { Heading } from '@Text';

export interface SettingsCardProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    heading: string;
    icon: StyledIcon;
    onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({
    children,
    heading,
    icon,
    onClick,
    ...props
}): React.ReactElement => {
    return (
        <Card {...props}>
            <CardHeading type="h2">
                <HeadingIcon as={icon} onClick={onClick} />
                {heading}
            </CardHeading>
            {children}
        </Card>
    );
};
interface HeadingIconProps {
    onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
}

const CardHeading = styled(Heading)`
    ${Mixins.flex('center')}
    margin: 5px 0 20px;
    font-weight: bold;
    line-height: 1;
    flex-wrap: wrap;
    font-size: 1.4rem;
    text-align: center;
`;
const HeadingIcon = styled.svg<HeadingIconProps>`
    width: 22px;
    flex-shrink: 0;
    margin: 5px 12px;
    ${(props): string => (props.onClick ? 'cursor: pointer;' : '')}
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
