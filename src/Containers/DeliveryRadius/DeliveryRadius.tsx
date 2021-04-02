import React,{useState} from 'react'
import styled from 'styled-components'
import {MainTheme} from '@Themes'
import {Paragraph} from '@Text/Paragraph'
import Theme from '@Themes/ThemeTemplate'
import S from 'rc-slider'
import 'rc-slider/assets/index.css';
import {Mixins} from '@Utils'

const SLIDER_MARK_SIZE='0.65rem'
const DECIMAL_BASE=10
const TIMES_THEME_CONTAINER_PADDING=3
const TIMES_THEME_CONTAINER_PADDING_BIS=2
const TIMES_H1_FONT_SIZE=2

interface ISliderProps{
    min?:number;
    max?:number;
}

export interface IDeliveryRadiusProps{
    title:string;
    description:string;
    width:string|number;
    leftMarkContent:string;
    rightMarkContent:string;
    sliderProps?:ISliderProps;
    unit:string;
}

export const DeliveryRadius:React.FC<IDeliveryRadiusProps>=({width,title,description,leftMarkContent,rightMarkContent,sliderProps,unit}):React.ReactElement=>{
    const [sliderValue,setSliderValue]=useState(sliderProps?.min??0)

    const updateSliderValue=(value:number)=>{
        setSliderValue(value)
    }

    return (
        <RootContainer>
            <BottomPanel width={width}>
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
    width?:string|number;
    padding?:string;
}

const RootContainer=styled.div<IRootContainerProps>`
border-radius:${Theme.dimensions.radius};
${({padding}):string=>`
${padding?`padding:${padding};`:''}
`}
${({width}):string=>{
        if(width!==undefined)
            switch(typeof(width)){
            case'number':
                return `width:${width}px;`
            case'string':
                return `width:${width};`
            default:
                return ''
            }
        return 'width:fit-content;'
    }}
`

interface IBottomPanelProps{
    width?:string|number;
}

const BottomPanel=styled.div<IBottomPanelProps>`
background-color:${MainTheme.colors.background};
${({width}):string=>{
        if(width!==undefined)
            switch(typeof(width)){
            case'number':
                return `width:${width}px;`
            case'string':
                return `width:${width};`
            default:
                return ''
            }
        return ''
    }}
padding:${Theme.dimensions.padding.container} ${Theme.dimensions.padding.container} ${parseInt(Theme.dimensions.padding.container as string,DECIMAL_BASE)*TIMES_THEME_CONTAINER_PADDING_BIS}px ${Theme.dimensions.padding.container};
border-radius:0 0 ${Theme.dimensions.radius} ${Theme.dimensions.radius};
`

interface ISliderContainerProps{}

const SliderContainer=styled.div<ISliderContainerProps>`
padding:${parseInt(Theme.dimensions.padding.container as string,DECIMAL_BASE)*TIMES_THEME_CONTAINER_PADDING}px;
${Mixins.flex('column','center','center')}
`

const SliderValue=styled(Paragraph)`
padding:${Theme.dimensions.padding.container};
`

const Slider=styled(S)`
margin:${Theme.dimensions.padding.container};
`