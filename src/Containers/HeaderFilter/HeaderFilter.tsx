import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import styled from 'styled-components'

export interface IHeaderFilterProps extends React.HTMLAttributes<HTMLDivElement>{
    header: string;
    items: Array<string>;
    selectOption: (value: string) => void;
}

const useClickAway = (
    ref: React.MutableRefObject<HTMLElement | null>,
    handler: (event: Event) => void,
) => {
    useEffect(() => {
        const callback = (event: Event) => {
            const el = ref.current;
            if (!event || !el) return;
            handler(event);
        };

        document.addEventListener('click', callback);
        return () => document.removeEventListener('click', callback);
    }, [ref, handler]);
};


export const HeaderFilter: React.FC<IHeaderFilterProps> = ({
    header,
    items,
    selectOption,
    ...props
}): React.ReactElement => {
    const [isActive, setIsActive] = useState(false);

    const fixedContainerRef = useRef<HTMLDivElement>(null);
    const mainContainerRef = useRef<HTMLDivElement>(null);

    useClickAway(mainContainerRef, () => setIsActive(false));

    /**
     * Sets the width and height of the external container so the DOM doesn't distort when using fixed positioning.
     */
    useLayoutEffect(() => {
        const mainContainer = mainContainerRef.current;
        const fixedContainer = fixedContainerRef.current;
        if(fixedContainer && mainContainer){
            fixedContainer.style.width = `${mainContainer.clientWidth}px`;
            fixedContainer.style.height = `${mainContainer.clientHeight}px`;
        }
    }, []);

    const generateListItems = () => (
        items.map((item) => (
            <ListItem onClick={() => selectOption(item)}>{item}</ListItem>
        ))
    );

    return (
        <FixedBoxContainer ref={fixedContainerRef}>
            <MainContainer ref={mainContainerRef} {...props} onClick={() => setIsActive(true)} onBlur={() => setIsActive(false)} isActive={isActive}>
                <HeaderContainer>
                    {header}    
                </HeaderContainer>
                <ListContainer isActive={isActive}>
                    <List>
                        {generateListItems()}
                    </List>
                </ListContainer>
            </MainContainer>
        </FixedBoxContainer>
    );
};

interface IActiveToggleProps{
    isActive: boolean;
}

const FixedBoxContainer = styled.div`
    border: 2px solid black;
`;

const MainContainer = styled.div<IActiveToggleProps>`
    ${({ isActive }) => `
        position: ${isActive ? 'fixed' : 'static' };
    `}
    z-index: 10;
`

const HeaderContainer = styled.div`

`;

const ListContainer = styled.div<IActiveToggleProps>`
    ${({ isActive }) => `
        display: ${isActive ? 'block' : 'none' };
    `}
`;

const List = styled.ul`

`;

const ListItem = styled.li`
    :hover{
        cursor: pointer;
    }
`;