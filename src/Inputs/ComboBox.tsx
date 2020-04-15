import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    Children,
    isValidElement,
} from 'react';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import {
    flex,
    scroll,
    position,
    transition,
    clickable,
    styledCondition,
    darken,
} from '@Utils/Mixins';
import { useTransition } from '@Utils/Hooks';
import { LabelLayout, LabelLayoutProps,InputFragment } from '@Layouts';
 
const NUM_VISIBLE_SELECTIONS=3;

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
    numVisible=NUM_VISIBLE_SELECTIONS,
    ...props
}): React.ReactElement => {
    const [expanded, setExpanded] = useState(false);
    const options = Children.toArray(children);
    const [, mount, animation] = useTransition(expanded, {
        end: theme.speed[SPEED],
    });
    const selected = useMemo(
        (): React.ReactNode =>
            options.find(
                (option): boolean =>
                    isValidElement(option) &&
                    option.props.value === String(value),
            ),
        [children, value],
    );

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

    useEffect((): void | (() => void | undefined) => {
        if (expanded) {
            const listener = (): void => {
                setExpanded(false);
            };
            const timer = window.setTimeout((): void => {
                window.addEventListener('keydown', listener, { once: true });
            }, 10);
            const timer2 = window.setTimeout((): void => {
                window.addEventListener('click', listener, { once: true });
            }, 10);
            return (): void => {
                window.clearTimeout(timer);
                window.clearTimeout(timer2);
                window.removeEventListener('keydown', listener);
                window.removeEventListener('click', listener);
            };
        }
        return undefined;
    }, [expanded]);

    const handleChange=(event:any)=>{
        myWindow.inputValue=event.target.value;
        setExpanded(true);
    }

    return (
        <LabelLayout {...props}>
            <Container>
                <InputFragment value={myWindow.inputValue}
                    onChange={e=>
                        handleChange(e)} 
                    onKeyDown={e=>
                        handleChange(e)} 
                    onClick={e=>
                        handleChange(e)} 
                     />

                {mount && (
                    <SelectList
                        limit={Math.min(numVisible, limit)}
                        expanded={animation}
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

const SelectDisplay = styled.p<SelectProps>`
    ${transition(['background-color', 'opacity', 'box-shadow'])}
    ${flex('flex-start', 'center')}
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border: none;
    margin: 0;

    // Disabled
    ${({ disabled }): string =>
        disabled
            ? `
        cursor: not-allowed;
        opacity: 0.6;
    `
            : ''}

    // Theme Stuff
    ${({ theme, disabled }): string => `
        padding: ${theme.dimensions.padding.default};
        border-radius: ${theme.dimensions.radius};
        font-family: ${theme.font.family};
        ${
            !disabled
                ? `
            &:hover:not(:disabled) {
                box-shadow: ${theme.depth[1]};
            }
        `
                : ''
        }
    `}

    // Background color
    ${({ theme, error = false, success = false }): string => `
        background-color: ${styledCondition(
            error,
            theme.colors.input.error,
            success,
            theme.colors.input.success,
            theme.colors.input.default,
        )};
    `}
`;

const SelectText = styled.span`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
