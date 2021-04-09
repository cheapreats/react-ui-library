import React, {useState,useRef,useEffect, useLayoutEffect} from 'react';
import { Check } from '@styled-icons/boxicons-regular/Check';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';  
import { flex, media } from '../../Utils/Mixins';
import { Heading, Paragraph} from '../../index';

const ANIMATION_DURATION=3000

export interface TabFeatureProps { 
    heading: string;
    subheading: string;
    description: string;
    navheading: string;
    DataItems: any[];
}

export const TabFeature: React.FC<TabFeatureProps> = ({ 
    heading,
    subheading,
    description,
    navheading,
    DataItems,
    ...args
}): React.ReactElement => {
    const [currNavkey, setCurrNavKey] = useState(0);
    const [prevNavKey, setPrevNavKey] = useState(0); 
    const [selectedIndex,setSelectedIndex]=useState(0);

    const movingTab=useRef<Tab>(null)
    const lastRect=useRef()

    /**
     * Renders a vertical list of check icons and text.
     * @param listItems 
     * @returns {React.ReactElement}
     */
    const listItems = (_listItems:string[]): React.ReactElement[] => _listItems.map(            
        (item): React.ReactElement => (
            <ListItem key={item} >
                <Tick /> {item}
            </ListItem>
        ),
    );

    /**
     * Renders a horizontal list of text for tab navigation.
     * @param DataItems
     * @returns {React.ReactElement}
     */
    const navigation = (): React.ReactElement[] => { 
        const changeNavFn = (selecteNavkey : number) =>
        {
            setPrevNavKey(currNavkey);
            setCurrNavKey(selecteNavkey);
        }
        return DataItems.map(
            (item, navKey): React.ReactElement => (
                <>
                    <NavTab
                        onClick={ () => changeNavFn(navKey)}
                        key={item}
                    >
                        {item.title}
                        {selectedIndex===navKey&&
                    (
                        <NavTabSelected ref={movingTab}>
                            {item.title}
                        </NavTabSelected>
                    )}
                    </NavTab>
                </>
            ),
        )
    };

    /**
     * on first render, cach the bounding rect of the moving element
     */
    useEffect(()=>{
        // @ts-ignore
        lastRect.current=movingTab.current?.node.getBoundingClientRect()
    },[])

    /**
     * before painting, animate
     */
    useLayoutEffect(()=>{
        // @ts-ignore
        const nextRect=movingTab.current?.node.getBoundingClientRect()

        // @ts-ignore
        const translateX = nextRect.x-lastRect.current?.x;

        // @ts-ignore
        const widthFactor=1+(lastRect.current?.width-nextRect.width)/nextRect.width
        
        lastRect.current=nextRect

        // @ts-ignore
        movingTab.current?.node.animate([
            {transform:`translateX(${-translateX}px) scaleX(${widthFactor})`},
            {transform:`trnanslateX(0px) scaleX(1)`}
        ],ANIMATION_DURATION)

    },[movingTab.current])

    /**
     * Component for showing content of left and right panels.
     * title, short description and list icons and text.
     * @param DataItems
     * @returns {React.ReactElement}
     */
    const contentBlock = (): React.ReactElement[] => 
        DataItems.map(
            (item): React.ReactElement => (                
                <Content key={item} >
                    <LeftPanel>
                        { 
                            (currNavkey > prevNavKey)?
                                <AnimateLeftPanel>
                                    <Heading type="h6" bold>{item.title}</Heading>
                                    <CParagraph>{item.shortdescription}</CParagraph>
                                    <ListItem>{listItems(item.liItems)}</ListItem>
                                </AnimateLeftPanel>
                                : 
                                <AnimateLeftRight>
                                    <Heading type="h6" bold>{item.title}</Heading>
                                    <CParagraph>{item.shortdescription}</CParagraph>
                                    <ListItem>{listItems(item.liItems)}</ListItem>
                                </AnimateLeftRight>
                        }
                    </LeftPanel>  
                    <RightPanel>
                        <CodeBlock>
                            {item.codeBlock}
                        </CodeBlock>
                    </RightPanel>           
                </Content>
            ),
        );
        
    return (
        <Container {...args}>
            <Row>
                <GHeading type="h6" bold>{heading}</GHeading>
                <Heading type="h1" bold>{subheading}</Heading>
                <SParagraph>{description}</SParagraph>
            </Row>
            <Row>
                <Heading type="h3" bold>{navheading}</Heading>
                <Tabs onSelect={(index)=>{if(index!==selectedIndex)setSelectedIndex(index)}}>
                    <NavTabList>
                        {navigation()}                         
                    </NavTabList>
                    <ContentHolder> 
                        {contentBlock()}
                    </ContentHolder>
                </Tabs>
            </Row>
        </Container>
    );
};

