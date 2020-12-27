import React,{forwardRef} from 'react'
import {Container} from './Container'

interface IBottomPanelProps{
    children:React.ReactElement;
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

export const BottomPanel=forwardRef<HTMLDivElement,IBottomPanelProps>(({children,...props},forwadedRef):React.ReactElement=>{
    return (
        <Container {...props} ref={forwadedRef}>
            {children}
        </Container>
    )
})
