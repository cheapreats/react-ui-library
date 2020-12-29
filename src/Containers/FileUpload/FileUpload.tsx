import React,{useCallback,useState,useRef,useEffect,useLayoutEffect} from 'react'
import styled from 'styled-components'
import {flex} from '@Utils/Mixins'
import {TextLayout} from '@Layouts'
import {useDropzone} from 'react-dropzone'
import {Image} from '@styled-icons/fa-solid/Image';
import {CheckCircle} from '@styled-icons/fa-solid/CheckCircle'
import {TimesCircle} from '@styled-icons/fa-solid/TimesCircle'
import {MainTheme} from '@Themes'
import {Loading} from '../Loading/Loading'
import {BottomPanel} from './BottomPanel'
import {Container,Icon} from './StyledIcons'
import {FileMovingAnimation} from './FileMovingAnimation'
import {IsFailureIsSuccessPanel} from './IsFailureIsSuccessPanel'

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
    disabled:boolean;
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
    disabled,
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
    const [widthComponent,setWidthComponent]=useState(0)
    const [margin]=useState(10)
    const [widthIsSuccess,setWidthIsSuccess]=useState(0)
    const [positionIsFailure,setPositionIsFailure]=useState(!isFailure)
    const [opacityIsFailure,setOpacityIsFailure]=useState(0)

    // this sets height of the component, is used to transition between heights. 
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

    // this is to calculate (set) some values
    useEffect(()=>{
        if(containerRef.current?.scrollHeight){
            const contentHeight=containerRef.current.scrollHeight
            setTotalHeight(contentHeight-padding*2)
            setMaxHeight(contentHeight-padding*2)
        }
        if(rootRef.current?.clientWidth){
            setWidthComponent(rootRef.current?.clientWidth-margin*2-padding*2)
        }
    },[])

    // this is to set some values the first time when the component it's expanded
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

    // this is to calculate and set the width of the success and failure container component
    useEffect(()=>{
        if(isSuccess||isFailure){
            const width=containerRef.current?.getBoundingClientRect().width
            if(width){
                setWidthIsSuccess(width-padding*2-margin*2)
            }
        }
    },[isSuccess,isFailure])

    // this is to fade out uploading container component
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

    // this is to fade out success container component
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

    // this is to fade out failure container component
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

    // this is used to resize bottom panel with when resizing window browser
    useLayoutEffect(() => {
        function updateSize() {
            if(rootRef.current?.clientWidth){
                setWidthComponent(rootRef.current?.clientWidth-margin*2-padding*2)
            }
            if(isSuccess||isFailure){
                const width=containerRef.current?.getBoundingClientRect().width
                if(width){
                    setWidthIsSuccess(width-padding*2-margin*2)
                }
            }
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [isSuccess,isFailure]);

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
    const {getRootProps, getInputProps,rootRef} = useDropzone({onDrop,onDragEnter,onDragLeave,disabled})

    return (
        <Container backgroundColor='white' padding='10px' borderRadius='20px' ref={containerRef} maxHeight={maxHeight} overflow='hidden' height={height} margin={`${margin}px`}>
            <Container {...getRootProps({dashed:true,withFlexCenter:true,withBorder:!isDragEnter,isDragEnter,padding:'10px',margin:`${margin}px`})}>
                <SubContainer minHeight={minHeight} disabled={disabled}>
                    {isDragEnter?<FileMovingAnimation />:<Icon as={Image} width={140} height={80} />}
                    <TextLayout bold color='DarkBlue'>
                        {title}
                    </TextLayout>      
                    <TextLayout size='small' bold color='rgba(128,128,128,.8)'>{subTitle}</TextLayout>
                    <input {...getInputProps()}  />
                </SubContainer>
            </Container>
            <BottomPanel withBorder padding='30px 20px 43px 20px' opacity={opacityLoading} position={positionLoading} ref={loadingContainerRef} overflow='hidden' width={widthComponent} margin={`${margin}px`} positionTop={positionTopLoading}>
                <Loading loading={isUploading} message='Uploading...' />
            </BottomPanel>
            <BottomPanel withBorder opacity={opacityIsSuccess} height={loadingContainerHeight} position={positionIsSuccess} margin={`${margin}px`} positionTop={positionTopLoading} width={widthIsSuccess}>
                <IsFailureIsSuccessPanel message={successMessage} iconColor={MainTheme.colors.statusColors.green} IconToShow={CheckCircle} />
            </BottomPanel>
            <BottomPanel withBorder opacity={opacityIsFailure} height={loadingContainerHeight} position={positionIsFailure} margin={`${margin}px`} positionTop={positionTopLoading} width={widthIsSuccess}>
                <IsFailureIsSuccessPanel message={failureMessage} iconColor={MainTheme.colors.statusColors.red} IconToShow={TimesCircle} />
            </BottomPanel> 
        </Container>
    )
}

interface ISubContainerProps{
    minHeight?:number;
    disabled:boolean;
}

const SubContainer=styled.div<ISubContainerProps>`
${flex('column','space-between','center')}
${({minHeight,disabled}):string=>`
${minHeight?`
min-height:${minHeight}px;
`:''}
${disabled?`opacity:0.6;`:''}
`} 
`

