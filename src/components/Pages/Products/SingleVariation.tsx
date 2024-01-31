import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Divider } from '@material-ui/core'
import IconLinks from '../../Navbar/NavComponents/IconLinks'
import DeleteIcon from '@mui/icons-material/Delete';
import SelectedComponent from '../../GeneralComponents/SelectComponent'
import EditIcon from '@mui/icons-material/Edit';
import Input from '../../TextFields/Input';
type SingleVariationProps = {
    variation: any,
    colors: string[],
    loading: boolean
    productForm: any,
    index: number,
    deleteProductFormVariation: (index: number) => void
}
export default function SingleVariation(props: SingleVariationProps) {
    const { t } = useTranslation()
    const [edit, setEdit] = useState(false)
    const [variationErrors, setVariationErrors] = useState({ color: false, size: '', price: '', stock: '' })
    const submitEdit = () => {
        if ((props.productForm.variations[props.index].color || props.productForm.variations[props.index].size) && props.productForm.variations[props.index].price > 0 && props.productForm.variations[props.index].stock) {
            setEdit(false)
        } else {
            setVariationErrors({ color: props.productForm.variations[props.index].color || props.productForm.variations[props.index].size ? false : true, size: props.productForm.variations[props.index].color || props.productForm.variations[props.index].size ? '' : t("field_required"), price: !props.productForm.variations[props.index].price ? t("field_required") : '', stock: !props.productForm.variations[props.index].stock ? t("field_required") : '' })
        }
    }
    return (
        <div>
            <div className='flex flex-col gap-3.5 font-semibold text-gray-800'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-semibold text-lg border-b-4 text-gray-800 border-primaryColor'>{t('newVariant')} #{props.index + 1}</h2>
                    <div className='flex gap-2'>
                        {!edit && <IconLinks title={t('edit')} iconAction={() => setEdit(true)}><EditIcon color='primary' /></IconLinks>}
                        <IconLinks title={t('delete')} iconAction={() => props.deleteProductFormVariation(props.index)}><DeleteIcon color='error' /></IconLinks>
                    </div>
                </div>
                {edit ?
                    <div className='flex flex-col gap-1'>

                        {props.variation.color !== "default" && <div className='mt-3'>
                            <SelectedComponent translation={true} defaultValue={props.variation.color} label={t('color')} items={props.colors} callbackValue={(value: string) => props.productForm.variations[props.index].color = value} errorMessage={variationErrors.color} />
                        </div>}
                        {props.variation.size !== "default" && <Input label={t('size')} value={props.variation.size} inputValue={(value: string) => props.productForm.variations[props.index].size = value} width="w-full" disabled={props.loading} errorMessage={variationErrors.size} />}
                        <Input label={t('price')} value={props.variation.price} inputType="number" inputValue={(value: any) => props.productForm.variations[props.index].price = value} width=" w-full" disabled={props.loading} errorMessage={variationErrors.price} />
                        <Input required={false} label={t('discount')} value={props.variation.discount} inputType="number" inputValue={(value: any) => props.productForm.variations[props.index].discount = value} width=" w-full" disabled={props.loading} />
                        <Input label={t('quantity')} value={props.variation.stock} inputType="number" inputValue={(value: any) => props.productForm.variations[props.index].stock = value} width="w-full" disabled={props.loading} errorMessage={variationErrors.stock} />
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={submitEdit}>{t('submit')}</button>
                    </div>
                    :
                    <div className='flex flex-col gap-3.5'>
                        {props.variation.color !== "default" && <span>{t('color')} : {t(props.variation.color.toLowerCase())}</span>}
                        {props.variation.size !== "default" && <span>{t('size')} : {props.variation.size}</span>}
                        <span>{t('price')} : {props.variation.price}</span>
                        {props.variation.discount > 0 && <span>{t('discount')} : {props.variation.discount}</span>}
                        <span>{t('quantity')} : {props.variation.stock}</span>
                        {props.productForm.variations.length > props.index + 1 && <Divider />}
                    </div>
                }
            </div>
        </div>
    )
}
