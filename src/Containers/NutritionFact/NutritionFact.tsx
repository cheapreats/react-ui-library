import React,{useCallback,useMemo,useRef,forwardRef,useState,useLayoutEffect} from 'react'
import styled from 'styled-components'
import { Mixins } from '../../Utils'
import {
    Main,
    MainInterface,
} from '../../Utils/BaseStyles';
import Theme from '../../Themes/ThemeTemplate'
import {Input} from '../../Inputs/Input/Input'

const EXTRA_PIXEL=1
const ENTRY_INPUT_WIDTH=20
const HEADER_ENTRY_INPUT_WIDTH=40

interface IAdditionalProps{
    /* if the heading entry must to be taken as the reference entry for taking width from */
    ref?:boolean;
    /* if the content of the heading entry must be delayed after setting max width of the main container */
    delay?:boolean;
}

interface IEntries{
    /* type of entry, heading or entry */
    type:string;
    /* data per line */
    entry:IEntryProps|IHeadingEntryProps&IAdditionalProps;
}

export interface INutritionFactProps{
    entries:IEntries[];
    editMode?:boolean;
}

export const NutritionFact:React.FC<INutritionFactProps>=({entries,editMode}):React.ReactElement=>
{
    const rootContainerRef=useRef<HTMLDivElement>(null)

    const containerRef=useRef<HTMLDivElement>(null)

    const delayedLabelRef=useRef<string[]>([])

    const infoRef=useRef<IInfo|null>(null)

    /**
     * renders an entry of type entry
     * @param entry {IEntryProps} - the entry to render
     * @returns {React.ReactElement} the rendered entry
     */
    const renderEntry=useCallback((entry:IEntryProps):React.ReactElement=>{
        const {label,...rest}=entry
        return <Entry key={label} label={label} margin='0 0 2px' padding='0 0 1px' editMode={editMode} {...rest} />
    },[editMode])

    /**
     * renders an entry of type heading
     * @param entry {IHeadingEntryProps} - the entry to render
     * @returns {React.ReactElement} the rendered entry
     */
    const renderHeadingEntry=useCallback((entry:IHeadingEntryProps&IAdditionalProps):React.ReactElement=>{
        const {label,ref,delay,...rest}=entry
        if(ref) return <HeadingEntry key={label} label={label} ref={containerRef} editMode={editMode} {...rest} />
        if(delay) {
            delayedLabelRef.current.push(label)
            return <HeadingEntry key={label} label='' infoRef={infoRef} editMode={editMode} {...rest} />
        }
        return <HeadingEntry key={label} label={label} editMode={editMode} {...rest} />
    }
    ,[])

    /**
     * this sets max width for the main container of the component and also sets the content for the delayed label
     */
    useLayoutEffect(()=>{
        if(rootContainerRef.current&&containerRef.current) rootContainerRef.current.style.maxWidth=`${containerRef.current.clientWidth+EXTRA_PIXEL}px`
        infoRef.current?.setDelayedLabel(delayedLabelRef.current[0])
    },[])

    /**
     * renders the entries
     */
    const renderEntries=useCallback(()=>
        entries.map(({type,entry})=>{
            switch(type){
            case 'entry':
                return renderEntry(entry as IEntryProps)
            case 'heading':
                return renderHeadingEntry(entry as IHeadingEntryProps&IAdditionalProps)
            default:
                return null
            }
        })
    ,[entries])

    return     (
        <RootContainer padding='5px' ref={rootContainerRef}>
            {renderEntries()}
        </RootContainer>
    )
}

interface IRootContainerProps extends MainInterface{
    width?:number
}

const RootContainer=styled.div<IRootContainerProps>`
border:2px solid black;
${({width,...props}):string=>`
${width?`width:${width}px;`:'width:fit-content;'}
${Main({...props})}
`}
`

