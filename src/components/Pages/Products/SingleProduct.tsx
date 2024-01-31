import React from 'react'
import { useTranslation } from 'react-i18next'
import EditAndDelete from '../../GeneralComponents/EditAndDelete'
import SingleCheckboxes from '../../GeneralComponents/SingleCheckboxes'
import Status from '../../GeneralComponents/Status'

type SingleProductProps = {
    checkBoxItems: any[],
    value: {
        _id: string,
        images: string[],
        name: string,
        nameAr: string,
        price: number,
        discount: number,
        stock: number,
        variations: object[],
        numberOfViews: number,
        numberOfAddToCart: number,
        affiliateProduct: boolean,
        profit: number,
        category: {
            name: string,
            nameAr: string,
            image: string
        },
        subcategory: {
            name: string,
            nameAr: string,
            image: string
        },
        user: {
            email: string,
        }
        disabled: boolean,
        pending: boolean
    },
    deleteFunc: (id: string) => void,
    showEnable: boolean,
    showDisable: boolean,
    showAffiliateProfit: boolean
    disableFunc: (id: string) => void,
    enableFunc: (id: string) => void
}
export default function SingleProduct(props: SingleProductProps) {
    const { i18n, t } = useTranslation()
    return (
        <tr key={props.value._id}>
            <SingleCheckboxes checkBoxItems={props.checkBoxItems} value={props.value} />
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div className="flex gap-4 items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full object-cover" src={props.value.images[0]} alt="" />
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{i18n.language === "en" ? props.value.name.slice(0, 30) : props.value.nameAr.slice(0, 30)}</div>
                    </div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div className="flex gap-4 items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full object-cover" src={props.value.category.image} alt="" />
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{i18n.language === "en" ? props.value.category.name : props.value.category.nameAr}</div>
                    </div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div className="flex gap-4 items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full object-cover" src={props.value.subcategory.image} alt="" />
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{i18n.language === "en" ? props.value.subcategory.name : props.value.subcategory.nameAr}</div>
                    </div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.price - props.value.discount}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                {props.value.variations.length > 0 ?
                    <div>
                        <div className="font-medium text-gray-900">{t("containsVariations")}</div>
                    </div>
                    : <div>
                        <div className="font-medium text-gray-900">{props.value.stock}</div>
                    </div>}
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.user?.email ? props.value.user?.email : t('Admin')}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.numberOfViews.toString()}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.numberOfAddToCart.toString()}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.pending ? <Status title={t('pending')} color='bg-orange-500' /> : props.value.disabled ? <Status title={t('disabled')} color='bg-red-500' /> : <Status title={t('active')} color='bg-green-500' />}</div>
                </div>
            </td>
            {props.showAffiliateProfit && <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.profit === 0 ? t('noProfit') : props.value.profit.toString()}</div>
                </div>
            </td>}
            <EditAndDelete showDisable={props.showDisable} showEnable={props.showEnable} route={`/edit-product/${props.value._id}`} disableFunc={() => props.disableFunc(props.value._id)} enableFunc={() => props.enableFunc(props.value._id)} deleteFunc={() => props.deleteFunc(props.value._id)} />
        </tr>

    )
}
