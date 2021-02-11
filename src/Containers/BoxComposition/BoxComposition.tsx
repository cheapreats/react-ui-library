import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import {SmallText} from '@Text'
import {Mixins} from '@Utils'

const ANIMATION_DURATION=2
const INITIAL_COUNTER=0

interface IBoxElementProps extends IImgProps,IDivProps{
    imgSource:string;
    text:string;
}

const BoxElement:React.FC<IBoxElementProps>=({top,left,imgSource,width,height,text}):React.ReactElement=>
    (
        <Div top={top} left={left}>
            <Img key={imgSource} src={imgSource} width={width} height={height} />
            {!!text&& <AnimatedSmallText textAlign='center'>{text}</AnimatedSmallText>}
        </Div>
    )

interface IBoxProps extends IImgProps,IDivProps{
    imgSource:string;
    text:string;
    id:string;
}

const Box:React.FC<IBoxProps>=({imgSource,...props}):React.ReactElement=>
    (
        <BoxElement imgSource={imgSource} {...props} />
    )


interface IDivProps{
    top:number;
    left:number;
}

const Div=styled.div<IDivProps>`
position:absolute;
${({top,left}):string=>`
top:${top}px;
left:${left}px;
`}
${Mixins.flex('column')}
`

const AnimatedSmallText=styled(SmallText)`
@keyframes antibreathing{
    0%{transform:scale(1,1);opacity:1;}
    10%{transform:scale(0.7,0.7);opacity:0;}
    20%{transform:scale(1,1);opacity:1;}
    100%{transform:scale(1,1);opacity:1;}
}
animation-name:antibreathing;
animation-duration:${ANIMATION_DURATION}s;
animation-iteration-count:infinite;
`
    
interface IImgProps{
    width:number;
    height:number;
}

const Img=styled.img<IImgProps>`
    @keyframes breathing{
        0%{transform:scale(1,1);}
        10%{transform:scale(1.1,1.1);}
        20%{transform:scale(1,1);}
        100%{transform:scale(1,1);}
    }
    animation-name:breathing;
    animation-duration:${ANIMATION_DURATION}s;
    animation-iteration-count:infinite;
    ${({width,height}):string=>`
    width:${width}px;
    height:${height}px;
    `}
    border-radius:5px;
    box-shadow:0 0 1px 0 black;
`

export interface IBoxCompositionProps{
    data:IBoxProps[][];
}

export const BoxComposition:React.FC<IBoxCompositionProps>=({data}):React.ReactElement=>{
    const [counter,setCounter]=useState(INITIAL_COUNTER)

    useEffect(()=>{
        const interval=setInterval(()=>{
            if(counter===data.length-1){
                setCounter(INITIAL_COUNTER)
            }else setCounter(prev=>prev+1)
        },ANIMATION_DURATION*1000)
        return ()=>{
            clearInterval(interval)
        }
    },[counter,data])

    return  (
        <div>
            {data[counter].map(boxProps=><Box key={boxProps.id} {...boxProps} />) }
        </div>
    )
}
   
