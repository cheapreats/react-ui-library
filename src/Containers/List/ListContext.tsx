import React from 'react';

const initialState = false;

export const ListStateContext = React.createContext<boolean>(initialState);
export const ListDispatchContext = React.createContext<
    React.Dispatch<React.SetStateAction<boolean>> | undefined
>(undefined);

const useListStateContext: () => boolean = (): boolean => {
    const context = React.useContext(ListStateContext);
    if (context === undefined) {
        throw new Error(
            'useListStateContext must be used within ListContextProvider',
        );
    }
    return context;
};
const useListDispatchContext: () => React.Dispatch<
    React.SetStateAction<boolean>
> = (): React.Dispatch<React.SetStateAction<boolean>> => {
    const context = React.useContext(ListDispatchContext);
    if (context === undefined) {
        throw new Error(
            'useListDispatchContext must be used within ListContextProvider',
        );
    }
    return context;
};

export const useListContext: () => [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
] = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    return [useListStateContext(), useListDispatchContext()];
};
