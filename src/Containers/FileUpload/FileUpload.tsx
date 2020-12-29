import React,{useCallback,useRef,useEffect,useLayoutEffect,useReducer} from 'react'
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

interface IOptions{
    position:boolean;
    opacity:number;
}

interface IState{
    height:number|undefined;
    totalHeight:number;
    totalHeightPlus:number;
    padding:number;
    margin:number;
    maxHeight:number|undefined;
    loading:IOptions;
    isSuccess:IOptions;
    isFailure:IOptions;
    positionTopLoading:number;
    loadingContainerHeight:number;
    componentWidth:number;
    isSuccessWidth:number;
    isDragEnter:boolean;
}

const SET_HEIGHT='SET_HEIGHT'
const SET_MAXHEIGHT='SET_MAXHEIGHT'
const SET_TOTALHEIGHT='SET_TOTALHEIGHT'
const SET_COMPONENTWIDTH='SET_COMPONENTWIDTH'
const SET_TOTALHEIGHTPLUS='SET_TOTALHEIGHTPLUS'
const SET_POSITIONTOPLOADING='SET_POSITIONTOPLOADING'
const SET_ISSUCCESSWIDTH='SET_ISSUCCESSWIDTH'
const SET_OPACITYLOADING='SET_OPACITYLOADING'
const SET_POSITIONLOADING='SET_POSITIONLOADING'
const SET_OPACITYISSUCCESS='SET_OPACITYISSUCCESS'
const SET_POSITIONISSUCCESS='SET_POSITIONISSUCCESS'
const SET_OPACITYISFAILURE='SET_OPACITYISFAILURE'
const SET_POSITIONISFAILURE='SET_POSITIONISFAILURE'
const SET_LOADINGCONTAINERHEIGHT='SET_LOADINGCONTAINERHEIGHT'
const SET_ISDRAGENTER='SET_ISDRAGENTER'

type Action=|{
    type:'SET_HEIGHT'|'SET_MAXHEIGHT';
    value:number|undefined;
}|{
    type:'SET_TOTALHEIGHT'|'SET_COMPONENTWIDTH'|'SET_TOTALHEIGHTPLUS'|'SET_POSITIONTOPLOADING'|'SET_ISSUCCESSWIDTH'|'SET_OPACITYLOADING'|'SET_OPACITYISSUCCESS'|'SET_OPACITYISFAILURE'|'SET_LOADINGCONTAINERHEIGHT';
    value:number;
}|{
    type:'SET_POSITIONLOADING'|'SET_POSITIONISSUCCESS'|'SET_POSITIONISFAILURE'|'SET_ISDRAGENTER';
    value:boolean;
}

