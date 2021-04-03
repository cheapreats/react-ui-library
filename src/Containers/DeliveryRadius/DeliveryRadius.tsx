import React,{useState,useRef} from 'react'
import styled from 'styled-components'
import {MainTheme} from '@Themes'
import {Paragraph} from '@Text/Paragraph'
import Theme from '@Themes/ThemeTemplate'
import S from 'rc-slider'
import 'rc-slider/assets/index.css'
import {Mixins} from '@Utils'
import {useMap} from '@Utils/Hooks'

const SLIDER_MARK_SIZE='0.65rem'
const DECIMAL_BASE=10
const TIMES_THEME_CONTAINER_PADDING=3
const TIMES_THEME_CONTAINER_PADDING_BIS=2
const TIMES_H1_FONT_SIZE=2
const MAP_ASPECT_RATIO=2.5/4

interface ISliderProps{
    min?:number;
    max?:number;
}

interface IMapCoordinates{
    lat:number;
    lng:number;
}

export interface IDeliveryRadiusProps{
    title:string;
    description:string;
    width:number;
    leftMarkContent:string;
    rightMarkContent:string;
    sliderProps?:ISliderProps;
    unit:string;
    mapCoordinates:IMapCoordinates;
    mapZoom:number;
}

export const DeliveryRadius:React.FC<IDeliveryRadiusProps>=({width,title,description,leftMarkContent,rightMarkContent,sliderProps,unit,mapCoordinates,mapZoom}):React.ReactElement=>{
    const [sliderValue,setSliderValue]=useState(sliderProps?.min??0)

    const mapContainer=useRef<HTMLDivElement>(null)
    const mapApikey='gSSgDhU5omF7RhwKqsy_EenuqNgG24F9pIRck2Dkiu0'

    useMap(mapContainer,mapApikey,mapCoordinates,mapZoom)

    const updateSliderValue=(value:number)=>{
        setSliderValue(value)
    }

    return (
        <RootContainer width={width}>
            <TopPanel height={width*MAP_ASPECT_RATIO} ref={mapContainer} />
            <BottomPanel>
                <Paragraph size='h1' bold>{title}</Paragraph>
                <Paragraph size='small' bold>{description}</Paragraph>
                <SliderContainer>
                    <SliderValue size={`${parseFloat(Theme.font.size.h1)*TIMES_H1_FONT_SIZE}rem`} bold>
                        {sliderValue}
                        &nbsp;
                        {unit}
                    </SliderValue>
                    <Slider 
                        handleStyle={{
                            height: 56,
                            width: 56,
                            marginTop: -26,
                            backgroundColor: MainTheme.colors.text,
                            border: 0
                        }}
                        trackStyle={{
                            background: 'none'
                        }}
                        railStyle={{
                            backgroundColor:MainTheme.colors.text
                        }}
                        marks={{
                            0:<Paragraph size={SLIDER_MARK_SIZE} bold>{leftMarkContent}</Paragraph>,
                            100:<Paragraph size={SLIDER_MARK_SIZE} bold>{rightMarkContent}</Paragraph>,
                        }}
                        dotStyle={{
                            width:0,
                            height:0,
                            border:0
                        }}
                        onChange={updateSliderValue}
                        {...sliderProps}
                    />
                </SliderContainer>
            </BottomPanel>
        </RootContainer>
    )
}

interface IRootContainerProps{
    width:number;
}

const RootContainer=styled.div<IRootContainerProps>`
border-radius:${Theme.dimensions.radius};
${({width}):string=>`width:${width}px;`}
`

const BottomPanel=styled.div`
background-color:${MainTheme.colors.background};
padding:${Theme.dimensions.padding.container} ${Theme.dimensions.padding.container} ${parseInt(Theme.dimensions.padding.container as string,DECIMAL_BASE)*TIMES_THEME_CONTAINER_PADDING_BIS}px ${Theme.dimensions.padding.container};
border-radius:0 0 ${Theme.dimensions.radius} ${Theme.dimensions.radius};
`

interface ITopPanelProps{
    height:number;
}

const TopPanel=styled.div<ITopPanelProps>`
    ${({height}):string=>`height:${height}px;`}
border-radius:${Theme.dimensions.radius} ${Theme.dimensions.radius} 0 0;
border:2px solid ${MainTheme.colors.occupancyStatusColors.Occupied};
overflow:hidden;
`

const SliderContainer=styled.div`
padding:${parseInt(Theme.dimensions.padding.container as string,DECIMAL_BASE)*TIMES_THEME_CONTAINER_PADDING}px;
${Mixins.flex('column','center','center')}
`

const SliderValue=styled(Paragraph)`
padding:${Theme.dimensions.padding.container};
`

const Slider=styled(S)`
margin:${Theme.dimensions.padding.container};
`