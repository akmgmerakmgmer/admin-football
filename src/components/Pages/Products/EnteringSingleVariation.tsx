import React from 'react'
import IconLinks from '../../Navbar/NavComponents/IconLinks'
import DeleteIcon from '@mui/icons-material/Delete';
import SelectedComponent from '../../GeneralComponents/SelectComponent'
import EditIcon from '@mui/icons-material/Edit';
import Input from '../../TextFields/Input';
import { useTranslation } from 'react-i18next';
type EnteringSingleVariationProps = {
    colors: string[]
    variations: any,
    index: number,
    loading: boolean,
    variationErrors: any
    variation: any,
    submitVariant: (variation: any, index: number) => void
    deleteVariation: (index: number) => void
}
export default function EnteringSingleVariation(props: EnteringSingleVariationProps) {
    const { t } = useTranslation()

    return (
        <div className='flex flex-col gap-1'>
            <div className='flex justify-between items-center'>
                <h2 className='font-semibold text-lg border-b-4 text-gray-800 border-primaryColor'>{t('newVariant')}</h2>
                <IconLinks title={t('delete')} iconAction={() => props.deleteVariation(props.index)}><DeleteIcon color='error' /></IconLinks>
            </div>
            <div className='mt-3'>
                <SelectedComponent required={false} translation={true} defaultValue={""} label={t('color')} items={props.colors} callbackValue={(value: string) => props.variations.current[props.index].color = value} errorMessage={props.variationErrors.color} />
            </div>
            <Input required={false} label={t('size')} inputValue={(value: string) => props.variations.current[props.index].size = value} width="w-full" disabled={props.loading} errorMessage={props.variationErrors.size} />
            <Input label={t('price')} inputType="number" inputValue={(value: any) => props.variations.current[props.index].price = value} width=" w-full" disabled={props.loading} errorMessage={props.variationErrors.price} />
            <Input required={false} label={t('discount')} inputType="number" inputValue={(value: any) => props.variations.current[props.index].discount = value} width=" w-full" disabled={props.loading} />
            <Input label={t('quantity')} inputType="number" inputValue={(value: any) => props.variations.current[props.index].stock = value} width="w-full" disabled={props.loading} errorMessage={props.variationErrors.stock} />
            <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={() => props.submitVariant(props.variation, props.index)}>{t('submit')}</button>
        </div>
    )
}
