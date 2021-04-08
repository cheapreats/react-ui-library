import React, {
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
    useMemo,
} from 'react';
import { BarChart, XAxis, YAxis, Bar, Text, Cell } from 'recharts';
import styled from 'styled-components';
import Theme from '@Themes/ThemeTemplate';
import { MainTheme } from '@Themes';
import { Mixins } from '@Utils';
import { Paragraph } from '@Text';

const FLEX_EQUAL_SPACE = 1;
const SUMMARY_BACKGROUND_COLOR = '#d3d3d3';
const BAR_LABEL_LEFT_MARGIN = 5;
const SUMMARY_CONTAINER_MARGIN = 14;
const IS_TOTAL_COLOR = '#d3d3d3';
const GREEN_COLOR_MARGIN = 5;
const ORANGE_COLOR_MARGIN = 15;
const BAR_SIZE = 20;

interface IDataItem {
    label: string;
    value: number;
    isComparedAgainst?: boolean;
}

interface IChartProperties {
    margin?: object;
    data: IDataItem[];
}

export interface IHorizontalBarChartProps {
    header: string;
    summaryHeader: string;
    summaryDescription: string;
    width?: number;
    chartProperties: IChartProperties;
    unit: string;
}

export const HorizontalBarChart: React.FC<IHorizontalBarChartProps> = ({
    chartProperties,
    header,
    summaryHeader,
    summaryDescription,
    unit,
    ...props
}): React.ReactElement => {
    const [chartWidth, setChartWidth] = useState<number>();
    const [chartHeight, setChartHeight] = useState<number>();

    // used to compute width and height for the chart based on width and height of summary container
    const summaryContainerRef = useRef<HTMLDivElement>(null);

    /**
     * compute dynamically the width and height of the chart
     */
    useLayoutEffect(() => {
        setChartHeight(summaryContainerRef.current?.clientHeight);
        setChartWidth(summaryContainerRef.current?.clientWidth);
    }, []);

    /**
     * this is the customized bar label used to tell the value of the bars
     */
    const BarLabel = useCallback(
        ({
            value,
            x,
            y,
            width: barWidth,
            height: barHeight,
        }: any): React.ReactElement<SVGElement> => {
            /**
             * this computes the x value for the text, based on x value of the bar, its width (bar width) and a little margin
             * @returns the x value for the text
             */
            const getPositionXForText = () =>
                x + barWidth + BAR_LABEL_LEFT_MARGIN;

            /**
             * this computes the y value for the text, based on y value for the bar, and bar height formula to place it in the center
             * of the bar
             * @returns the y value for the text
             */
            const getCenterOfBarYValue = () =>
                y + barHeight / 2 + barHeight / 4;

            return (
                <TextLabel
                    x={getPositionXForText()}
                    y={getCenterOfBarYValue()}
                    textAnchor="start"
                >
                    {value}
                    &nbsp;
                    {unit}
                </TextLabel>
            );
        },
        [unit],
    );

    /**
     * set colors for the bars based on its value difference with respect the isTotal bar
     */
    const colors = useMemo(() => {
        const result: string[] = [];
        const isTotalValue = chartProperties.data.find(
            (entry) => entry.isComparedAgainst,
        )?.value;
        if (isTotalValue)
            chartProperties.data.forEach((entry) => {
                if (entry.isComparedAgainst) result.push(IS_TOTAL_COLOR);
                else if (entry.value <= isTotalValue + GREEN_COLOR_MARGIN)
                    result.push(MainTheme.colors.statusColors.green);
                else if (entry.value <= isTotalValue + ORANGE_COLOR_MARGIN)
                    result.push(MainTheme.colors.statusColors.orange);
                else result.push(MainTheme.colors.statusColors.red);
            });
        return result;
    }, [chartProperties.data]);

    /**
     * this renders bars each one of a specific color
     */
    const renderCells = useCallback(
        () =>
            chartProperties.data.map((entry, index) => (
                <Cell key={entry.label} fill={colors[index]} />
            )),
        [colors, chartProperties.data],
    );

    return (
        <RootContainer {...props}>
            <HeaderContainer>
                <Paragraph size="h6" bold>
                    {header}
                </Paragraph>
            </HeaderContainer>
            <BottomContainer>
                <ChartContainer>
                    {/* chart width and chart height are expected to be numbers, not strings */}
                    <BarChart
                        width={chartWidth}
                        height={chartHeight}
                        layout="vertical"
                        {...chartProperties}
                    >
                        <YAxis
                            dataKey="label"
                            type="category"
                            tickLine={false}
                            tick={<CustomizedAxisTick />}
                            axisLine={{ stroke: IS_TOTAL_COLOR }}
                        />
                        <XAxis hide type="number" dataKey="value" />
                        <Bar
                            dataKey="value"
                            barSize={BAR_SIZE}
                            label={<BarLabel />}
                        >
                            {renderCells()}
                        </Bar>
                    </BarChart>
                </ChartContainer>
                <SummaryContainer ref={summaryContainerRef}>
                    <Paragraph bold>{summaryHeader}</Paragraph>
                    <br />
                    <Paragraph bold size="small">
                        {summaryDescription}
                    </Paragraph>
                </SummaryContainer>
            </BottomContainer>
        </RootContainer>
    );
};

interface IRootContainerProps {
    width?: number;
    height?: number;
}

const RootContainer = styled.div<IRootContainerProps>`
    ${({ width, height }): string => `
${width ? `width:${width}px;` : ''}
${height ? `height:${height}px;` : ''}
`}
    border-radius:${Theme.dimensions.radius};
    border: 1px solid ${MainTheme.colors.border};
    ${Mixins.flex('column')}
    padding:${Theme.dimensions.padding.container};
`;

const ChartContainer = styled.div`
    flex: ${FLEX_EQUAL_SPACE};
`;

const SummaryContainer = styled.div`
    flex: ${FLEX_EQUAL_SPACE};
    background-color: ${SUMMARY_BACKGROUND_COLOR};
    padding: ${Theme.dimensions.padding.container};
    margin: ${SUMMARY_CONTAINER_MARGIN}px;
`;

const HeaderContainer = styled.div``;

const BottomContainer = styled.div`
    ${Mixins.flex('space-between', 'center')}
`;

const CustomizedAxisTick = ({ payload, ...other }: any) => (
    <Text {...other} fontWeight="bold" fontSize={Theme.font.size.small}>
        {payload.value}
    </Text>
);

const TextLabel = styled.text`
    font-size: ${Theme.font.size.small};
    font-weight: bold;
    color: ${MainTheme.colors.text};
`;
