import styled from 'styled-components'
import {flex} from '@Utils/Mixins'

export interface IContainerProps{
    dashed?:boolean;
    withFlexCenter?:boolean;
    withFlexSpaceBetween?:boolean;
    withBorder?:boolean;
    width?:number;
    padding?:string;
    isDragEnter?:boolean;
    backgroundColor?:string;
    borderRadius?:string;
    height?:number;
    opacity?:number;
    overflow?:string;
    position?:boolean;
    maxHeight?:number;
    margin?:string;
    positionTop?:number;
}

export const Container=styled.div<IContainerProps>`  
${({dashed,withFlexCenter,withBorder,width,padding,isDragEnter,withFlexSpaceBetween,backgroundColor,borderRadius,height,opacity,maxHeight,overflow,position,margin,positionTop}):string=>`
${borderRadius?`border-radius:${borderRadius};`:'border-radius:10px;'}
${withBorder?`
border:2px ${dashed?'dashed':'solid'} rgba(128,128,128,.8);
`:''}
${withFlexCenter?flex('center'):''}
${withFlexSpaceBetween?flex('space-between','center'):''}
${width?`width:${width}px;`:''}
${padding?`padding:${padding};`:''}
${isDragEnter?'background-color:#cce6ff;border-color:#3399ff;':''}
${backgroundColor?`background-color:${backgroundColor};`:''}
${opacity!==undefined?`opacity:${opacity};`:''}
${height?`height:${height}px;`:'height:auto;'}
${maxHeight!==undefined?`max-height:${maxHeight}px;`:''}
${overflow?`overflow:${overflow};`:''}
${position?`position:absolute;top:${positionTop}px;`:''}
${margin?`margin:${margin};`:''}
`}
transition:height .5s,opacity .5s,max-height 5s;
`