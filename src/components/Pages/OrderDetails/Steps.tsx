import { Divider, Step, StepLabel, Stepper } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import StepCircle from './StepCircle'
import StepsDivider from './StepsDivider'

type StepsProps = {
    statusValue: string
}
export default function Steps(props: StepsProps) {
    const { t } = useTranslation()

    return (
        <div className='flex items-center mb-10 justify-center'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center'>
                    <StepCircle status={true} />
                    <StepsDivider status={true} />
                </div>
                <span className='text-xs'>{t("pending")}</span>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center'>
                    <StepCircle status={props.statusValue === "Confirmed" || props.statusValue === "Shipped" || props.statusValue === "Delivered"} />
                    <StepsDivider status={props.statusValue === "Confirmed" || props.statusValue === "Shipped" || props.statusValue === "Delivered"}/>
                </div>
                <span className='text-xs'>{t("confirmed")}</span>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center'>
                    <StepCircle status={props.statusValue === "Shipped" || props.statusValue === "Delivered"}/>
                    <StepsDivider status={props.statusValue === "Shipped" || props.statusValue === "Delivered"}/>
                </div>
                <span className='text-xs'>{t("shipped")}</span>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center'>
                    <StepCircle status={props.statusValue === "Delivered"}/>
                </div>
                <span className='text-xs'>{t("delivered")}</span>
            </div>
        </div>
    )
}
