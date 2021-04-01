import React, { useState, useRef, useCallback } from 'react';
import { Search } from '@styled-icons/fa-solid/Search';
import { Times } from '@styled-icons/fa-solid/Times';
import styled from 'styled-components';
import { flex, transition, media } from '@Utils/Mixins';
import { InputFragment as I, LabelLayoutProps } from '@Layouts';

const EXPANDED_WIDTH = '500px';
const NOT_EXPANDED_WIDTH = '0px';
const TIME_FOR_REF_TO_EXIST = 20;

export interface SearchBarExpandableProps {
    onInput?: (value: string) => void;
    onClose?: () => void;
    placeholder?: string;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    expandedWidth?: string;
    mediaQuery?: string;
    mediaWidth?: string;
}

export const SearchBarExpandable: React.FC<SearchBarExpandableProps> = ({
    onInput = (value) => console.log(value),
    placeholder,
    state,
    expandedWidth = EXPANDED_WIDTH,
    mediaQuery,
    mediaWidth,
    onClose = () => undefined,
}): React.ReactElement => {
    const [isExpanded, setIsExpanded] = state;
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.currentTarget.value);
        onInput(event.currentTarget.value);
    };

    const inputRef = useRef<HTMLInputElement>(null);

    const expandSearchBox = useCallback(() => {
        setIsExpanded(true);
        setTimeout(()=> inputRef.current?.focus(), TIME_FOR_REF_TO_EXIST);
    }, [setIsExpanded, inputRef.current]);

    const resetSearchBox = () => {
        setIsExpanded(false);
        setInputValue('');
        onClose();
    }

    return (
        <Container>
            <SelectDisplay>
                <Icon as={Search} onClick={expandSearchBox} />
                <ExpanableContainer 
                    isExpanded={isExpanded}
                    onClick={expandSearchBox}
                    expandedWidth={expandedWidth}
                    mediaQuery={mediaQuery}
                    mediaWidth={mediaWidth}
                >
                    {isExpanded && (
                        <InputFragment
                            value={inputValue}
                            placeholder={placeholder}
                            onChange={(e): void => handleChange(e)}
                            ref={inputRef}
                        />
                    )}
                </ExpanableContainer>
                {isExpanded && (
                    <Icon
                        as={Times}
                        onClick={resetSearchBox}
                    />
                )}
            </SelectDisplay>
        </Container>
    );
};

interface SearchBarSelectProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string;
    value?: string | number;
    onChange?: Function;
    limit?: number;
}
const SelectDisplay = styled.div<SearchBarSelectProps>`
    ${transition(['background-color', 'opacity', 'box-shadow'])}
    ${flex('flex-start', 'center')}
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 999px;
    max-width: 100%;
    overflow:hidden;
    ${({ theme }): string => `
        background-color: ${theme.colors.input.default};
        padding: ${theme.dimensions.padding.container};
    `}
`;

interface IExpandableContainer {
    isExpanded : boolean;
    expandedWidth: string;
    mediaQuery?: string;
    mediaWidth?: string;
}

const ExpanableContainer = styled.div<IExpandableContainer>`
    ${({ isExpanded, expandedWidth}): string => `
        width: ${isExpanded ? expandedWidth : NOT_EXPANDED_WIDTH};
    `}
    ${({ mediaQuery, mediaWidth, isExpanded }) => mediaQuery && media(mediaQuery, `width: ${isExpanded ? mediaWidth : NOT_EXPANDED_WIDTH};`)}
    ${transition(['width'])}
`;

const Icon = styled.svg`
    height: 20px;
    flex-shrink: 0;
`;

const InputFragment = styled(I)`
    flex-grow: 1;
    width: 100%;
    ${({backgroundColor, borderRadius, theme }): string => `
        padding: 0px ${theme.dimensions.padding.container};
        background-color: ${backgroundColor};
        border-radius: ${borderRadius};
    `}
    &:focus {
        box-shadow: none;
    }
`;

const Container = styled.div`
    ${flex('column')}
    width: 100%;
    align-items: flex-end;
    justify-content: center;
`;

export default SearchBarExpandable;
