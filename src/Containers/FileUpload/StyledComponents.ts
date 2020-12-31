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
    flexGrow?:boolean;
}

export const Container=styled.div<IContainerProps>`  
${({dashed,withFlexCenter,withBorder,width,padding,isDragEnter,withFlexSpaceBetween,backgroundColor,borderRadius,height,opacity,maxHeight,overflow,position,margin,positionTop,flexGrow}):string=>`
${borderRadius?`border-radius:${borderRadius};`:'border-radius:10px;'}
${withBorder?`
border:2px ${dashed?'dashed':'solid'} rgba(128,128,128,.8);
`:''}
${withFlexCenter?flex('center'):''}
${withFlexSpaceBetween?flex('space-between','center'):''}
${width?`width:${width}px;`:''}
${padding?`padding:${padding};`:''}
${isDragEnter?`
background-color:#cce6ff;
@keyframes border-dance {
    0% {
      background-position: left top, right bottom, left bottom, right   top;
    }
    100% {
      background-position: left 15px top, right 15px bottom , left bottom 15px , right   top 15px;
    }
  }
  background-image: linear-gradient(90deg, #3399ff 50%, transparent 50%), linear-gradient(90deg, #3399ff 50%, transparent 50%), linear-gradient(0deg, #3399ff 50%, transparent 50%), linear-gradient(0deg, #3399ff 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
  background-position: left top, right bottom, left bottom, right   top;
  animation: border-dance .3s infinite linear;
`:''}
${backgroundColor?`background-color:${backgroundColor};`:''}
${opacity!==undefined?`opacity:${opacity};`:''}
${height?`height:${height}px;`:'height:auto;'}
${maxHeight!==undefined?`max-height:${maxHeight}px;`:''}
${overflow?`overflow:${overflow};`:''}
${position?`position:absolute;top:${positionTop}px;`:''}
${margin?`margin:${margin};`:''}
${flexGrow?`flex:1;`:''}
`}
transition:height .5s,opacity .5s,max-height 5s;
`

interface IIconProps{
  color?:string;
  width:number;
  height:number;
}

export const Icon = styled.svg<IIconProps>`
  ${({color,width,height}):string=>`
  ${color?`color:${color};`:''}
  width: ${width}px;
  height: ${height}px;
  `}
`;