import React from 'react';
import styled from 'styled-components';
import { flex } from '../Utils/Mixins';
import {
    Main,
    MainInterface,
    Responsive,
    ResponsiveInterface,
} from '../Utils/BaseStyles';

export interface QRScanProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    Icon: React.FC;
    title: string;
    InFooter: React.FC;
    ContentRight: React.FC;
    QRURL: string;
}

export const QRScan: React.FC<QRScanProps> = ({
    Icon,
    title,
    InFooter,
    ContentRight,
    QRURL,
}): React.ReactElement => (
    <QRScanBox>
        <Title>
            <strong>{title}</strong>
        </Title>
        <Middle>
            <ScanContainer>
                <QRIconContainer>
                    <Img src={QRURL} />
                </QRIconContainer>
                <ContentRightContainer>
                    <ContentRight />
                </ContentRightContainer>
            </ScanContainer>
            <Footer>
                <InFooter />
            </Footer>
        </Middle>
        <IconContainer>
            <Icon />
        </IconContainer>
    </QRScanBox>
);

const Img = styled.img`
    width: 100%;
`;

const MiddleContainers = styled.div`
    flex: 1;
`;

const QRIconContainer = styled(MiddleContainers)`
    // border: 1px solid brown;
    margin-right: 2px;
`;

const ContentRightContainer = styled(MiddleContainers)`
    // border: 1px solid blue;
    margin-left: 2px;
`;

const Footer = styled.div`
    ${({ theme }): string => `
color:${theme.colors.background};
font-size:${theme.font.size.small};
margin:5px;
${flex('center')}
`}
`;

const ScanContainer = styled.div`
    ${({ theme }): string => `
background-color:${theme.colors.background};
`}
    border-radius:6px;
    margin: 10px 10px 5px 10px;
    padding: 5px;
    height: 100%;
    ${flex()}
`;

const Middle = styled.div`
    ${({ theme }): string => `
    background-color:${theme.colors.text};
    `}
    height: 64%;
    ${flex('column', 'center', 'stretch')}
`;
const Title = styled.div`
    height: 18%;
    ${flex('center')}
`;
const IconContainer = styled.div`
    width: 10px;
    margin: 5px 10px;
`;

const QRScanBox = styled.div<MainInterface & ResponsiveInterface>`
    ${({ theme }): string => `
    background-color:${theme.colors.background};
    `}
    width: 150px;
    height: 176px;

    // Theme Stuff
    ${({ theme, ...props }): string => `
    border-radius: ${theme.dimensions.radius};
    font-family: ${theme.font.family};
    color: ${theme.colors.text};
    border:2px solid ${theme.colors.text};
    ${Main({
        ...props,
    })}
    `}

    // Base Styles
    ${Responsive}
`;

// these are components to be placed somewhere else

export const PhoneBox = styled.div`
    ${({ theme }): string => `
    border:1px solid ${theme.colors.text};
    `}
    border-radius: 2px;
    box-sizing: border-box;

    display: inline-block;
    background-size: cover;
    background-position: center;
    width: 100%;
    padding-top: 200%;
    position: relative;
    transform: rotate3d(1, 1, 1);
    &::before {
        position: absolute;
        left: calc(50% - 32%);
        top: 0;
        width: 70%;
        ${({ theme }): string => `
        background: ${theme.colors.text};
        `}
        height: 1px;
        content: '';
        border-radius: 0 0 15px 15px;
    }
`;

export interface SnackpassProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {}

export const Snackpass: React.FC<SnackpassProps> = ({}): React.ReactElement => (
    <div>Snackpass</div>
);

export interface TableNumberProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {}

export const TableNumberComp: React.FC<TableNumberProps> = ({}): React.ReactElement => (
    <TableContainer>
        <TableTitle>
            <strong>TABLE</strong>
        </TableTitle>
        <TableNumber>
            <strong>32</strong>
        </TableNumber>
    </TableContainer>
);

const TableContainer = styled.div`
    ${flex('column', 'center')}
`;

const TableTitle = styled.div`
    ${({ theme }): string => `
font-size:${theme.font.size.small};
`}
`;

const TableNumber = styled.div`
    ${({ theme }): string => `
font-size:${theme.font.size.h1};
`}
`;

export const QRURL1 =
    'https://storage.googleapis.com/support-forums-api/attachment/thread-13090132-506909745012483037.png';

export default QRScan;
