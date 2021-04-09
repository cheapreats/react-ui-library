import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';
import { flex } from '@Utils/Mixins';
import { SmallText, SmallTextProps } from '@Text/SmallText';

interface IQRIconWithTextProps extends IContainerProps {
    icon?: StyledIcon;
    iconSize?: string;
    textWidth?: string;
    height?: string;
    headingText?: string;
    headingTextSize?: string;
    subText?: string;
    subTextSize?: string;
    textProps?: SmallTextProps;
}

export const QRIconWithText: React.FC<IQRIconWithTextProps> = ({
    icon,
    iconSize = '30px',
    textWidth,
    height = '50px',
    margin,
    headingText,
    headingTextSize = 'small',
    subText,
    subTextSize = 'small',
    textProps,
}): React.ReactElement => (
    <Container margin={margin} height={height}>
        {icon && <Icon as={icon} iconSize={iconSize} />}
        <TextColumn textWidth={textWidth}>
            {headingText && (
                <SmallText size={headingTextSize} bold {...textProps}>
                    {headingText}
                </SmallText>
            )}
            {subText && (
                <SmallText size={subTextSize} {...textProps}>
                    {subText}
                </SmallText>
            )}
        </TextColumn>
    </Container>
);

interface IContainerProps {
    margin?: string;
    height?: string;
}

const Container = styled.div<IContainerProps>`
    ${flex('row', 'start')}
    ${({ margin, height }) => `
        margin: ${margin};
        height: ${height};
    `}
`;

interface ITextColumn {
    textWidth?: string;
}

const TextColumn = styled.div<ITextColumn>`
    ${flex('column', 'start')}
    ${({ textWidth }) => `
        width: ${textWidth};
    `}
    height: 100%;
`;

interface IIconProps {
    iconSize: string;
}

const Icon = styled.svg<IIconProps>`
    ${({ iconSize }) => `height: ${iconSize};`}
    margin: auto 2px;
`;