/**
 * styled
 */
const Container = styled.div`
    ${flex('column')}
    width: 80%;
    padding: 1rem;
    ${media('phone', 'padding: .5rem;width:100%;')};
`;
const Row = styled.div` 
    width: 100%;
    margin-bottom: 1rem;
`;
const SParagraph = styled(Paragraph)`
    margin-bottom: 1.5rem;
`;
const GHeading = styled(Heading)` 
    color: ${({ theme }) => theme.colors.primary};
`;
const NavTabList = styled(TabList)`
    position: relative;
    ${flex()};
    padding: 0;
    background-color:${({theme})=>theme.colors.background};
    z-index:1;
`; 
const NavTab = styled(Tab)`
    position: relative;
    ${flex('row','center')};
    text-align: center;
    padding: .5rem 1rem;
    font-weight: bold;
    border-radius: 25px;
    cursor: pointer;
    mix-blend-mode: difference;
    z-index:2;
    color:${({ theme }) => theme.colors.background};
    // &.react-tabs__tab--selected, .react-tabs__tab--selected:active {
    //     color: #fff;
    //     // background-color: ${({ theme }) => theme.colors.primary};
    // }
    &.react-tabs__tab--selected:hover {
        opacity: 1;
    }
    &:hover {
        opacity: .5;
    }
    ${media('phone', 'font-size:.8rem; padding:.2rem .5rem')};
`;
const NavTabSelected=styled(NavTab)`
background-color: ${({ theme }) => theme.colors.primary};
color: ${({ theme }) => theme.colors.primary};
position:absolute;
top:0;
left:0;
z-index:0;
`
const ContentHolder =styled.div`
    padding: 5px;
    border: 1px solid #c5c3c3;
    border-radius: 6px;
    
`;
const Content =styled(TabPanel)`
    ${flex('row')};
    flex: 1;    
    ${media('phone', 'flex-direction: column')}
`;
const LeftPanel =styled.div`
    width: 100%;
    padding: 1rem; 
    position: relative;
    overflow: hidden;
    ${media('phone', 'padding: 0;margin-bottom: 2rem;')}
`;
// animate left content slide in from left
const AnimateLeftPanel = styled.div`
    position: absolute;
    padding: 0 1rem;
    left: -1000px;
    animation: slide-left 0.5s forwards;
    animation-delay: 0.2s;
    @keyframes slide-left {
        100% { left: 0; }
    }
    ${media('phone', 'position: relative;')}
`;
// animate left content slide in from right
const AnimateLeftRight = styled.div`
    position: absolute;
    padding: 0 1rem;
    right: -1200px;
    animation: slide-right 0.5s forwards;
    animation-delay: 0.2s;
    @keyframes slide-right {
        100% { right: 0; }
    }
    ${media('phone', 'position: relative;')}
`;
const Tick = styled(Check)`
    color: #fff;
    width: 15px;
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 1px;
    border-radius: 50%;
    margin-right: .3rem; 
`;
const ListItem = styled.div`
    display: block;
    width: 100%;
    margin-bottom: .5rem; 
`;
const CParagraph = styled(Paragraph)`
    margin: .6rem 0;
`;
// right panel 
const RightPanel =styled.div`
    width: 100%;
    color: #fff;
    padding: 1rem;
    border-radius: 5px; 
    min-height: 325px;
    background: #0C2E4E;
    ${media('phone', 'width: auto;')}
`; 
const CodeBlock = styled.code`
    width: 100%;
    &:before {
        color: #c975fa;
        content: "const ";
    }
`;
