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
    isStandardChosen: boolean,
    isAlternativeChosen: boolean,
    isText: boolean,
    isImage: boolean,
};
// END OF MODIFIER PROPS

export const ModifierTools: React.FC<ModifierProps> = ({
    title,
    isStandardChosen,
    isAlternativeChosen,
    isText,
    isImage,
}): React.ReactElement => {
    if (isStandardChosen){

        if(isStandardChosen && isText) {
            return <EditText/>
        } else if (isStandardChosen && isImage) {
            return <EditImage/>
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

    } else if (isAlternativeChosen) {
        if(isAlternativeChosen && isText) {
            return <EditText/>
        } else if (isAlternativeChosen && isImage) {
            return <EditImage/>
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
                    isGray='2px solid gray'
                    txtColor='gray'
                />
            </>
        )
    }
};

