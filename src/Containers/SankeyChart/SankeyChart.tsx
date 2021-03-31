import React,{useRef, useState,useLayoutEffect} from 'react'
import {Sankey,Margin,Rectangle} from 'recharts'
import styled from 'styled-components'
import Theme from '../../Themes/ThemeTemplate'

const LEGEND_CONTAINER_WIDTH=200
const LEGEND_CONTAINER_HEIGHT=100
const INITIAL_LEGEND_HEIGHT_OFFSET=10

export interface ISankeyChartProps{
    width:number;
    height:number;
    data:any;
    nodePadding?:number;
    margin?:Partial<Margin>;
}

export const SankeyChart:React.FC<ISankeyChartProps>=({
    nodePadding,
    margin,
    ...props
}
):React.ReactElement=>{

    interface IProperties{
        nodePadding?:number;
        margin?:Partial<Margin>;
    }

    /**
     * checks for not undefined properties and sets an object with those not undefined properties
     * @returns {IProperties} the properties
     */
    const getProperties=()=>{
        const properties:IProperties={}
        if(nodePadding)
            properties.nodePadding=nodePadding
        if(margin)
            properties.margin=margin
        return properties
    }
                                    
    return (
        <Sankey
            node={<MyCustomNode />}
            link={{ stroke: '#77c878' }}
            {...props}
            {...getProperties()}
        />
    )
}

const MyCustomNode=({payload,...rest}:any):React.ReactElement<SVGElement>=>{
    const [heightOffset,setHeightOffset]=useState<number>()

    const legendRef=useRef<HTMLDivElement>(null)

    const renderLegend=(name:string,value:string)=>(
        <Container ref={legendRef}>
            <Span>{name}</Span> 
            <br />
            <Span>{value}</Span>
        </Container>
    )

    useLayoutEffect(()=>{
        setHeightOffset(legendRef.current?.clientHeight)
    },[])
    
    return (
        <svg>
            <Rectangle className="recharts-sankey-node" fill="#0088fe" fillOpacity="0.8" payload={payload} {...rest} />
            <Translate x={rest.x+payload.dx} y={rest.y+payload.dy/2-(heightOffset?heightOffset/2:INITIAL_LEGEND_HEIGHT_OFFSET)}>
                <foreignObject width={LEGEND_CONTAINER_WIDTH} height={LEGEND_CONTAINER_HEIGHT}>
                    {renderLegend(payload.name,payload.value)}
                </foreignObject>
            </Translate>
        </svg>
    )
}

const Translate = ({x=0,y=0,children}:any) => {
    if (!x && !y) 
        return children;
    return <g transform={`translate(${x},${y})`}>{children}</g>;
}
  
const Span=styled.span`
white-space:nowrap;
`
const Container=styled.div`
font-weight:700;
font-size:${Theme.font.size.small};
margin-left:5px;
`

/**
 * this is how a custom link will be made
 */
// const MyCustomLink = ({sourceX,sourceY,sourceControlX,targetControlX,targetY,targetX,payload,linkWidth,...props}:any) => {
//     console.log('props',props)
//     return (
//         <path
//             d={`
//                 M${sourceX},${sourceY}
//                 C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}
//             `}
//             stroke={payload.color}
//             strokeWidth={linkWidth}
//             fill='none'
//             {...props}
//         />
//     )
// }
