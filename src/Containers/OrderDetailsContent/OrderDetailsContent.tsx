import React from 'react';
import { Card } from '../Card/Card';
import CardText from '../../Text/CardText/CardText';

export interface IItemChoice {
    // name of choice
    name: string;
    // price of choice
    price: string;
}

export interface IItemModifier {
    // modification name
    name: string;
    // choices of modifications
    choices: Array<IItemChoice>;
}

export interface IItemsContent {
    // name of item
    name: string;
    // price of item
    price: string;
    // estimated time to make item
    modifiers: Array<IItemModifier>;
}

export interface IItems {
    // list of items on a order
    items: Array<IItemsContent>;
}

const OrderDetailsContent = ({
    items,
    ...props
}: IItems): React.ReactElement => (
    <div {...props}>
        {items.map(({ name, price, modifiers }: IItemsContent) => (
            <Card>
                <CardText leftText={name} rightText={price} />
                {modifiers.map(({ name, choices }: IItemModifier) =>
                    choices.map((choice: IItemChoice) => (
                        <CardText
                            leftText={`${name}: ${choice.name}`}
                            rightText={choice.price}
                            style={{
                                fontWeight: 'normal',
                            }}
                        />
                    )),
                )}
            </Card>
        ))}
    </div>
);

export default OrderDetailsContent;
