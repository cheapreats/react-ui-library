import React from 'react'
import {TextLayout} from '@Layouts'
import {StyledIcon} from '@styled-icons/styled-icon'
import {Container,Icon} from './StyledIcons'

interface IIsFailureIsSuccessPanelProps{
    IconToShow:StyledIcon;
    iconColor:string;
    message:string;
}

export const IsFailureIsSuccessPanel:React.FC<IIsFailureIsSuccessPanelProps>=({IconToShow,iconColor,message}):React.ReactElement=>{
    return (
        <Container withFlexSpaceBetween>
            <TextLayout bold color='DarkBlue'>{message}</TextLayout>
            <Icon as={IconToShow} color={iconColor} width={35} height={35} />
        </Container>
    )
}
