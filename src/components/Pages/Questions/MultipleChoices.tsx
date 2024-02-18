import React from 'react'
import Input from '../../TextFields/Input'

type MultipleChoicesProps = {
    choices: any,
    index: number,
    setChoices: () => void,
    setRerender: () => void,
    loading: boolean,
    t: any
}

export default function MultipleChoices(props: MultipleChoicesProps) {
    return (
        <div className='flex gap-5' key={props.index}>
            <Input value={props.choices[props.index]?.en} label={props.t('choiceInEnglish')} inputValue={(value: string) => {
                props.choices[props.index].en = value
                props.choices[props.index].value = value.trim()
                props.setChoices()
                props.setRerender()
            }} width="w-full" disabled={props.loading} />
            <Input value={props.choices[props.index]?.ar} label={props.t('choiceInArabic')} inputValue={(value: string) => {
                props.choices[props.index].ar = value
                props.setChoices()
                props.setRerender()
            }} width="w-full" disabled={props.loading} />
        </div>
    )
}
