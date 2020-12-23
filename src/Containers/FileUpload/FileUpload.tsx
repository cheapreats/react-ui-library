import React from 'react'
import styled from 'styled-components'
import {flex} from '@Utils/Mixins'
import {StyledIcon} from '@styled-icons/styled-icon'
import {TextLayout} from '@Layouts'

export interface IFileUploadProps{
    Title:React.FC;
    subTitle:string;
    Image:StyledIcon;
    minHeight:number;
}

export const FileUpload:React.FC<IFileUploadProps>=({
    Title,
    subTitle,
    Image,
    minHeight,
}):React.ReactElement=>{

    return (
        <Container>
            <SubContainer minHeight={minHeight}>
                <Icon as={Image} />
                {Title}
                <TextLayout size='small' bold color='rgba(128,128,128,.8)'>{subTitle}</TextLayout>
            </SubContainer>
        </Container>
    )
}

interface IContainerProps{
}

const Container=styled.div<IContainerProps>`  
border-radius:10px;
border:2px dashed rgba(128,128,128,.8);
${flex('center')}
padding:10px;
`

interface ISubContainerProps{
    minHeight?:number;
}

const SubContainer=styled.div<ISubContainerProps>`
${flex('column','space-between','center')}
${({minHeight}):string=>`
${minHeight?`
min-height:${minHeight}px;
`:''}
`} 
`

const Icon = styled.svg`
    width: 35px;
    height: 35px;
`;