import React from 'react'
import Input from '../../TextFields/Input'
import { Delete } from '@material-ui/icons'
type PasswordChallengeProps = {
    index: number,
    hintEnglishCallback: (value: string) => void,
    hintArabicCallBack: (value: string) => void,
    deleteHint: () => void
    loading: boolean,
    t: any,
    textarea?: boolean,
    valueEn: string,
    valueAr: string,
    showDelete:boolean
}
export default function PasswordChallenge(props: PasswordChallengeProps) {
    return (
        <div className='flex gap-5 items-center' key={props.index}>
            <Input value={props.valueEn} label={props.t('hintInEnglish')} inputValue={(value: string) => props.hintEnglishCallback(value)} width="w-full" disabled={props.loading} textarea={props.textarea} />
            <Input value={props.valueAr} label={props.t('hintInArabic')} inputValue={(value: string) => props.hintArabicCallBack(value)} width="w-full" disabled={props.loading} textarea={props.textarea} />
            {props.showDelete && <div className='cursor-pointer' onClick={props.deleteHint}>
                <Delete color='error' />
            </div>}
        </div>
    )
}
