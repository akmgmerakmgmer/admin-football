import React from 'react'
import SingleCheckboxes from '../../GeneralComponents/SingleCheckboxes'
import { useTranslation } from 'react-i18next'
import EditAndDelete from '../../GeneralComponents/EditAndDelete'
type SingleShopItemProps = {
    checkBoxItems: any[],
    value: {
        title: {
            en: string,
            ar: string
        },
        image: string,
        numberOfPlayers: number,
        wins_to_promote: number,
        loses_to_demote: number,
        _id: string
    },
    deleteFunc: (id: string) => void,
}
export default function SingleShopItem(props: SingleShopItemProps) {
    const { t } = useTranslation()
    return (
        <tr>
            <SingleCheckboxes checkBoxItems={props.checkBoxItems} value={props.value} />
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <img className='rounded-full w-10 h-10 object-cover' src={props.value.image} />
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.title.en}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.title.ar}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.numberOfPlayers.toString()}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.wins_to_promote.toString()}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.loses_to_demote.toString()}</div>
                </div>
            </td>
            <EditAndDelete route={`/edit-rank/${props.value._id}`} deleteFunc={() => props.deleteFunc(props.value._id)} />
        </tr>

    )
}
