import React from 'react'
import { useTranslation } from 'react-i18next'
import EditAndDelete from '../../GeneralComponents/EditAndDelete'
import SingleCheckboxes from '../../GeneralComponents/SingleCheckboxes'

type SingleDealProps = {
    checkBoxItems: any[],
    value: {
        _id: string,
        titleEn: string,
        titleAr: string,
        products: [{
            images: [any],
            name: string,
            nameAr: string
        }],
    },
    deleteFunc: (id: string) => void
}
export default function SingleDeal(props: SingleDealProps) {
    const { i18n, t } = useTranslation()
    return (
        <tr key={props.value._id}>
            <SingleCheckboxes checkBoxItems={props.checkBoxItems} value={props.value} />
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{i18n.language === "en" ? props.value.titleEn : props.value.titleAr}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div className='flex gap-5'>
                    {props.value.products.map((product => (
                        <div className="flex gap-4 items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                                <img className="h-10 w-10 rounded-full object-cover" src={product.images[0]} alt="" />
                            </div>
                            <div>
                                <span className="font-medium text-gray-900">{i18n.language === "en" ? product.name : product.nameAr}</span>
                            </div>
                        </div>
                    )))}
                </div>
            </td>
            <EditAndDelete route={`/edit-hot-deal/${props.value._id}`} deleteFunc={() => props.deleteFunc(props.value._id)} />
        </tr>

    )
}
