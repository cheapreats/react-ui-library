import React  from 'react';
import styled from 'styled-components';
import { Txt, StandardView, AlternativeView } from './Views'; 
import { EditText } from './EditText'
import { EditImage } from './EditImage'

// STYLED COMPONENTS
const Title = styled(Txt)`
    font-size: 19px;
    width: 100%;
    height: 24px;
`;
// END OF STYLED COMPONENTS

// MODIFIER PROPS
export interface ModifierProps {
    title: string,
    isChosen: boolean,
    isText: boolean,
};
// END OF MODIFIER PROPS

export const ModifierTools: React.FC<ModifierProps> = ({
    title,
    isChosen,
    isText,
}): React.ReactElement => {
    if (isChosen){
        if(isChosen && isText) {
            return (
                <>
                    <EditText/>
                    <EditImage/>
                </>
            )
        } else {
            return (
                <>
                    <StandardView
                        standard='Standard View'
                        isGray='2px solid black'
                        txtColor='#000'
                    />
                    <AlternativeView
                        alternative='Alternative View'
                        isGray='2px solid gray'
                        txtColor='gray'
                    />
                </>
            )
        }
    } else {
        if(isChosen && isText) {
            return (
                <>
                    <EditText/>
                    <EditImage/>
                </>
            )
        } else {
            return (
                <>
                    <StandardView
                        standard='Standard View'
                        isGray='2px solid gray'
                        txtColor='gray'
                    />
                    <AlternativeView
                        alternative='Alternative View'
                        isGray='2px solid black'
                        txtColor='#000'
                    />
                </>
            )
        }
    }
};

// TODO: Add if statement to change depending on true or false of isChosen. 