import React from 'react'
import styled from 'styled-components'
import { Card } from '../Card/Card'
import RenderText from '../../Text/RenderText/RenderText'

export interface IItemChoice {
    // name of choice
    name?: string
    // price of choice
    price?: number
}

export interface IItemModifier { 
    // modification name
    name?: string,
    // choices of modifications
    choices?: Array<IItemChoice>
}

export interface IItemsContent {
    // name of item
    name?: string,
    // price of item
    price?: number,
    // estimated time to make item
    modifiers?: Array<IItemModifier>
}

export interface IItems{ 
    // list of items on a order
    items: Array<IItemsContent>
}

const OrderDetailsContent: React.FC<IItems> = ({items, ...props}): React.ReactElement => (
    <div {...props}>
        {items.map(({name, price, modifiers}: IItemsContent) => (
            <Card>
                <RenderText 
                    label={name}
                    price={price}
                />
                {modifiers.map(({ name, choices }: IItemModifier) =>
                    choices.map((choice, j) => (
                        <OrderItem> 
                            {`${name}: ${choice.name}`}
                            <PriceText> {`$${choice.price}`} </PriceText>
                        </OrderItem>
                    )),
                )}
            </Card>
        ))}
    </div> 
)


const PriceText = styled.span`
    text-align: right;
`
const OrderItem = styled.p`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`


export default OrderDetailsContent