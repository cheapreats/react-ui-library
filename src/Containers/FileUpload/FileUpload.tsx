import React,{useCallback,useState} from 'react'
import styled from 'styled-components'
import {flex} from '@Utils/Mixins'
import {StyledIcon} from '@styled-icons/styled-icon'
import {TextLayout} from '@Layouts'
import {useDropzone} from 'react-dropzone'
import {Loading} from '../Loading/Loading'

export interface IFileUploadProps{
    title:string;
    subTitle:string;
    Image:StyledIcon;
    minHeight:number;
    setBase64:(base64StringFile:string)=>void;
    isUploading:boolean;
}

export const FileUpload:React.FC<IFileUploadProps>=({
    title,
    subTitle,
    Image,
    minHeight,
    setBase64,
    isUploading,
}):React.ReactElement=>{
    const [isDragEnter,setIsDragEnter]=useState(false);
    const onDrop = useCallback((acceptedFiles:File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onload = () => {
                if(reader.result){
                    let base64StringFile=''
                    if(typeof(reader.result)==='string'){
                        base64StringFile=btoa(reader.result)
                    }else{
                        const bytes = Array.from(new Uint8Array(reader.result));
                        base64StringFile = btoa(bytes.map((item) => String.fromCharCode(item)).join(""));
                    }
                    if(base64StringFile){
                        setBase64(base64StringFile)
                    }
                }
            }
            reader.readAsArrayBuffer(file)
            setIsDragEnter(false)
        })
    }, []);
    const onDragEnter=useCallback((event:React.DragEvent)=>{
        event.preventDefault();
        setIsDragEnter(true);
    },[]);
    const onDragLeave=useCallback((event:React.DragEvent)=>{
        event.preventDefault();
        setIsDragEnter(false);
    },[]);
    const {getRootProps, getInputProps} = useDropzone({onDrop,onDragEnter,onDragLeave})
    return (
        <div>
            <Container {...getRootProps({dashed:true,withFlex:true,withBorder:true,isDragEnter})}>
                <SubContainer minHeight={minHeight}>
                    <Icon as={Image} />
                    <TextLayout bold color='DarkBlue'>
                        {title}
                    </TextLayout>      
                    <TextLayout size='small' bold color='rgba(128,128,128,.8)'>{subTitle}</TextLayout>
                    <input {...getInputProps()}  />
                </SubContainer>
            </Container>
            {isUploading&&
            (
                <Container withBorder padding='30px 20px 43px 20px'>
                    <Loading loading={isUploading} message='Uploading...' />
                </Container>
            )}
        </div>
        
    )
}

interface IContainerProps{
    dashed?:boolean;
    withFlex?:boolean;
    withBorder?:boolean;
    width?:string;
    padding?:string;
    isDragEnter?:boolean;
}

const Container=styled.div<IContainerProps>`  
border-radius:10px;
${({dashed,withFlex,withBorder,width,padding,isDragEnter}):string=>`
${withBorder?`
border:2px ${dashed?'dashed':'solid'} rgba(128,128,128,.8);
`:''}
${withFlex?flex('center'):''}
${width?`width:${width};`:''}
${padding?`padding:${padding};`:'padding:10px;'}
${isDragEnter?'background-color:#cce6ff;border-color:#3399ff;':''}
`}
margin:10px;
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
