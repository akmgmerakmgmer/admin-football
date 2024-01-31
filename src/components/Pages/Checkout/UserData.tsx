import React from 'react'
import { useTranslation } from 'react-i18next'
import SelectedComponent from '../../GeneralComponents/SelectComponent'
import SelectWithSearch from '../../GeneralComponents/SelectWithSearch'
import Input from '../../TextFields/Input'

type UserDataProps = {
    loading: boolean,
    egyptLoading: boolean,
    governorateOptions: [],
    citiesOptions: [],
    setName: (value: string) => void,
    setNumber: (value: number) => void
    setGovernorate: (value: string) => void,
    setCity: (value: string) => void,
    setDetailedAddress: (value: string) => void,
    setNotes: (value: string) => void,
    nameError: string,
    numberError: string,
    governorateError: boolean,
    cityError: boolean,
    detailedAddressError: string
}
export default function UserData(props: UserDataProps) {
    const { t } = useTranslation()
    return (
        <div className='flex flex-col gap-1'>

            <Input label={t('name')} inputValue={(value: string) => props.setName(value)} width="w-full" disabled={props.loading} errorMessage={props.nameError} />
            <Input label={t('number')} inputType="number" inputValue={(value: number) => props.setNumber(value)} width="w-full" disabled={props.loading} errorMessage={props.numberError} />
            <div className='flex flex-col gap-5 mt-4'>
                <SelectedComponent defaultValue="" items={props.governorateOptions} callbackValue={(value: string) => props.setGovernorate(value)} customLabel={t("governorate")} label={t("governorate")} disabled={props.loading || props.egyptLoading} errorMessage={props.governorateError} />
                <SelectedComponent defaultValue="" items={props.citiesOptions} callbackValue={(value: string) => props.setCity(value)} label={t("city")} customLabel={t("city")} disabled={props.loading || props.egyptLoading || props.governorateOptions.length === 0} errorMessage={props.cityError} />
            </div>
            <Input label={t('detailedAddress')} inputValue={(value: string) => props.setDetailedAddress(value)} width="w-full" disabled={props.loading} errorMessage={props.detailedAddressError} />
            <Input label={t('notes')} inputType="textarea" inputValue={(value: string) => props.setNotes(value)} width="w-full" disabled={props.loading} />
        </div>
    )
}