interface IInfo{
    setDelayedLabel:React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface ICommonEntryProps{
    fontSize?:string;
    bold?:boolean;
    separatorWidth?:number;
    editMode?:boolean;
    margin?:string;
    padding?:string;
}

interface IHeadingEntryProps extends ICommonEntryProps{
    label:string;
    justifyContent?:string;
    secondLabel?:string;
    infoRef?:React.MutableRefObject<IInfo | null>;
    editable?:boolean;
}

const HeadingEntry=forwardRef<HTMLDivElement,IHeadingEntryProps>(({label,editMode,editable,separatorWidth=1,secondLabel,infoRef,...props},ref):React.ReactElement=>{
    const [delayedLabel,setDelayedLabel]=useState<string>()
    const [secondLabelState,setSecondLabelState]=useState(secondLabel)

    /**
     * this updates info in the parent component
     */
    useLayoutEffect(()=>{
        if(infoRef) infoRef.current={setDelayedLabel}
    },[])

    /**
     * updates state for second label based on event fired
     * @param event {React.ChangeEvent<HTMLInputElement>} - the fired event 
     */
    const updateSecondLabel=useCallback(({target}:React.ChangeEvent<HTMLInputElement>)=>{
        setSecondLabelState(target.value)
    },[]) 

    /**
     * renders the second label if exists
     * @returns {JSX.Element | null} the rendered second label, in case that exists, depending on edit mode and if the entry is 
     * editable
     */
    const renderSecondLabel=useCallback(()=>{
        if(secondLabelState){
            if(editMode&&editable)
                return <Input value={secondLabelState} onChange={updateSecondLabel} width={HEADER_ENTRY_INPUT_WIDTH} />
            return <div>{secondLabelState}</div>
        }
        return null
    },[secondLabelState])

    return (
        <EntryContainer separatorWidth={separatorWidth} {...props} ref={ref}>
            <div>{label||delayedLabel}</div>
            {renderSecondLabel()}
        </EntryContainer>
    )
})

interface IEntryProps extends ICommonEntryProps{
    amount?:number;
    dailyAmount:number;
    label:string;
    unity:string;
    indentationNumber?:number;
    indentationSize?:number;
}

const Entry:React.FC<IEntryProps>=({
    amount=0,
    dailyAmount,
    label,
    unity,
    editMode,
    bold=false,
    separatorWidth=1,
    indentationNumber=0,
    indentationSize=4,
    ...props
}):React.ReactElement=>{
    const [amountState,setAmountState]=useState<string>(amount.toString())
    
    /**
     * this computes the daily value percentage
     */
    const dailyValuePercentage= useMemo(()=>{
        if(dailyAmount)
            return Math.round(parseInt(amountState,10)/dailyAmount*100) 
        return null
    },[dailyAmount,amountState]);

    /**
     * computes the amount of white space
     * @returns {string} white space 
     */
    const renderIndentation=useCallback(()=>{
        let space=''
        const nbsp='\u00a0'
        for(let j=0;j<indentationNumber;j+=1){
            for(let i=0;i<indentationSize; i+=1) {
                space+=nbsp
            }
        }
        return space
    },[indentationNumber,indentationSize])

    const updateAmountState=({target}:React.ChangeEvent<HTMLInputElement>)=>{
        setAmountState(target.value)
    }

    /**
     * renders the amount depending on editMode
     */
    const renderAmount=useCallback(()=>{
        if(editMode){
            return <Input onChange={updateAmountState} value={amountState} width={ENTRY_INPUT_WIDTH} />
        }
        return amountState
    },[editMode,amountState])

    return (
        <EntryContainer separatorWidth={separatorWidth} justifyContent='space-between' {...props}>
            <LabelContainer> 
                {renderIndentation()}
                <Bold bold={bold}>
                    {label}
                    &nbsp;
                </Bold>
                <AmountContainer>
                    {renderAmount()}
                    {unity}
                </AmountContainer>
            </LabelContainer>
            {dailyValuePercentage!==null&&(
                <Bold bold={bold}>
                    {dailyValuePercentage}
                    %
                </Bold>
            )}
        </EntryContainer>
    )
}

interface IEntryContainerProps extends MainInterface{
    fontSize?:string;
    separatorWidth:number;
    justifyContent?:string;
    bold?:boolean;
}

const EntryContainer=styled.div<IEntryContainerProps>`
${({
        separatorWidth,
        fontSize=Theme.font.size.small,
        justifyContent='flex-start',
        bold=false,
        ...props
    }):string=>`
${Mixins.flex(justifyContent,'center')}
border-bottom:${separatorWidth}px solid black;
font-size:${fontSize};
${bold?'font-weight:700;':''}
${Main({...props})}
`}
`

const LabelContainer=styled.div`
${Mixins.flex('flex-start','center')}
`
const AmountContainer=styled.div`
${Mixins.flex('flex-start','center')}
`

interface IBoldProps{
    bold?:boolean;
}

const Bold=styled.div<IBoldProps>`
${({bold}):string=>`
${bold?'font-weight:700;':''}
`}
`


