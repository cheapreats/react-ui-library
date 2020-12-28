import React,{forwardRef} from 'react'
import {Container,IContainerProps} from './Container'

interface IBottomPanelProps extends IContainerProps{
    children:React.ReactElement;
}

export const BottomPanel=forwardRef<HTMLDivElement,IBottomPanelProps>(({children,...props},forwadedRef):React.ReactElement=>{
    return (
        <Container {...props} ref={forwadedRef}>
            {children}
        </Container>
    )
})
