import React from 'react';
import styled from 'styled-components';
import phoneIcon from '../svg/smartphone.svg';
import { flex } from '../Utils/Mixins';
import { MainTheme } from '../Themes';
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
    FooterIcon1: React.FC;
    FooterIcon2: React.FC;
    FooterIcon3: React.FC;
    footerIcon1width: number;
    footerIcon2width: number;
    footerIcon3width: number;
    title: string;
    middleFooterText: string;
    MiddleFooterIcon: React.FC;
    middleFooterIconWidth: number;
    contentRightTitle: string;
    contentRightBig: string | number;
    qrImgURL: string;
    footer1header: string;
    footer1body: string;
    footer2header: string;
    footer2body: string;
    footer3header: string;
    footer3body: string;
}

export const QRScan: React.FC<QRScanProps> = ({
    FooterIcon1,
    FooterIcon2,
    FooterIcon3,
    footerIcon1width,
    footerIcon2width,
    footerIcon3width,
    title,
    middleFooterText,
    MiddleFooterIcon,
    middleFooterIconWidth,
    contentRightTitle,
    contentRightBig,
    qrImgURL,
    footer1header,
    footer1body,
    footer2header,
    footer2body,
    footer3header,
    footer3body,
    ...props
}): React.ReactElement => (
    <QRScanBox {...props}>
        <Title>
            <strong>{title}</strong>
        </Title>
        <Middle>
            <ScanContainer>
                <QRContainer>
                    <QRImg src={qrImgURL} />
                </QRContainer>
                <ContentRightContainer>
                    <ContentRightComp
                        title={contentRightTitle}
                        contentBig={contentRightBig}
                    />
                </ContentRightContainer>
            </ScanContainer>
            <MiddleFooter>
                <MiddleFooterComp
                    Icon={MiddleFooterIcon}
                    text={middleFooterText}
                    width={middleFooterIconWidth}
                />
            </MiddleFooter>
        </Middle>
        <Footer>
            <FooterGroup>
                <IconContainerComp
                    Icon={FooterIcon1}
                    width={footerIcon1width}
                />
                <FooterText>
                    <span>
                        <strong>{footer1header}</strong>
                    </span>
                    <span>{footer1body}</span>
                </FooterText>
            </FooterGroup>
            <FooterGroup>
                <IconContainerComp
                    Icon={FooterIcon2}
                    width={footerIcon2width}
                />
                <FooterText>
                    <span>
                        <strong>{footer2header}</strong>
                    </span>
                    <span>{footer2body}</span>
                </FooterText>
            </FooterGroup>
            <FooterGroup>
                <IconContainerComp
                    Icon={FooterIcon3}
                    width={footerIcon3width}
                />
                <FooterText>
                    <span>
                        <strong>{footer3header}</strong>
                    </span>
                    <span>{footer3body}</span>
                </FooterText>
            </FooterGroup>
        </Footer>
    </QRScanBox>
);

const Footer = styled.div`
    ${flex('space-between', 'center')}
`;

const FooterGroup = styled.div`
    ${flex()}
`;
const FooterText = styled.div`
    ${flex('column')}
    font-size:4px;
    margin-top: 5px;
    width: 25px;
`;

interface ContentRightProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    contentBig: string | number;
    title: string;
}

const ContentRightComp: React.FC<ContentRightProps> = ({
    contentBig,
    title,
}): React.ReactElement => (
    <TableContainer>
        <TableTitle>
            <strong>{title}</strong>
        </TableTitle>
        <TableNumber>
            <strong>{contentBig}</strong>
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

const QRImg = styled.img`
    width: 50px;
`;

const MiddleContainers = styled.div`
    flex: 1;
`;

const QRContainer = styled(MiddleContainers)`
    margin-right: 2px;
`;

const ContentRightContainer = styled(MiddleContainers)`
    margin-left: 2px;
`;

const MiddleFooter = styled.div`
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
    ${flex('column', 'center', 'stretch')}
`;

const Title = styled.div`
    ${flex('center')}
`;

interface IconContainerCompProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    width: number;
    Icon: React.FC;
}

const IconContainerComp: React.FC<IconContainerCompProps> = ({
    Icon,
    width,
}): React.ReactElement => <IconContainer width={width}>{Icon}</IconContainer>;

