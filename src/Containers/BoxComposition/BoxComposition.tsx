import React from 'react'
import styled from 'styled-components'

interface IBoxProps{
    imgSource:string;
    top:number;
    left:number;
    width:number;
    height:number;
}

const Box:React.FC<IBoxProps>=({imgSource,top,left,width,height}):React.ReactElement=>
    <Img src={imgSource} top={top} left={left} width={width} height={height} />
    
interface IImgProps{
    width:number;
    height:number;
    top:number;
    left:number;
}

const Img=styled.img<IImgProps>`
    position:absolute;
    ${({width,height,top,left}):string=>`
    width:${width}px;
    height:${height}px;
    top:${top}px;
    left:${left}px;
    `}
    border-radius:5px;
    box-shadow:0 0 1px 0 black;
`

export interface IBoxCompositionProps{
    data:IBoxProps[];
}

export const BoxComposition:React.FC<IBoxCompositionProps>=({data}):React.ReactElement=>
    (
        <div>
            {data.map(stripeProps=><Box {...stripeProps} />) }
        </div>
    )