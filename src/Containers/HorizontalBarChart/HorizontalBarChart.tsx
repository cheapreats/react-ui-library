import React,{useCallback, useLayoutEffect, useRef,useState,useMemo} from 'react'
import {BarChart,XAxis,YAxis,Bar,Text,Cell} from 'recharts'
import styled from 'styled-components'
import Theme from '@Themes/ThemeTemplate'
import {MainTheme} from '@Themes'
import {Mixins} from '@Utils'
import {Paragraph} from '@Text'

const FLEX_EQUAL_SPACE=1
const SUMMARY_BACKGROUND_COLOR='#d3d3d3'
const BAR_LABEL_LEFT_MARGIN=5
const SUMMARY_CONTAINER_MARGIN=14
const IS_TOTAL_COLOR='#d3d3d3'
const GREEN_COLOR_MARGIN=5
const ORANGE_COLOR_MARGIN=15
const BAR_SIZE=20

interface IDataItem{
    label:string;
    value:number;
    isTotal:boolean;
}

interface IChartOptionalProperties{
    margin?:object;
}

export interface IHorizontalBarChartProps extends IChartOptionalProperties{
    data:IDataItem[];
    header:string;
    summaryHeader:string;
    summaryDescription:string;
    unit:string;
    width?:number;
}

export const HorizontalBarChart:React.FC<IHorizontalBarChartProps>=({data,header,summaryHeader,summaryDescription,width,margin,unit}):React.ReactElement=>{
    const [chartWidth,setChartWidth]=useState<number>()
    const [chartHeight,setChartHeight]=useState<number>()

    // used to compute width and height for the chart based on width and height of summary container
    const summaryContainerRef=useRef<HTMLDivElement>(null)

    /**
     * gets an object with not undefined properties for the chart
     * @returns {IChartOptionalProperties} an object with the not undefined optional properties set to its value
     */
    const getChartOptionalProperties=()=>{
        const chartOptionalProperties:IChartOptionalProperties={}
        if(margin)
            chartOptionalProperties.margin=margin
        return chartOptionalProperties
    }

    /**
     * compute dynamically the width and height of the chart
     */
    useLayoutEffect(()=>{
        setChartHeight(summaryContainerRef.current?.clientHeight)
        setChartWidth(summaryContainerRef.current?.clientWidth)
    },[])


    /**
     * this is the customized bar label
     */
    const BarLabel=useCallback(({value,x,y,width:barWidth,height:barHeight}:any):React.ReactElement<SVGElement>=>(
        <text 
            x={x+barWidth+BAR_LABEL_LEFT_MARGIN}
            y={y+barHeight/2+barHeight/4}
            textAnchor='start'
            fontSize={Theme.font.size.small} 
            fontWeight='bold'
            color={MainTheme.colors.text}
        >
            {value} 
            &nbsp;
            {unit}
        </text>
    )
    ,[unit])

    /**
     * set colors for the bars based on its value difference with respect the isTotal bar
     */
    const colors=useMemo(()=>{
        const result:string[]=[]
        const isTotalValue=data.find((entry)=>entry.isTotal)?.value
        if(isTotalValue)
            data.forEach(entry=>{
                if(entry.isTotal)
                    result.push(IS_TOTAL_COLOR)
                else if(entry.value<=isTotalValue+GREEN_COLOR_MARGIN)
                    result.push(MainTheme.colors.statusColors.green)
                else if(entry.value<=isTotalValue+ORANGE_COLOR_MARGIN)
                    result.push(MainTheme.colors.statusColors.orange)
                else result.push(MainTheme.colors.statusColors.red)
            })
        return result
    },[data])

    return (   
        <RootContainer width={width}>
            <HeaderContainer>
                <Paragraph size='h6' bold>{header}</Paragraph>
            </HeaderContainer>
            <BottomContainer>
                <ChartContainer>
                    <BarChart width={chartWidth} height={chartHeight} data={data} layout='vertical' {...getChartOptionalProperties()}>
                        <YAxis dataKey='label' type='category' tickLine={false} tick={<CustomizedAxisTick />} axisLine={{stroke:IS_TOTAL_COLOR}} />
                        <XAxis hide type='number' dataKey='value' />
                        <Bar dataKey='value' barSize={BAR_SIZE} label={<BarLabel />}>
                            {
                                data.map((entry, index) => (
                                    <Cell key={entry.label} fill={colors[index]} />
                                ))
                            }
                        </Bar>
                    </BarChart>
                </ChartContainer>
                <SummaryContainer ref={summaryContainerRef}>
                    <Paragraph bold>{summaryHeader}</Paragraph>
                    <br />
                    <Paragraph bold size='small'>{summaryDescription}</Paragraph>
                </SummaryContainer>
            </BottomContainer>
        </RootContainer>                      
    )
}

interface IRootContainerProps{
    width?:number;
    height?:number;
}

const RootContainer=styled.div<IRootContainerProps>`
${({width,height}):string=>`
${width?`width:${width}px;`:''}
${height?`height:${height}px;`:''}
`}
border-radius:${Theme.dimensions.radius};
border:1px solid ${MainTheme.colors.border};
${Mixins.flex('column')}
padding:${Theme.dimensions.padding.container};
`

const ChartContainer=styled.div`
flex:${FLEX_EQUAL_SPACE};
`

const SummaryContainer=styled.div`
flex:${FLEX_EQUAL_SPACE};
background-color:${SUMMARY_BACKGROUND_COLOR};
padding:${Theme.dimensions.padding.container};
margin:${SUMMARY_CONTAINER_MARGIN}px;
`

const HeaderContainer=styled.div`
`

const BottomContainer=styled.div`
${Mixins.flex('space-between','center')}
`

const CustomizedAxisTick =({payload,...other}:any)=>(
    <Text {...other} fontWeight='bold' fontSize={Theme.font.size.small}>{payload.value}</Text>
)