const reducer=(state:IState,action:Action):IState=>{
    switch(action.type){
    case SET_HEIGHT:
        return {
            ...state,
            height:action.value,
        }
    case SET_MAXHEIGHT:
        return {
            ...state,
            maxHeight:action.value,
        }
    case SET_TOTALHEIGHT:
        return {
            ...state,
            totalHeight:action.value,
        }
    case SET_COMPONENTWIDTH:
        return {
            ...state,
            componentWidth:action.value,
        }
    case SET_TOTALHEIGHTPLUS:
        return {
            ...state,
            totalHeightPlus:action.value
        }
    case SET_POSITIONTOPLOADING:
        return {
            ...state,
            positionTopLoading:action.value
        }
    case SET_ISSUCCESSWIDTH:
        return {
            ...state,
            isSuccessWidth:action.value,
        }
    case SET_OPACITYLOADING:
        return {
            ...state,
            loading:{
                ...state.loading,
                opacity:action.value,
            },
        }
    case SET_POSITIONLOADING:
        return {
            ...state,
            loading:{
                ...state.loading,
                position:action.value,
            },
        }
    case SET_OPACITYISSUCCESS:
        return {
            ...state,
            isSuccess:{
                ...state.isSuccess,
                opacity:action.value,
            },
        }
    case SET_POSITIONISSUCCESS:
        return {
            ...state,
            isSuccess:{
                ...state.isSuccess,
                position:action.value,
            },
        }
    case SET_OPACITYISFAILURE:
        return {
            ...state,
            isFailure:{
                ...state.isFailure,
                opacity:action.value,
            },
        }
    case SET_POSITIONISFAILURE:
        return {
            ...state,
            isFailure:{
                ...state.isFailure,
                position:action.value,
            },
        }
    case SET_LOADINGCONTAINERHEIGHT:
        return {
            ...state,
            loadingContainerHeight:action.value,
        }
    case SET_ISDRAGENTER:
        return {
            ...state,
            isDragEnter:action.value,
        }
    default:
        return state
    }
}


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
    const initState:IState={
        height:undefined,
        totalHeight:0,
        totalHeightPlus:0,
        maxHeight:undefined,
        padding:10,
        margin:10,
        loading:{position:!isUploading,opacity:0},
        isSuccess:{position:!isSuccess,opacity:0},
        isFailure:{position:!isFailure,opacity:0},
        positionTopLoading:0,
        loadingContainerHeight:0,
        componentWidth:0,
        isSuccessWidth:0,
        isDragEnter:false,
    }
    const [state,dispatch]=useReducer(reducer,initState)

    // this sets height of the component, is used to transition between heights. 
    useEffect(()=>{
        if(isUploading||isSuccess||isFailure){
            if(state.totalHeightPlus){
                dispatch({type:SET_HEIGHT,value:state.totalHeightPlus})
            }else{
                dispatch({type:SET_HEIGHT,value:undefined})
                dispatch({type:SET_MAXHEIGHT,value:600})
            }
        }else if(state.totalHeight){
            dispatch({type:SET_HEIGHT,value:state.totalHeight})
        }
    },[isUploading,isSuccess,isFailure,state.totalHeight,state.totalHeightPlus])

    // this is to calculate (set) some values
    useEffect(()=>{
        if(containerRef.current?.scrollHeight){
            const contentHeight=containerRef.current.scrollHeight
            dispatch({type:SET_TOTALHEIGHT,value:contentHeight-state.padding*2})
            dispatch({type:SET_MAXHEIGHT,value:contentHeight-state.padding*2})
        }
        if(rootRef.current?.clientWidth){
            dispatch({type:SET_COMPONENTWIDTH,value:rootRef.current.clientWidth-state.margin*2-state.padding*2})
        }
    },[])

    // this is to set some values the first time when the component it's expanded
    useEffect(()=>{
        if(state.height===undefined&&(isUploading||isSuccess||isFailure)){ 
            if(containerRef.current?.scrollHeight){
                dispatch({type:SET_TOTALHEIGHTPLUS,value:containerRef.current.scrollHeight-state.padding*2})
            }
            if(loadingContainerRef.current?.getBoundingClientRect().top){
                dispatch({type:SET_POSITIONTOPLOADING,value:loadingContainerRef.current?.getBoundingClientRect().top-state.margin})
            }
        }
    },[state.height,isUploading,isSuccess,isFailure,state.padding,state.margin])

    // this is to calculate and set the width of the success and failure container component
    useEffect(()=>{
        if(isSuccess||isFailure){
            const width=containerRef.current?.getBoundingClientRect().width
            if(width){
                dispatch({type:SET_ISSUCCESSWIDTH,value:width-state.padding*2-state.margin*2})
            }
        }
    },[isSuccess,isFailure,state.padding,state.margin])

    // this is to fade out uploading container component
    useEffect(()=>{
        if(!isUploading||isSuccess||isFailure){
            dispatch({type:SET_OPACITYLOADING,value:0})
            dispatch({type:SET_POSITIONLOADING,value:true})
        }
        return ()=>{
            dispatch({type:SET_POSITIONLOADING,value:false})
            dispatch({type:SET_OPACITYLOADING,value:1})
        }
    },[isUploading,isSuccess,isFailure])

    // this is to fade out success container component
    useEffect(()=>{
        if(!isSuccess||isFailure){
            dispatch({type:SET_OPACITYISSUCCESS,value:0})
            dispatch({type:SET_POSITIONISSUCCESS,value:true})
        }
        return ()=>{
            dispatch({type:SET_POSITIONISSUCCESS,value:false})
            dispatch({type:SET_OPACITYISSUCCESS,value:1})
        }
    },[isSuccess,isFailure])

    // this is to fade out failure container component
    useEffect(()=>{
        if(!isFailure){
            dispatch({type:SET_OPACITYISFAILURE,value:0})
            dispatch({type:SET_POSITIONISFAILURE,value:true})
        }
        return ()=>{
            dispatch({type:SET_POSITIONISFAILURE,value:false})
            dispatch({type:SET_OPACITYISFAILURE,value:1})
        }
    },[isFailure])

    // this is used to resize bottom panel with when resizing window browser
    useLayoutEffect(() => {
        function updateSize() {
            if(rootRef.current?.clientWidth){
                dispatch({type:SET_COMPONENTWIDTH,value:rootRef.current.clientWidth-state.margin*2-state.padding*2})
            }
            if(isSuccess||isFailure){
                const width=containerRef.current?.getBoundingClientRect().width
                if(width){
                    dispatch({type:SET_ISSUCCESSWIDTH,value:width-state.padding*2-state.margin*2})
                }
            }
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [isSuccess,isFailure,state.padding,state.margin]);

    const containerRef=useRef<HTMLDivElement>(null)
    const loadingContainerRef=useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if(isUploading&&loadingContainerRef.current?.scrollHeight){
            dispatch({type:SET_LOADINGCONTAINERHEIGHT,value:loadingContainerRef.current.scrollHeight})
        }
    },[isUploading])

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
            dispatch({type:SET_ISDRAGENTER,value:false})
        })
    }, []);
    const onDragEnter=useCallback((event:React.DragEvent)=>{
        event.preventDefault();
        dispatch({type:SET_ISDRAGENTER,value:true})
    },[]);
    const onDragLeave=useCallback((event:React.DragEvent)=>{
        event.preventDefault();
        dispatch({type:SET_ISDRAGENTER,value:false})
    },[]);
    const {getRootProps, getInputProps,rootRef} = useDropzone({onDrop,onDragEnter,onDragLeave,disabled})

    return (
        <Container backgroundColor='white' padding='10px' borderRadius='20px' ref={containerRef} maxHeight={state.maxHeight} overflow='hidden' height={state.height} margin={`${state.margin}px`}>
            <Container {...getRootProps({dashed:true,withFlexCenter:true,withBorder:!state.isDragEnter,isDragEnter:state.isDragEnter,padding:'10px',margin:`${state.margin}px`})}>
                <SubContainer minHeight={minHeight} disabled={disabled}>
                    {state.isDragEnter?<FileMovingAnimation />:<Icon as={Image} width={140} height={80} />}
                    <TextLayout bold color='DarkBlue'>
                        {title}
                    </TextLayout>      
                    <TextLayout size='small' bold color='rgba(128,128,128,.8)'>{subTitle}</TextLayout>
                    <input {...getInputProps()}  />
                </SubContainer>
            </Container>
            <BottomPanel withBorder padding='30px 20px 43px 20px' opacity={state.loading.opacity} position={state.loading.position} ref={loadingContainerRef} overflow='hidden' width={state.componentWidth} margin={`${state.margin}px`} positionTop={state.positionTopLoading}>
                <Loading loading={isUploading} message='Uploading...' />
            </BottomPanel>
            <BottomPanel withBorder opacity={state.isSuccess.opacity} height={state.loadingContainerHeight} position={state.isSuccess.position} margin={`${state.margin}px`} positionTop={state.positionTopLoading} width={state.isSuccessWidth}>
                <IsFailureIsSuccessPanel message={successMessage} iconColor={MainTheme.colors.statusColors.green} IconToShow={CheckCircle} />
            </BottomPanel>
            <BottomPanel withBorder opacity={state.isFailure.opacity} height={state.loadingContainerHeight} position={state.isFailure.position} margin={`${state.margin}px`} positionTop={state.positionTopLoading} width={state.isSuccessWidth}>
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

