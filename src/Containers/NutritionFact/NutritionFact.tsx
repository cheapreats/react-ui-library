import React,{useCallback,useMemo,useRef,forwardRef,useEffect,useState} from 'react'
import styled from 'styled-components'
import { Mixins } from '../../Utils'
import {
    Main,
    MainInterface,
} from '../../Utils/BaseStyles';
import Theme from '../../Themes/ThemeTemplate'

const EXTRA_PIXEL=1

interface IAdditionalProps{
    ref?:boolean;
    delay?:boolean;
}

interface IEntries{
    type:string;
    entry:IEntryProps&IAdditionalProps|IHeadingEntryProps&IAdditionalProps;
}

export interface INutritionFactProps{
    entries:IEntries[];
}

export const NutritionFact:React.FC<INutritionFactProps>=({entries}):React.ReactElement=>
{
    const mainContainerRef=useRef<HTMLDivElement>(null)

    const containerRef=useRef<HTMLDivElement>(null)

    const delayLabel=useRef<string[]>([])

    const infoRef=useRef<IInfo|null>(null)

    /**
     * renders an entry of type entry
     * @param entry {IEntryProps} - the entry to render
     * @returns {React.ReactElement} the rendered entry
     */
    const renderEntry=useCallback((entry:IEntryProps&IAdditionalProps):React.ReactElement=>{
        const {label,...rest}=entry
        return <Entry key={label} label={label} {...rest} margin='0 0 2px' padding='0 0 1px' />
    },[])

    /**
     * renders an entry of type heading
     * @param entry {IHeadingEntryProps} - the entry to render
     * @returns {React.ReactElement} the rendered entry
     */
    const renderHeadingEntry=useCallback((entry:IHeadingEntryProps&IAdditionalProps):React.ReactElement=>{
        const {label,ref,delay,...rest}=entry
        if(ref) return <HeadingEntry key={label} label={label} {...rest} ref={containerRef} />
        if(delay) {
            delayLabel.current.push(label)
            return <HeadingEntry key={label} label='' {...rest} infoRef={infoRef} />
        }
        return <HeadingEntry key={label} label={label} {...rest} />
    }
    ,[])

    /**
     * this sets max width for the main container of the component and also sets the content for the delayed label
     */
    useEffect(()=>{
        if(mainContainerRef.current&&containerRef.current) mainContainerRef.current.style.maxWidth=`${containerRef.current.clientWidth+EXTRA_PIXEL}px`
        infoRef.current?.setDelayedLabel(delayLabel.current[0])
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
                return renderHeadingEntry(entry as IHeadingEntryProps)
            default:
                return null
            }
        })
    ,[entries])

    return     (
        <MainContainer padding='5px' ref={mainContainerRef}>
            {renderEntries()}
        </MainContainer>
    )
}

interface IMainContainerProps extends MainInterface{
    width?:number
}

const MainContainer=styled.div<IMainContainerProps>`
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
    margin?:string;
    padding?:string;
}

interface IHeadingEntryProps extends ICommonEntryProps{
    label:string;
    justifyContent?:string;
    secondLabel?:string;
    infoRef?:React.MutableRefObject<IInfo | null>;
}

const HeadingEntry=forwardRef<HTMLDivElement,IHeadingEntryProps>(({label,separatorWidth=1,secondLabel,infoRef,...props},ref):React.ReactElement=>{
    const [delayedLabel,setDelayedLabel]=useState<string>()

    /**
     * this uploads the info to the parent component
     */
    useEffect(()=>{
        if(infoRef) infoRef.current={setDelayedLabel}
    },[])

    return (
        <EntryContainer separatorWidth={separatorWidth} {...props} ref={ref}>
            <div>{label||delayedLabel}</div>
            {secondLabel&&<div>{secondLabel}</div>}
        </EntryContainer>
    )
})

interface IEntryProps extends ICommonEntryProps{
    amount:number;
    dailyAmount:number;
    label:string;
    unity:string;
    indentationNumber?:number;
    indentationSize?:number;
}

const Entry:React.FC<IEntryProps>=({
    amount,
    dailyAmount,
    label,
    unity,
    bold=false,
    separatorWidth=1,
    indentationNumber=0,
    indentationSize=4,
    ...props
}):React.ReactElement=>{

    /**
     * this computes the daily value percentage
     */
    const dailyValuePercentage= useMemo(()=>{
        if(dailyAmount)
            return Math.round(amount/dailyAmount*100)
        return null
    },[amount,dailyAmount]);

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

    return (
        <EntryContainer separatorWidth={separatorWidth} justifyContent='space-between' {...props}>
            <LabelContainer> 
                {renderIndentation()}
                <Bold bold={bold}>
                    {label}
                    &nbsp;
                </Bold>
                <div>
                    {amount}
                    {unity}
                </div>
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
${({separatorWidth,fontSize=Theme.font.size.small,justifyContent='flex-start',bold=false,...props}):string=>`
${Mixins.flex(justifyContent)}
border-bottom:${separatorWidth}px solid black;
font-size:${fontSize};
${bold?'font-weight:700;':''}
${Main({...props})}
`}
`

const LabelContainer=styled.div`
${Mixins.flex()}
`

interface IBoldProps{
    bold?:boolean;
}

const Bold=styled.div<IBoldProps>`
${({bold}):string=>`
${bold?'font-weight:700;':''}
`}
`


