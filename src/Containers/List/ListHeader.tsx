import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';
import {SearchBarExpandable} from '../../Inputs/SearchBarExpandable/SearchBarExpandable';
import { Heading } from '../../Text/Heading';
import { TextLayoutProps } from '../../__Layouts';
import { Mixins } from '../../Utils';

const DELAY=1000

export interface ListHeaderProps extends TextLayoutProps {
    label?: string;
    headerFlex?: string;
    icon?: StyledIcon;
    iconClick?: React.MouseEventHandler;
    iconProps?: string;
    headerRowComponent?: React.ReactElement;
    type?: string;
    padding?: string;
    onSearch?: (value:string)=>void;
}

export const ListHeader: React.FC<ListHeaderProps>= ({
    label,
    children,
    headerFlex,
    icon,
    iconClick,
    iconProps,
    headerRowComponent,
    padding = '10px 20px;',
    onSearch,
    ...props
}): React.ReactElement => {
    const stateExpanded=useState(false)
    const [showRest,setShowRest]=useState(true)

    /**
     * delay the appearence of the rest of elements when the SearchBar is contracted 
     * due to the delay in contraction
     */
    useEffect(()=>{
        if(!stateExpanded[0]){
            setTimeout(()=>{
                setShowRest(true)
            },DELAY)
        }else{
            setShowRest(false)
        }
    },[stateExpanded[0],setShowRest])

    return (
        <Header padding={padding}>
            <Row display={headerFlex}>
                {showRest&&
                (
                    <Heading bold type="h2" margin="0 0 5px" {...props}>
                        {label}
                    </Heading>
                )}
                {onSearch&&<SearchBarExpandable onInput={onSearch} state={stateExpanded} />}
                {icon && showRest&&(
                    <IconContainer>
                        <Icon as={icon} onClick={iconClick} iconProps={iconProps} />
                    </IconContainer>
                )}
                {headerRowComponent}
            </Row>
            {children}
        </Header>
    )
}

const IconContainer=styled.div`
${Mixins.flex('center')}
`

interface HeaderProps {
    padding?: string;
}

const Header = styled.div<HeaderProps>`
    ${({ theme, padding }): string => `
    border-bottom: 2px solid ${theme.colors.text}20;
    padding: ${padding};
`}
`;

interface RowProps {
    display?: string;
}

const Row = styled.div<RowProps>`
    ${(props): string | undefined =>
        props.display && Mixins.flex(props.display)};
`;

interface IconProps {
    iconProps?: string;
}

const Icon = styled.svg<IconProps>`
    ${(props): string | undefined => props.iconProps}
    cursor:pointer;
`;


