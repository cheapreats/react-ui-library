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
    margin?: string;
    onSearch?: (value:string)=>void;
    onClose?:()=>void;
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
    margin='0',
    onSearch,
    onClose=()=>undefined,
    ...props
}): React.ReactElement => {
    const [isExpanded,setIsExpanded]=useState(false)
    const [showRest,setShowRest]=useState(true)

    /**
     * delay the appearence of the rest of elements when the SearchBar is contracted 
     * due to the delay in contraction
     */
    useEffect(()=>{
        if(!isExpanded){
            setTimeout(()=>{
                setShowRest(true)
            },DELAY)
        }else{
            setShowRest(false)
        }
    },[isExpanded,setShowRest])

    return (
        <Header padding={padding} margin={margin} {...props}>
            <Row display={headerFlex}>
                {showRest&&
                (
                    <Heading bold type="h2" margin="0 0 5px" {...props}>
                        {label}
                    </Heading>
                )}
                {onSearch&&<SearchBarExpandable onInput={onSearch} state={[isExpanded,setIsExpanded]} onClose={onClose} />}
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
    margin?: string;
}

const Header = styled.div<HeaderProps>`
    ${({ theme, padding,margin }): string => `
    border-bottom: 2px solid ${theme.colors.text}20;
    padding: ${padding};
    margin:${margin};
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


