import React,{useRef, useState,useLayoutEffect} from 'react'
import {Sankey,Margin,Rectangle} from 'recharts'
import styled from 'styled-components'
import Theme from '../../Themes/ThemeTemplate'

const LEGEND_CONTAINER_WIDTH=200
const LEGEND_CONTAINER_HEIGHT=100
const INITIAL_LEGEND_HEIGHT_OFFSET=10
const LINK_COLOR='#77c878'
const NODE_COLOR='#0088fe'
const NODE_OPACITY=0.8

interface ISankeyChartOptionalProperties{
    nodePadding?:number;
    margin?:Partial<Margin>;
}

export interface ISankeyChartProps extends ISankeyChartOptionalProperties{
    width:number;
    height:number;
    data:any;
}

export const SankeyChart:React.FC<ISankeyChartProps>=({
    nodePadding,
    margin,
    ...props
}
):React.ReactElement=>{
    /**
     * checks for not undefined properties and sets an object with those not undefined properties
     * @returns {ISankeyChartOptionalProperties} the properties
     */
    const getOptionalProperties=()=>{
        const properties:ISankeyChartOptionalProperties={}
        if(nodePadding)
            properties.nodePadding=nodePadding
        if(margin)
            properties.margin=margin
        return properties
    }
                                    
    return (
        <Sankey
            node={<MyCustomNode />}
            link={{ stroke: LINK_COLOR }}
            {...getOptionalProperties()}
            {...props}
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

    /**
     * gets the x position for the top left corner of the container of the node legend, based on x property and dx,
     * which is the node width
     * @returns {number} the x position
     */
    const getLegendXPosition=()=>rest.x+payload.dx

    /**
     * gets the y position for the top left corner of the container of the node legend, based on y property, dy (which
     * is the height of the node) and heighOffset, which is the height of the legend itself
     * @returns {number} the y position
     */
    const getLegendYPosition=()=>rest.y+payload.dy/2-(heightOffset?heightOffset/2:INITIAL_LEGEND_HEIGHT_OFFSET)
    
    return (
        <svg>
            <Rectangle className='recharts-sankey-node' fill={NODE_COLOR} fillOpacity={NODE_OPACITY} payload={payload} {...rest} />
            <Translate x={getLegendXPosition()} y={getLegendYPosition()}>
                <foreignObject width={LEGEND_CONTAINER_WIDTH} height={LEGEND_CONTAINER_HEIGHT}>
                    {renderLegend(payload.name,payload.value)}
                </foreignObject>
            </Translate>
        </svg>
    )
}

interface ITranslateProps{
    x:number;
    y:number;
    children:React.ReactElement<SVGElement>;
}

/**
 * it's a wrapper for a svg element to position it on x and y property values
 * @param props {ITranslateProps} - the props passed to the component 
 * @returns {React.ReactElement<SVGElement>} the positioned svg element
 */
const Translate = ({x=0,y=0,children}:ITranslateProps):React.ReactElement<SVGElement> => {
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
