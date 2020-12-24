import React,{useCallback,useState} from 'react'
import styled from 'styled-components'
import {flex} from '@Utils/Mixins'
import {TextLayout} from '@Layouts'
import {useDropzone} from 'react-dropzone'
import {Image} from '@styled-icons/fa-solid/Image';
import {CheckCircle} from '@styled-icons/fa-solid/CheckCircle'
import {TimesCircle} from '@styled-icons/fa-solid/TimesCircle'
import {MainTheme} from '@Themes'
import {Loading} from '../Loading/Loading'

export interface IFileUploadProps{
    title:string;
    subTitle:string;
    minHeight:number;
    setBase64:(base64StringFile:string)=>void;
    isUploading:boolean;
    isSuccess:boolean;
    successMessage:string;
    failureMessage:string;
}

export const FileUpload:React.FC<IFileUploadProps>=({
    title,
    subTitle,
    minHeight,
    setBase64,
    isUploading,
    isSuccess,
    successMessage,
    failureMessage,
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
            <Container {...getRootProps({dashed:true,withFlexCenter:true,withBorder:true,isDragEnter,padding:'10px'})}>
                <SubContainer minHeight={minHeight}>
                    <Icon as={Image} />
                    <TextLayout bold color='DarkBlue'>
                        {title}
                    </TextLayout>      
                    <TextLayout size='small' bold color='rgba(128,128,128,.8)'>{subTitle}</TextLayout>
                    <input {...getInputProps()}  />
                </SubContainer>
            </Container>
            {(isUploading|| isSuccess!==undefined)&&
            (
                <Container withBorder padding='30px 20px 43px 20px'>
                    {isSuccess===undefined&&<Loading loading={isUploading} message='Uploading...' />}
                    {isSuccess&&
                    (
                        <Container withFlexSpaceBetween>
                            <TextLayout bold color='DarkBlue'>{successMessage}</TextLayout>
                            <Icon as={CheckCircle} color={MainTheme.colors.statusColors.green} />
                        </Container>
                    )}
                    {isSuccess===false&&
                    (
                        <Container withFlexSpaceBetween>
                            <TextLayout bold color='DarkBlue'>{failureMessage}</TextLayout>
                            <Icon as={TimesCircle} color={MainTheme.colors.statusColors.red} />
                        </Container>
                    )}
                </Container>
            )}
        </div>
        
    )
}

interface IContainerProps{
    dashed?:boolean;
    withFlexCenter?:boolean;
    withFlexSpaceBetween?:boolean;
    withBorder?:boolean;
    width?:string;
    padding?:string;
    isDragEnter?:boolean;
}

const Container=styled.div<IContainerProps>`  
border-radius:10px;
${({dashed,withFlexCenter,withBorder,width,padding,isDragEnter,withFlexSpaceBetween}):string=>`
${withBorder?`
border:2px ${dashed?'dashed':'solid'} rgba(128,128,128,.8);
`:''}
${withFlexCenter?flex('center'):''}
${withFlexSpaceBetween?flex('space-between','center'):''}
${width?`width:${width};`:''}
${padding?`padding:${padding};`:''}
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

interface IIconProps{
    color?:string;
}

const Icon = styled.svg<IIconProps>`
    ${({color}):string=>`
    ${color?`color:${color};`:''}
    `}
    width: 35px;
    height: 35px;
`;
