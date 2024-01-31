import React from 'react'
import { useTranslation } from 'react-i18next'

type SingleWalletProps = {
    amount: string | number,
    icon: any,
    background: string,
    title: string,
    buttonBackground: string,
    action: () => void
}
export default function SingleWallet(props: SingleWalletProps) {
    const { t } = useTranslation()
    return (
        <div className={`p-5 md:col-start-2 md:col-span-4 inline-flex flex-col font-semibold gap-3 bg-gradient-to-tr ${props.background} rounded-xl shadow-lg text-white`}>
            <div className='flex justify-between items-center'>
                <span>{props.amount} {t('currency')}</span>
                {props.icon}
            </div>
            <div className='relative h-2'>
                <div className='w-full h-full rounded-lg bg-black bg-opacity-20 absolute top-0 left-0'></div>
                <div className='w-2/3 h-full rounded-lg bg-white absolute top-0 left-0'></div>
            </div>
            <span>{props.title}</span>
            <button onClick={props.action} className={`${props.buttonBackground} p-3 w-full rounded-md font-semibold text-lg`}>{t('withdrawAmount')}</button>
        </div>
    )
}
