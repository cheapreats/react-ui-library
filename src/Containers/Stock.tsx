import React from 'react';
import styled from 'styled-components';
import { LineChart, Line } from 'recharts';
import { ArrowUp } from '@styled-icons/entypo/ArrowUp';
import { ArrowDown } from '@styled-icons/entypo/ArrowDown';
import { flex } from '../Utils/Mixins';
import {
    Main,
    Responsive,
    MainInterface,
    ResponsiveInterface,
} from '../Utils/BaseStyles';
import { MainTheme } from '../Themes';

interface ChartDataItem {
    value: string | number;
}

export interface StockProps extends StockBoxProps {
    chartData: Array<ChartDataItem>;
    chartColor: string;
    title: string;
    figure: number;
    rate: number;
    bgColor: string;
}

const getChartColor = (colorKey: string) =>
    MainTheme.colors[colorKey] || colorKey;

const getFigure = (figure: number) =>
    figure.toLocaleString(undefined, { maximumFractionDigits: 2 });

const getRateIcon = (rate: number) =>
    rate < 0 ? <StyledArrowDown /> : <StyledArrowUp />;

export const Stock: React.FC<StockProps> = ({
    chartColor,
    chartData,
    title,
    figure,
    rate,
    ...props
}): React.ReactElement => {
    return (
        <StockBox {...props}>
            <Content>
                <Text size="h6" color="text">
                    <strong>{title}</strong>
                </Text>
                <Text size="h1" color="background">
                    <strong>{getFigure(figure)}</strong>
                </Text>
                <Text size="h6" color={chartColor}>
                    <strong>
                        {`${getFigure(rate)} `}
                        {getRateIcon(rate)}
                    </strong>
                </Text>
            </Content>
            <Content>
                <LineChart width={150} height={50} data={chartData}>
                    <Line
                        type="linear"
                        dataKey="value"
                        stroke={getChartColor(chartColor)}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </Content>
        </StockBox>
    );
};

interface StockBoxProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    bgColor: string;
}

const StockBox = styled.div<StockBoxProps>`
    // Theme Stuff
    ${({ theme, ...props }): string => `
    border-radius: ${theme.dimensions.radius};
    font-family: ${theme.font.family};
    color: ${theme.colors.text};
    background-color:${MainTheme.colors[props.bgColor] || props.bgColor};
    ${Main({
        ...props,
    })}
    `}
    // Base Styles
    ${Responsive}
    ${flex('flex-start', 'center')}
    width:fit-content;
`;

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
    size: string;
}

const Text = styled.div<TextProps>`
    ${({ theme, ...props }): string => `
font-size:${theme.font.size[props.size] || props.size};
color:${theme.colors[props.color as string] || props.color};
`}
`;

const Content = styled.div`
    margin: 10px 20px 10px 10px;
`;

const StyledArrowUp = styled(ArrowUp)`
    width: 15px;
`;
const StyledArrowDown = styled(ArrowDown)`
    width: 15px;
`;

export default Stock;
