import React, { useState } from 'react';
import { Search } from '@styled-icons/fa-solid/Search';
import {Times} from '@styled-icons/fa-solid/Times';
import styled from 'styled-components';
import { flex, transition } from '@Utils/Mixins';
import { LabelLayout, InputFragment as I, LabelLayoutProps } from '@Layouts';

const EXPANDED_WIDTH=10000
const NOT_EXPANDED_WIDTH=0

export interface SearchBarExpandableProps extends LabelLayoutProps {
    onInput?: (value:string)=>void;
    placeholder?: string;
    hasIcon?: boolean;
}

export const SearchBarExpandable: React.FC<SearchBarExpandableProps> = ({
    onInput=(value)=>console.log(value),
    placeholder,
    hasIcon = true,
    ...props
}): React.ReactElement => {
    const [isExpanded,setIsExpanded]=useState(false)
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.currentTarget.value);
        onInput(event.currentTarget.value);
    };

    return (
        <LabelLayout {...props}>
            <Container>
                <SelectDisplay>
                    <InputFragment
                        {...props}
                        value={inputValue}
                        placeholder={placeholder}
                        onChange={(e): void => handleChange(e)}
                        isExpanded={isExpanded}
                    />
                    {hasIcon && !isExpanded&& <Icon as={Search} onClick={()=>{setIsExpanded(true)}} />}
                    {isExpanded&& <Icon as={Times} onClick={()=>{setIsExpanded(false)}} />}
                </SelectDisplay>
            </Container>
        </LabelLayout>
    );
};

interface SearchBarSelectProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string;
    value?: string | number;
    onChange?: Function;
    limit?: number;
}
const SelectDisplay = styled.p<SearchBarSelectProps>`
    ${transition(['background-color', 'opacity', 'box-shadow'])}
    ${flex('flex-start', 'center')}
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border: none;
    margin: 0px;
    width:fit-content;
    max-width:100%;
    ${({ theme }): string => `
        background-color: ${theme.colors.input.default};
        border-radius: ${theme.dimensions.radius};
    `}
`;

const Icon = styled.svg`
    width: 20px;
    flex-shrink: 0;
    margin-left: auto;
    ${({ theme }): string => `
        padding-right: ${theme.dimensions.padding.container};
    `};
`;

interface IInputFragmentProps{
    isExpanded:boolean;
}

const InputFragment = styled(I)<IInputFragmentProps>`
    flex-grow: 1;
    ${({isExpanded}):string=>`
    width:${isExpanded?EXPANDED_WIDTH:NOT_EXPANDED_WIDTH}px;
    `}
    transition:width 1s;
    &:focus {
        box-shadow: none;
    }
    ${({ backgroundColor, borderRadius }): string => `
        background-color: ${backgroundColor};
        border-radius: ${borderRadius};
    `}
`;

const Container = styled.div`
    ${flex('column')}
    flex-direction: columns;
    width: 100%;
    align-items:flex-end;
`;

export default SearchBarExpandable;