const IconContainer = styled.div`
    width: ${(props) => props.width}px;
    margin: 5px;
`;

const MiddleFooterIconContainer = styled(IconContainer)`
    margin: 0 4px 0 0;
`;

const QRScanBox = styled.div<MainInterface & ResponsiveInterface>`
    ${({ theme }): string => `
    background-color:${theme.colors.background};
    `}
    width: fit-content;

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

interface MiddleFooterCompProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    text: string;
    Icon: React.FC;
}

const MiddleFooterComp: React.FC<MiddleFooterCompProps> = ({
    text,
    Icon,
    width,
}): React.ReactElement => (
    <MiddleFooterCompBox>
        {!!Icon && (
            <MiddleFooterIconContainer width={width}>
                {Icon}
            </MiddleFooterIconContainer>
        )}
        <div>{text}</div>
    </MiddleFooterCompBox>
);

const MiddleFooterCompBox = styled.div`
    ${flex('center')}
`;

// these are components to be placed somewhere else

export const PhoneBox = styled.div`
    ${({ theme, ...rest }): string => `
    border:1px solid ${
        rest.inverted ? theme.colors.background : theme.colors.text
    };
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
        ${({ theme, ...rest }): string => `
        background: ${
            rest.inverted ? theme.colors.background : theme.colors.text
        };
        `}
        height: 1px;
        content: '';
        border-radius: 0 0 15px 15px;
    }
`;

interface IconCompProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    color: string;
}

export const PhoneIconComp: React.FC<IconCompProps> = ({
    color,
    height,
}): React.ReactElement => (
    <svg
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        style={{ enableBackground: 'new 0 0 512 512', height }}
    >
        <g color={color}>
            <g>
                <path
                    fill="currentColor"
                    d="M298.667,25.6h-85.333c-4.71,0-8.533,3.823-8.533,8.533c0,4.71,3.823,8.533,8.533,8.533h85.333
			c4.71,0,8.533-3.823,8.533-8.533C307.2,29.423,303.377,25.6,298.667,25.6z"
                />
            </g>
        </g>
        <g color={color}>
            <g>
                <path
                    fill="currentColor"
                    d="M358.4,25.6h-8.533c-4.71,0-8.533,3.823-8.533,8.533c0,4.71,3.823,8.533,8.533,8.533h8.533
			c4.71,0,8.533-3.823,8.533-8.533C366.933,29.423,363.11,25.6,358.4,25.6z"
                />
            </g>
        </g>
        <g color={color}>
            <g>
                <path
                    fill="currentColor"
                    d="M266.598,435.2H245.41c-12.979,0-23.543,10.564-23.543,23.543v4.122c0,12.979,10.564,23.535,23.535,23.535h21.188
			c12.979,0,23.543-10.556,23.543-23.535v-4.122C290.133,445.764,279.569,435.2,266.598,435.2z M273.067,462.865
			c0,3.567-2.901,6.468-6.468,6.468H245.41c-3.575,0-6.477-2.901-6.477-6.468v-4.122c0-3.575,2.901-6.477,6.477-6.477h21.18
			c3.576,0,6.477,2.901,6.477,6.477V462.865z"
                />
            </g>
        </g>
        <g color={color}>
            <g>
                <path
                    fill="currentColor"
                    d="M370.227,0H141.781c-17.007,0-30.848,13.841-30.848,30.848v450.304c0,17.007,13.841,30.848,30.848,30.848h228.437
			c17.007,0,30.848-13.841,30.848-30.839V30.848C401.067,13.841,387.226,0,370.227,0z M384,481.152
			c0,7.595-6.178,13.781-13.773,13.781H141.781c-7.603,0-13.781-6.187-13.781-13.773V30.848c0-7.595,6.178-13.781,13.781-13.781
			h228.437c7.603,0,13.781,6.187,13.781,13.781V481.152z"
                />
            </g>
        </g>
        <g color={color}>
            <g>
                <path
                    fill="currentColor"
                    d="M392.533,51.2H119.467c-4.71,0-8.533,3.823-8.533,8.533v358.4c0,4.71,3.823,8.533,8.533,8.533h273.067
			c4.71,0,8.533-3.823,8.533-8.533v-358.4C401.067,55.023,397.244,51.2,392.533,51.2z M384,409.6H128V68.267h256V409.6z"
                />
            </g>
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
    </svg>
);

