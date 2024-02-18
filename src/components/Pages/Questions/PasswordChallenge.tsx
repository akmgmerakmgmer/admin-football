import React from 'react'
import Input from '../../TextFields/Input'
import { Delete } from '@material-ui/icons'
type PasswordChallengeProps = {
    hints: any,
    index: number,
    setHints: () => void,
    setRerender: () => void,
    // deleteHint: () => void
    loading: boolean,
    t: any
}
export default function PasswordChallenge(props: PasswordChallengeProps) {
    return (
        <div className='flex gap-5 items-center' key={props.index}>
            <Input value={props.hints[props.index]?.en} label={props.t('hintInEnglish')} inputValue={(value: string) => {
                props.hints[props.index].en = value
                props.setHints()
                props.setRerender()
            }} width="w-full" disabled={props.loading} />
            <Input value={props.hints[props.index]?.ar} label={props.t('hintInArabic')} inputValue={(value: string) => {
                props.hints[props.index].ar = value
                props.setHints()
                props.setRerender()
            }} width="w-full" disabled={props.loading} />
            {/* <div className='cursor-pointer' onClick={props.deleteHint}>
                <Delete color='error' />
            </div> */}
        </div>
    )
}
