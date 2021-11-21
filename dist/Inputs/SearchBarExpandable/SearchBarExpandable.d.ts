import React from 'react';
export interface SearchBarExpandableProps {
    onInput?: (value: string) => void;
    onClose?: () => void;
    placeholder?: string;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    expandedWidth?: string;
    mediaQuery?: string;
    mediaWidth?: string;
}
export declare const SearchBarExpandable: React.FC<SearchBarExpandableProps>;
export default SearchBarExpandable;
