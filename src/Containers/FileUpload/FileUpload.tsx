import React,{useCallback,useState,useRef,useEffect} from 'react'
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
    isFailure:boolean;
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
    isFailure,
    successMessage,
    failureMessage,
}):React.ReactElement=>{
    const [height,setHeight]=useState<number|undefined>(undefined)
    const [totalHeight,setTotalHeight]=useState(0)
    const [totalHeightPlus,setTotalHeightPlus]=useState(0)
    const [padding]=useState(10)
    const [maxHeight,setMaxHeight]=useState<number|undefined>(undefined)
    const [positionLoading,setPositionLoading]=useState(!isUploading)
    const [positionTopLoading,setPositionTopLoading]=useState(0)
    const [opacityLoading,setOpacityLoading]=useState(0)
    const [positionIsSuccess,setPositionIsSuccess]=useState(!isSuccess)
    const [opacityIsSuccess,setOpacityIsSuccess]=useState(0)
    const [loadingContainerHeight,setLoadingContainerHeight]=useState(0)
    const [widthComponent,setWidthComponent]=useState<number>(0)
    const [margin]=useState(10)
    const [widthIsSuccess,setWidthIsSuccess]=useState(0)
    const [positionIsFailure,setPositionIsFailure]=useState(!isFailure)
    const [opacityIsFailure,setOpacityIsFailure]=useState(0)

    useEffect(()=>{
        if(isUploading||isSuccess||isFailure){
            if(totalHeightPlus){
                setHeight(totalHeightPlus)
            }else{
                setHeight(undefined)
                setMaxHeight(600)
            }
        }else if(totalHeight){
            setHeight(totalHeight)   
        }
    },[isUploading,isSuccess,isFailure,totalHeight,totalHeightPlus])

    useEffect(()=>{
        if(containerRef.current?.scrollHeight){
            const contentHeight=containerRef.current.scrollHeight
            setTotalHeight(contentHeight-padding*2)
            setHeight(contentHeight-padding*2)
            setMaxHeight(contentHeight-padding*2)
        }
        if(rootRef.current?.clientWidth){
            setWidthComponent(rootRef.current?.clientWidth-margin*2-padding*2)
        }
    },[])

    useEffect(()=>{
        if(height===undefined&&(isUploading||isSuccess||isFailure)){ 
            if(containerRef.current?.scrollHeight){
                setTotalHeightPlus(containerRef.current.scrollHeight-padding*2)
            }
            if(loadingContainerRef.current?.getBoundingClientRect().top){
                setPositionTopLoading(loadingContainerRef.current?.getBoundingClientRect().top-margin)
            }
        }
    },[height,isUploading,isSuccess,isFailure])

    useEffect(()=>{
        if(isSuccess||isFailure){
            const width=containerRef.current?.getBoundingClientRect().width
            if(width){
                setWidthIsSuccess(width-padding*2-margin*2)
            }
        }
    },[isSuccess,isFailure])

    useEffect(()=>{
        if(!isUploading||isSuccess||isFailure){
            setOpacityLoading(0)
            setPositionLoading(true)
        }
        return ()=>{
            setPositionLoading(false)
            setOpacityLoading(1)
        }
    },[isUploading,isSuccess,isFailure])

    useEffect(()=>{
        if(!isSuccess||isFailure){
            setOpacityIsSuccess(0)
            setPositionIsSuccess(true)
        }
        return ()=>{
            setPositionIsSuccess(false)
            setOpacityIsSuccess(1)
        }
    },[isSuccess,isFailure])


    useEffect(()=>{
        if(!isFailure){
            setOpacityIsFailure(0)
            setPositionIsFailure(true)
        }
        return ()=>{
            setPositionIsFailure(false)
            setOpacityIsFailure(1)
        }
    },[isFailure])

    const containerRef=useRef<HTMLDivElement>(null)
    const loadingContainerRef=useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if(isUploading&&loadingContainerRef.current?.scrollHeight){
            setLoadingContainerHeight(loadingContainerRef.current?.scrollHeight)
        }
    },[isUploading])

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
    const {getRootProps, getInputProps,rootRef} = useDropzone({onDrop,onDragEnter,onDragLeave})

    return (
        <Container backgroundColor='white' padding='10px' borderRadius='20px' ref={containerRef} maxHeight={maxHeight} overflow='hidden' height={height} margin={`${margin}px`}>
            <Container {...getRootProps({dashed:true,withFlexCenter:true,withBorder:true,isDragEnter,padding:'10px',margin:`${margin}px`})}>
                <SubContainer minHeight={minHeight}>
                    <Icon as={Image} />
                    <TextLayout bold color='DarkBlue'>
                        {title}
                    </TextLayout>      
                    <TextLayout size='small' bold color='rgba(128,128,128,.8)'>{subTitle}</TextLayout>
                    <input {...getInputProps()}  />
                </SubContainer>
            </Container>
            <Container withBorder padding='30px 20px 43px 20px' opacity={opacityLoading} position={positionLoading} ref={loadingContainerRef} overflow='hidden' width={widthComponent} margin={`${margin}px`} positionTop={positionTopLoading}>
                <Loading loading={isUploading} message='Uploading...' />
            </Container>
            <Container withBorder opacity={opacityIsSuccess} height={loadingContainerHeight} position={positionIsSuccess} margin={`${margin}px`} positionTop={positionTopLoading} width={widthIsSuccess}>
                <Container withFlexSpaceBetween>
                    <TextLayout bold color='DarkBlue'>{successMessage}</TextLayout>
                    <Icon as={CheckCircle} color={MainTheme.colors.statusColors.green} />
                </Container>
            </Container>
            <Container withBorder opacity={opacityIsFailure} height={loadingContainerHeight} position={positionIsFailure} margin={`${margin}px`} positionTop={positionTopLoading} width={widthIsSuccess}>
                <Container withFlexSpaceBetween>
                    <TextLayout bold color='DarkBlue'>{failureMessage}</TextLayout>
                    <Icon as={TimesCircle} color={MainTheme.colors.statusColors.red} />
                </Container>
            </Container> 
        </Container>
    )
}

interface IContainerProps{
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

const Container=styled.div<IContainerProps>`  
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
transition:height .5s,opacity 1s,max-height 5s;
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
