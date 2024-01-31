import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import EditAndDelete from '../../GeneralComponents/EditAndDelete'
import SingleCheckboxes from '../../GeneralComponents/SingleCheckboxes'
type SingleCodeProps = {
    checkBoxItems: any[],
    value: {
        _id: string,
        code: string,
        discount: number,
        isPercentage: boolean,
        oneTimeUsage: boolean,
        maxDiscount: number,
        minimumOrder: number,
        product: {
            name: string,
            nameAr: string,
            images: any
        }
    },
    deleteFunc: (id: string) => void
}
export default function SingleCode(props: SingleCodeProps) {
    const user = useSelector((state: any) => state.user)
    const { t, i18n } = useTranslation()
    return (
        <tr>
            <SingleCheckboxes checkBoxItems={props.checkBoxItems} value={props.value} />
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.code}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.discount}{props.value.isPercentage ? '%' : ` ${t('currency')}`}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.oneTimeUsage ? t('useOnlyOne') : t('useUnlimited')}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.maxDiscount ? props.value.maxDiscount + ` ${t('currency')}` : t('noLimit')}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.minimumOrder ? props.value.minimumOrder + ` ${t('currency')}` : t('noLimit')}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                {props.value.product ? <div className="flex gap-2 items-center">
                    <div className="h-9 w-9 flex-shrink-0">
                        <img className="h-9 w-9 rounded-full object-cover" src={props.value.product.images[0]} alt="" />
                    </div>
                    <div>
                        <span className="font-medium text-gray-900">{i18n.language === "en" ? props.value.product.name : props.value.product.nameAr}</span>
                    </div>
                </div> :
                    <div>
                        <div className="font-medium text-gray-900">{t('noProductCoupon')}</div>
                    </div>}
            </td>
            <EditAndDelete route={`/edit-promo-code/${props.value._id}`} deleteFunc={() => props.deleteFunc(props.value._id)} hideEdit={user.role !== "Super Admin"} />
        </tr>

    )
}