export const DinosaurIconComp: React.FC<IconCompProps> = ({
    height,
    color,
}): React.ReactElement => (
    <svg
        x="0px"
        y="0px"
        viewBox="0 0 460 460"
        style={{ enableBackground: 'new 0 0 460 460', height }}
    >
        <g id="XMLID_93_">
            <path
                id="XMLID_102_"
                style={{ fill: '#42915F' }}
                d="M430,243.904v35.081h30v-95.533C460,204.951,447.458,229.031,430,243.904z"
            />
            <path
                id="XMLID_103_"
                style={{ fill: '#42915F' }}
                d="M460,170.996l0,12.457L460,170.996z"
            />
            <path
                id="XMLID_104_"
                style={{ fill: '#006E5E' }}
                d="M334.391,293.953c0,16.5-13.5,30-30,30h-21.339
		c-12.531,18.813-31.264,33.139-53.281,40.055v88.54h40v-83.959c53.386,0,96.996-41.834,99.848-94.508
		c-11.237,5.051-23.448,10.54-35.227,15.835V293.953z"
            />
            <path
                id="XMLID_105_"
                style={{ fill: '#A4C662' }}
                d="M459.998,111.548H430l0,132.356c17.458-14.874,30-38.953,30-60.452L459.998,111.548
		z"
            />
            <path
                id="XMLID_106_"
                style={{ fill: '#A4C662' }}
                d="M400,227.533l-100.318,45.094c-0.753,18.938-6.769,36.521-16.63,51.326h21.339
		c16.5,0,30-13.5,30-30v-4.037c11.779-5.295,23.99-10.784,35.227-15.835c11.741-5.277,22.406-10.072,30.382-13.657V227.533z"
            />
            <path
                id="XMLID_107_"
                style={{ fill: '#42915F' }}
                d="M199.775,150.939L60,150.956c-33.084,0-60,26.916-60,60s26.916,60,60,60h69.77v-40
		H60c-11.028,0-20-8.972-20-20s8.972-20,20-20h83.68l56.09,49.983v77.65h-40v133.959h40v-83.958c10.453,0,20.529-1.607,30-4.582
		c22.018-6.916,40.75-21.242,53.281-40.055c9.862-14.805,15.878-32.388,16.63-51.326c0.053-1.34,0.088-2.685,0.088-4.039v-17.65
		C299.77,195.712,255.001,150.942,199.775,150.939z M259.77,300.939h-30v-30h30V300.939z M259.77,240.939h-30v-30h30V240.939z"
            />
            <rect
                id="XMLID_138_"
                x="229.77"
                y="210.939"
                style={{ fill: '#006E5E' }}
                width="30"
                height="30"
            />
            <rect
                id="XMLID_169_"
                x="229.77"
                y="270.939"
                style={{ fill: '#006E5E' }}
                width="30"
                height="30"
            />
            <rect
                id="XMLID_197_"
                x="377.307"
                y="52"
                style={{ fill: '#A4C662' }}
                width="30"
                height="30"
            />
            <path
                id="XMLID_221_"
                style={{ fill: '#006E5E' }}
                d="M430,111.548h29.998v-61c0-27.5-22.248-46.644-49.441-42.542l-83.145,12.542V52
		h79.9v30h-79.9v29.548h32.191c7.002,9.117,18.008,15,30.392,15c0.005,0,0,54.391,0,54.391h-30v-30h-30v30h-30v-30h-100.22
		c55.227,0.003,99.995,44.773,99.995,100v17.65c0,1.354-0.035,2.698-0.088,4.039L400,227.533v51.452h30L430,111.548z"
            />
            <rect
                id="XMLID_222_"
                x="299.995"
                y="150.939"
                style={{ fill: '#42915F' }}
                width="30"
                height="30"
            />
            <rect
                id="XMLID_223_"
                x="359.995"
                y="150.939"
                style={{ fill: '#42915F' }}
                width="30"
                height="30"
            />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
    </svg>
);

export const qrImgURL1 =
    'https://storage.googleapis.com/support-forums-api/attachment/thread-13090132-506909745012483037.png';

export default QRScan;
