import React from 'react'
import SingleCheckboxes from '../../GeneralComponents/SingleCheckboxes'
import { useTranslation } from 'react-i18next'
type SingleTransactionProp = {
    checkBoxItems: any[],
    value: {
        _id: string,
        username: number,
        number: number,
        itemQuantity: string,
        itemBought: string,
        isPaid: boolean,
        image: string,
    },
}
export default function SingleTransaction(props: SingleTransactionProp) {
    const { t } = useTranslation()
    return (
        <tr>
            <SingleCheckboxes checkBoxItems={props.checkBoxItems} value={props.value} />
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.username}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.number}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{t(props.value.itemBought)}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.itemQuantity}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{t(props.value.isPaid.toString())}</div>
                </div>
            </td>
        </tr>

    )
}
