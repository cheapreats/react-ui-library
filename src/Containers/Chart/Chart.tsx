import React from 'react';
import styled from 'styled-components';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';
import { flex } from '@Utils/Mixins';
import {
    Main,
    Responsive,
    MainInterface,
    ResponsiveInterface,
} from '@Utils/BaseStyles';

export interface ChartProps extends ChartBoxProps {}

export const Chart: React.FC<ChartProps> = ({
    color,
    revenue,
    data,
    ...props
}): React.ReactElement => (
    <ChartBox color={color} revenue={revenue} data={data} {...props}>
        <Header>
            <HeaderLeftWrapper>
                <UpIcon />
                <HeaderLeft>
                    <HeaderLeftTitle color={color}>
                        <strong>REVENUE</strong>
                    </HeaderLeftTitle>
                    <span>
                        <strong>$</strong>
                        <Big>
                            <strong>
                                {revenue.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </strong>
                        </Big>
                    </span>
                    <HeaderLeftSubtitle>
                        <strong>+9.5% since last week</strong>
                    </HeaderLeftSubtitle>
                </HeaderLeft>
            </HeaderLeftWrapper>
            <Icons>
                <IconControl>
                    <Icon>
                        <ExportIcon />
                    </Icon>
                    <strong>Export</strong>
                </IconControl>
                <IconControl>
                    <Icon>
                        <PrintIcon />
                    </Icon>
                    <strong>Print</strong>
                </IconControl>
            </Icons>
        </Header>
        <LineChart width={460} height={160} data={data}>
            <XAxis dataKey="label" tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip
                cursor={false}
                content={
                    <CustomTooltip color={color} active={false} payload={[]} />
                }
            />
            <CartesianGrid vertical={false} />
            <Line type="linear" dataKey="value" stroke={color} />
        </LineChart>
    </ChartBox>
);

interface ChartData {
    label: string;
    value: number;
}

interface ChartBoxProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    color: string;
    revenue: string | number;
    data: Array<ChartData>;
}

const ChartBox = styled.div<ChartBoxProps>`
    // Theme Stuff
    ${({ theme, ...props }): string => `
    border-radius: ${theme.dimensions.radius};
    font-family: ${theme.font.family};
    color: ${theme.colors.text};
    ${Main({
        ...props,
    })}
    `}
    // Base Styles
    ${Responsive}
    ${flex('column')}
    width:fit-content;
    overflow: hidden;
`;

const Header = styled.div`
    ${flex('space-between')}
    padding-left:7%;
    margin-bottom: 5%;
`;

const HeaderLeftWrapper = styled.div`
    ${flex('center')}
`;

const HeaderLeft = styled.div`
    flex: 1;
    ${flex('column')}
`;

interface HeaderLeftTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    color: string;
}

const HeaderLeftTitle = styled.div<HeaderLeftTitleProps>`
    ${({ color }): string => `
color:${color};
`}
`;

const HeaderLeftSubtitle = styled.div`
    ${({ theme }): string => `
font-size:${theme.font.size.small};
color:${theme.colors.statusColors.green};
`}
`;

const IconControl = styled.div`
    ${flex()}
    margin-right:10%;
`;

const Icon = styled.div`
    margin-right: 4%;
`;

const Icons = styled.div`
    display: inline-flex;
    flex: 1;
    position: relative;
    left: 17%;
`;

interface CustomTooltipProps extends CustomTooltipBoxProps {
    color: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    ...props
}): React.ReactElement => {
    const getFormattedHoverValue = (): string => {
        if (payload) return payload[0]?.value?.toFixed(2);
        return '';
    };

    if (active) {
        return (
            <CustomTooltipBox active={active} payload={payload} {...props}>
                <strong>
                    $
                    <Big>{`${getFormattedHoverValue()}`}</Big>
                </strong>
            </CustomTooltipBox>
        );
    }

    return <div />;
};

const Big = styled.span`
    ${({ theme }): string => `
font-size:${theme.font.size.h1};
`}
`;

interface Payload {
    value: number;
}

interface CustomTooltipBoxProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    payload: Array<Payload>;
    active: boolean;
}

const CustomTooltipBox = styled.div<CustomTooltipBoxProps>`
    ${({ theme, color }): string => `
    background-color:${color};
    color:${theme.colors.background};
    `}
    padding:10px;
    border-radius: 6px;
`;

const PrintIcon = styled.div`
    display: inline-flex;
    color: #000;
    position: relative;
    margin-left: 2px;
    margin-top: 5px;
    width: 15px;
    height: 6px;
    border: solid 1px currentColor;
    border-radius: 1px 1px 0 0;

    &::before {
        content: '';
        position: absolute;
        left: 2px;
        top: -3px;
        height: 13px;
        width: 9px;
        border: solid 1px currentColor;
        background-color: white;
    }

    &::after {
        content: '';
        position: absolute;
        left: 1px;
        top: -1px;
        width: 13px;
        height: 3px;
        border-top: solid 1px currentColor;
        border-bottom: solid 1px currentColor;
        background-color: white;
    }
`;

const ExportIcon = styled.div`
    display: inline-flex;
    color: #000;
    position: relative;
    margin-left: 4px;
    margin-top: 7px;
    width: 11px;
    height: 9px;
    border-radius: 1px;
    border: solid 1px currentColor;

    &::before {
        content: '';
        position: absolute;
        top: -5px;
        left: 2px;
        width: 1px;
        height: 8px;
        border-left: solid 3px white;
        border-right: solid 3px white;
        background-color: currentColor;
    }

    &::after {
        content: '';
        position: absolute;
        left: 3px;
        top: -5px;
        width: 4px;
        height: 4px;
        border-top: solid 1px currentColor;
        border-right: solid 1px currentColor;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }
`;

const UpIcon = styled.div`
    margin: 10px;
    ${({ theme }): string => `
    color:${theme.colors.statusColors.green};
    `}
    &::before {
        content: '';
        display: inline-block;
        position: relative;
        left: -5px;
        top: 1px;
        width: 10px;
        height: 10px;
        border-top: solid 1px currentColor;
        border-right: solid 1px currentColor;
        transform: rotate(-45deg);
    }
`;

export default Chart;
