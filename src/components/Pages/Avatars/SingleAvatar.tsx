import React from 'react'
import SingleCheckboxes from '../../GeneralComponents/SingleCheckboxes'
import { useTranslation } from 'react-i18next'
import EditAndDelete from '../../GeneralComponents/EditAndDelete'
type SingleAvatarProp = {
    checkBoxItems: any[],
    value: {
        _id: string,
        price: number
        image: string,
        purchases: number
    },
    deleteFunc: (id: string) => void,
}
export default function SingleAvatar(props: SingleAvatarProp) {
    const { t } = useTranslation()
    return (
        <tr>
            <SingleCheckboxes checkBoxItems={props.checkBoxItems} value={props.value} />
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div className="h-10 w-10 flex-shrink-0">
                    <img className="h-10 w-10 rounded-full object-cover" src={props.value.image} alt="" />
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{t(props.value.price.toString())}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{t(props.value.purchases.toString())}</div>
                </div>
            </td>
            <EditAndDelete route={`/edit-avatar/${props.value._id}`} deleteFunc={() => props.deleteFunc(props.value._id)} />
        </tr>

    )
}
