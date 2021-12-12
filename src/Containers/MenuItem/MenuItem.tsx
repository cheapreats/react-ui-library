import React from 'react';
import styled from 'styled-components';
import { Card } from '../Card/Card';
import {LeftRightText} from '../../Text';

interface IItemChoice {
    // name of choice
    name: string;
    // price of choice
    price: string;
}

interface IItemModifier {
    // list of choices for menu item
    choices?: Array<IItemChoice>;
}

export interface IMenuItemProps {
    // name of item
    name: string;
    // price of item
    price: string;
    // estimated time to make item
    modifiers?: Array<IItemModifier>;
}

export const MenuItem: React.FC<IMenuItemProps> = ({
    name,
    price,
    modifiers,
    ...props
}): React.ReactElement => (
    <Card {...props}>
        <LeftRightText leftText={name} rightText={price} />
        {modifiers?.map(({ choices }: IItemModifier) =>
            choices?.map((choice: IItemChoice) => (
                <ChoiceText leftText={choice.name} rightText={choice.price} />
            )),
        )}
    </Card>
);

const ChoiceText = styled(LeftRightText)`
    font-weight: normal;
`;

export default MenuItem;
