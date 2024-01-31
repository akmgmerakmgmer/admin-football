import React from 'react'
import { useTranslation } from 'react-i18next'
import Input from '../../TextFields/Input'
import { CSSTransition } from 'react-transition-group'
import ButtonWithSpinner from '../../GeneralComponents/ButtonWithSpinner'

type MobileInformationProps = {
    loading: boolean,
    show: boolean,
    action: () => void,
    mobileInformation: any,
    errors: any
}
export default function MobileInformation(props: MobileInformationProps) {
    const { t, i18n } = useTranslation()
    return (
        <CSSTransition
            in={props.show}
            timeout={300}
            classNames="default"
            unmountOnExit>
            <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className='w-full'>
                <h1 className="text-lg border-b-4 border-primaryColor font-bold inline-block text-gray-800">{t('mobileInformation')}</h1>
                <div className="flex flex-col">
                    <Input width='w-full' label={t('recieverNameMobile')} inputValue={(value: string) => props.mobileInformation.current.recieverName = value} disabled={props.loading} errorMessage={props.errors.recieverName} />
                    <Input inputType='number' width='w-full' label={t('number')} inputValue={(value: string) => props.mobileInformation.current.number = value} disabled={props.loading} errorMessage={props.errors.number} />
                </div>
                <ButtonWithSpinner disabled={props.loading} click={props.action} loading={props.loading} text={t('withdrawAmount')} />
            </div>
        </CSSTransition>

    )
}
