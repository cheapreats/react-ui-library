import React from 'react'
import {Card as C} from '@Containers/Card/Card'
import styled from 'styled-components'
import {Mixins} from '@Utils'

export interface ISoldOutCardNotificationProps{
    imgSrc:string;
    header:React.ReactElement;
    footer:React.ReactElement;
    content:React.ReactElement;
}

export const SoldOutCardNotification:React.FC<ISoldOutCardNotificationProps>=({imgSrc,header,footer,content}):React.ReactElement=>
    (
        <Card animated widthFitContent>
            <Container flex1='row'>
                <Container flex1='column' flex2='space-around' flex={1}>
                    {header}
                    {content}
                    {footer}
                </Container>
                <Container flex1='column' flex2='flex-end' flex={1}>
                    <Img src={imgSrc} />
                </Container>
            </Container>
        </Card>
    )

interface IContainerProps{
    flex1?:string;
    flex2?:string;
    flex?:number;
}

const Container=styled.div<IContainerProps>`
    ${({flex1,flex2}):string=>{
        if(flex1&&flex2){
            return `${Mixins.flex(flex1,flex2)}`
        }
        if(flex1){
            return `${Mixins.flex(flex1)}`
        }
        return ``
    }}
    ${({flex}):string=>`
    ${flex!==undefined?`flex:${flex};`:''}
    `}
`

const Img=styled.img`
height:100px;
${({theme}):string=>`
border-radius:${theme.dimensions.radius};
`}
`

const Card=styled(C)`
max-width:355px;
`


