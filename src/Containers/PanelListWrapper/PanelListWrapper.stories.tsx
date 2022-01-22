import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { Meta, Story } from '@storybook/react';
import { MainTheme } from '@Themes/MainTheme';
import {Button} from '@Inputs/Button/Button';
import {flex} from '@Utils/Mixins'
import { PanelListWrapper, IPanelListWrapperProps } from './PanelListWrapper';
import {OperationState,IPanelCardProps} from '../PanelCard/PanelCard';

export default {
    title: 'Components/PanelListWrapper',
    component: PanelListWrapper,
    args: {
        panels:[],
    },
} as Meta;

export const Basic: Story<IPanelListWrapperProps> = (args) => (
    <PanelListWrapper {...args} />
);

export const WithSomePanels= Basic.bind({});
WithSomePanels.args={
    ...Basic.args,
    panels:[
        {
            name:'fileA.doc',
            operationState:OperationState.isLoading,
        },
        {
            name:'fileA.pdf',
            operationState:OperationState.isLoading,
        },
        {
            name:'fileB.pdf',
            operationState:OperationState.isSuccess,
        },       {
            name:'fileB.doc',
            operationState:OperationState.isLoading,
        },
        {
            name:'fileC.pdf',
            operationState:OperationState.isLoading,
        },
        {
            name:'fileC.docx',
            operationState:OperationState.isSuccess,
        }
    ]
}

export const WithVerticalSpacingBetweenPanels= WithSomePanels.bind({});
WithVerticalSpacingBetweenPanels.args= {
    ...WithSomePanels.args,
    verticalSpacing:10,
}

export const WithStyleAndAnimated= WithVerticalSpacingBetweenPanels.bind({});
WithStyleAndAnimated.args= {
    ...WithVerticalSpacingBetweenPanels.args,
    style:{
        width:'250px',
        border:`2px solid ${MainTheme.colors.statusColors.red}`,
        borderRadius:MainTheme.dimensions.radius,
        backgroundColor:MainTheme.colors.background,
    },
    padding:MainTheme.dimensions.padding.container,
    isAnimatedPanels:true,
}

export const AddPanelsProgressivelyAndWithAnimation: Story<IPanelListWrapperProps> = (args) =>{
    const [panels,setPanels]=useState<IPanelCardProps[]>([]);
    const [counter,setCounter]=useState(0);

    const incrementCounter=()=>{
        setCounter(prev=>prev+1);
    }

    const incrementCounterBy=(times:number)=>{
        setCounter(prev=>prev+times);
    }

    const getPanel=(num:number):IPanelCardProps=>({name:`file${num}.pdf`,operationState:OperationState.isLoading})
    
    const addPanel=()=>{
        setPanels(prev=>[...prev,getPanel(counter)])
        incrementCounter();
    }

    const addPanels=()=>{
        setPanels(prev=>[...prev,getPanel(counter),getPanel(counter+1),getPanel(counter+2)])
        incrementCounterBy(3);
    }

    const clearPanels=()=>{
        setPanels([]);
        setCounter(0);
    }

    // this is for development, to check
    useEffect(()=>{
        console.log(panels);
    },[panels])
    
    return <div>
        <ButtonsContainer>
            <Button onClick={addPanel}>add one panel</Button>
            <Button onClick={addPanels}>add three panels</Button>
            <Button onClick={clearPanels}>clear panels</Button>
        </ButtonsContainer>
        <PanelListWrapper {...args} panels={panels} isAnimatedPanels />
    </div>
}

const ButtonsContainer=styled.div`
${flex()}
`