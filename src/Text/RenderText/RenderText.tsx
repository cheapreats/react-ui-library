import React, {CSSProperties} from 'react'
import styled from 'styled-components'


export interface IRenderTextProps {
    // name of item
    label?: string;
    // price of item
    price: number;
    // styling for text
    textProps?: CSSProperties
}

const RenderText: React.FC<IRenderTextProps> = ({label, price, textProps, ...props}) => {
    
    /* Reformats price to two decimal places */
    const formatPrice = () => price.toFixed(2)

    return (
        <Tag {...textProps}>
            {label}
            <RightAligned>
                ${formatPrice()}
            </RightAligned>
        </Tag>
    )
}

const RightAligned = styled.span`
    text-align: right;
    padding-left: 12px;
    margin-left: auto;

`;

const Tag = styled.p`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: bold
`

export default RenderText;