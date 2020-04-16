import React, {
    useState,
    useEffect,
    useCallback,
    Children,
    isValidElement,
    SyntheticEvent, 
} from 'react';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import {
    flex,
    scroll,
    position,
    transition,
    clickable,
    darken,
} from '@Utils/Mixins';
import { useTransition } from '@Utils/Hooks';
import { LabelLayout, LabelLayoutProps,InputFragment } from '@Layouts';

const NUM_VISIBLE_SELECTIONS = 3;

var options:any = [];

var isMounted=false;

const SPEED = 'normal';

let myWindow = window as any;

export interface SelectProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string;
    value?: string | number;
    theme: DefaultTheme;
    onChange?: Function;
    limit?: number;
    numVisible:number;
}

const _Select: React.FC<SelectProps> = ({
    disabled,
    value,
    children,
    limit = 4,
    placeholder = '',
    onChange = (): void => {},
    theme,
    name,
    numVisible =NUM_VISIBLE_SELECTIONS,
    ...props
}): React.ReactElement => {
    const [expanded, setExpanded] = useState(false);
    const [, mount, animation] = useTransition(expanded, {
        end: theme.speed[SPEED],
    });



    const createList = (
        children: React.ReactNode[],
        onSelect: React.MouseEventHandler,
        value?: string | number,
    ): React.ReactNode[] =>
        children.map( (child): React.ReactElement | null => {

            if (!myWindow.inputValue){
                if (child && isValidElement(child)){
                    const val = child.props.value;
                    const selected = String(value) === val;
                    return (
                        <SelectItem
                            {...child.props}
                            active={selected}
                            onClick={onSelect}
                            key={val}
                        />
                    );}
            }

            else

            {

            if ((child && isValidElement(child)) && (myWindow.inputValue && (((child.props.children).toLowerCase()).search(myWindow.inputValue.toLowerCase()))> (-1) )) {
                const val = child.props.value;
                const selected = String(value) === val;
                return (
                    <SelectItem
                        {...child.props}
                        active={selected}
                        onClick={onSelect}
                        key={val}
                    />
                );}

        }
        
        return null;} );

    const onSelect = useCallback(
        ({ currentTarget }): void => {
            onChange({
                target: {
                    value: currentTarget.getAttribute('value'),
                    name,
                },
            });
            myWindow.inputValue=currentTarget.firstChild.nodeValue;
        },
        [name],
    );

    useEffect(()=> {
        isMounted=true;

        if (expanded) {
            options = Children.toArray(children);
            const listener = (): void => {
                if (isMounted){
                    setExpanded(false);}
            };

            const timerforkeydown = window.setTimeout((): void => {
                window.addEventListener('keydown', listener, { once: true });
            }, 10);
            const timerforclick = window.setTimeout((): void => {
                window.addEventListener('click', listener, { once: true });
            }, 10);
            return (): void => {
                window.clearTimeout(timerforkeydown);
                window.clearTimeout(timerforclick);
                window.removeEventListener('keydown', listener);
                window.removeEventListener('click', listener);
            };
        }
        return () => (isMounted = false);
    }, [expanded]);

    const handleChange=(event:SyntheticEvent<HTMLInputElement>)=>{
        myWindow.inputValue = event.currentTarget.value;
        setExpanded(true);
    }

    return (
        <LabelLayout {...props}>
            <Container>
                <InputFragment value={myWindow.inputValue}
                    onChange = {e=>
                        handleChange(e)} 
                    onKeyDown = {e=>
                        handleChange(e)} 
                    onClick={e=>
                        handleChange(e)} 
                     />

                {mount && (
                    <SelectList
                        limit = {Math.min(numVisible, limit)}
                        expanded = {animation}
                    >
                        {createList(options, onSelect, value)}
                    </SelectList>
                )}
            </Container>
        </LabelLayout>
    );
};

export const ComboBox = withTheme(_Select);

const Container = styled.div`
    ${flex('column')}
    position: relative;
`;

const SelectList = styled.div<{
    expanded: boolean;
    limit: number;
}>`
    ${position('absolute', '0 0 20px')}
    ${scroll}
    
    background-color: white;
    list-style-type: none;
    appearance: none;
    overflow: auto;
    z-index: 900;
    padding: 0;

    // Theme Stuff
    ${({ theme }): string => `
        ${transition(
            [
                'height',
                {
                    prop: 'opacity',
                    duration: theme.speed.normal,
                },
            ],
            theme.speed[SPEED],
        )}
        border-radius: ${theme.dimensions.radius};
        box-shadow: ${theme.depth[1]};
    `}

    ${({ expanded, limit, theme }): string =>
        expanded
            ? `
        height: ${limit * theme.dimensions.select.itemHeight}px;
        opacity: 1;
        top:42px;
    `
            : `
        pointer-events: none;
        height: 0px;
        opacity: 0;
    `}
`;

const SelectItem = styled.p<{ active: boolean }>`
    ${transition(['background-color'])}
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    margin: 0;

    // Theme Stuff
    ${({ theme, active }): string => `
        padding: ${theme.dimensions.padding.default};
        ${
            active
                ? `
            background-color: ${darken('#ffffff', 0.05)}
        `
                : clickable('#ffffff', 0.03)
        }
    `}
`;

export default ComboBox;
