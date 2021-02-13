import React,{useState,useEffect} from 'react'
import styled from 'styled-components'

interface IBoxProps{
    imgSrc:string;
    top:number;
    left:number;
    width:number;
    height:number;
    borderRadius:number;
}

export interface IBoxComposition2Props{
    box1:IBoxProps;
    box2:IBoxProps;
    box3:IBoxProps;
}

export const BoxComposition2:React.FC<IBoxComposition2Props>=({box1,box2,box3}):React.ReactElement=>{
    const [showBox2,setShowBox2]=useState(false)
    const [showBox3,setShowBox3]=useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            setShowBox2(true)
        },1000)
        setTimeout(()=>{
            setShowBox3(true)
        },2000)
    },[])
    return     (
        <div>
            <Box1 {...box1} />
            {showBox2&&<Box2 {...box2} />}
            {showBox3&&<Box3 {...box3} />}
        </div>
    )
}

const Box3:React.FC<IBoxProps>=({imgSrc,top,left,width,height,borderRadius}):React.ReactElement=>
    (
        <AnimatedDiv3 top={top} left={left}>
            <Img src={imgSrc} width={width} height={height} borderRadius={borderRadius} />
        </AnimatedDiv3>
    )

const Box2:React.FC<IBoxProps>=({imgSrc,top,left,width,height,borderRadius}):React.ReactElement=>
    (
        <AnimatedDiv2 top={top} left={left}>
            <Img src={imgSrc} width={width} height={height} borderRadius={borderRadius} />
        </AnimatedDiv2>
    )

const Box1:React.FC<IBoxProps>=({imgSrc,top,left,width,height,borderRadius}):React.ReactElement=>
    (
        <AnimatedDiv1 top={top} left={left}>
            <Img src={imgSrc} width={width} height={height} borderRadius={borderRadius} />
        </AnimatedDiv1>
    )

interface IDivProps{
    top:number;
    left:number;
}

const AnimatedDiv1=styled.div<IDivProps>`
position:absolute;
${({top,left}):string=>`
top:${top}px;
animation:anim1 1s forwards;
@keyframes anim1{
    from{left:0px;}
    to{left:${left}px;}
}
`}
`

const AnimatedDiv2=styled.div<IDivProps>`
position:absolute;
${({top,left}):string=>`
left:${left}px;
animation:anim2 1s forwards;
@keyframes anim2{
    from{top:100px;}
    to{top:${top}px;}
}
`}
`

const AnimatedDiv3=styled.div<IDivProps>`
position:absolute;
${({top,left}):string=>`
top:${top}px;
left:${left}px;
animation:anim3 1s forwards;
@keyframes anim3{
    0%{transform:scale(.8,.8);}
    96%{transform:scale(1.1,1.1);}
    100%{transform:scale(1,1);}
}
`}
`

interface IImgProps{
    width:number;
    height:number;
    borderRadius:number;
}

const Img=styled.img<IImgProps>`
${({width,height,borderRadius}):string=>`
width:${width}px;
height:${height}px;
border-radius:${borderRadius}px;
`}
`