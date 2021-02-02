import React from 'react';
import styled from 'styled-components';
import { flex } from '@Utils/Mixins';
import { Heading } from '@Text/Heading';
import {
    Main,
    MainInterface,
    Responsive,
    ResponsiveInterface,
} from '@Utils/BaseStyles';

export interface QRScanProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    footerItems: React.ReactNode[];
    middleItems: React.ReactNode[];
    title: string;
    qrDisplay: React.ReactNode;
    qrRightContent: React.ReactNode;
}

export const QRScan: React.FC<QRScanProps> = ({
    footerItems,
    title,
    middleItems,
    qrDisplay,
    qrRightContent,
    ...props
}): React.ReactElement => (
    <QRScanBox {...props}>
        <Title>
            <Heading type='h4'>{title}</Heading>
        </Title>
        <Middle>
            <ScanContainer>
                {qrDisplay}
                {qrRightContent}
            </ScanContainer>
            <RowContainer>
            {...middleItems}
            </RowContainer>
        </Middle>
        <RowContainer>
            {...footerItems}
        </RowContainer>
    </QRScanBox>
);

const RowContainer = styled.div`
    ${flex('row', 'space-between', 'center')}
`;

const ScanContainer = styled.div`
    ${({ theme }): string => `
background-color:${theme.colors.background};
`}
    border-radius:6px;
    margin: 10px 10px 5px 10px;
    padding: 5px;
    ${flex('space-around', 'center')}
`;

const Middle = styled.div`
    ${({ theme }): string => `
    background-color:${theme.colors.text};
    `}
    ${flex('column', 'center' )}
`;

const Title = styled.div`
    ${flex('center')}
    padding:10px;
`;

const QRScanBox = styled.div<MainInterface & ResponsiveInterface>`
    ${({ theme }): string => `
    background-color:${theme.colors.background};
    `}
    width: fit-content;

    ${({ theme, ...props }): string => `
    border-radius: ${theme.dimensions.radius};
    font-family: ${theme.font.family};
    color: ${theme.colors.text};
    border:2px solid ${theme.colors.text};
    ${Main({
        ...props,
    })}
    `}
    ${Responsive}
`;