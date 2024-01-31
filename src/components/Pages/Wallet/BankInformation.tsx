import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Input from '../../TextFields/Input'
import { CSSTransition } from 'react-transition-group'
import ButtonWithSpinner from '../../GeneralComponents/ButtonWithSpinner'

type BankInformationProps = {
    loading: boolean,
    show: boolean,
    action: () => void,
    bankInformation: any,
    errors: any
}
export default function BankInformation(props: BankInformationProps) {
    const { t, i18n } = useTranslation()
    return (
        <CSSTransition
            in={props.show}
            timeout={300}
            classNames="default"
            unmountOnExit>
            <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className='w-full'>
                <h1 className="text-lg border-b-4 border-primaryColor font-bold inline-block text-gray-800">{t('bankInformation')}</h1>
                <div className="flex flex-col gap-2">
                    <Input width='w-full' label={t('recieverName')} inputValue={(value: string) => props.bankInformation.current.recieverName = value} disabled={props.loading} errorMessage={props.errors.recieverName} />
                    <Input width='w-full' label={t('accountNumber')} inputValue={(value: string) => props.bankInformation.current.accountNumber = value} disabled={props.loading} errorMessage={props.errors.accountNumber} />
                    <Input width='w-full' label={t('bankName')} inputValue={(value: string) => props.bankInformation.current.bankName = value} disabled={props.loading} errorMessage={props.errors.bankName} />
                </div>
                <ButtonWithSpinner disabled={props.loading} click={props.action} loading={props.loading} text={t('withdrawAmount')} />
            </div>
        </CSSTransition>

    )
}
