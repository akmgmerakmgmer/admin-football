import React, { useState } from 'react'
import SingleCheckboxes from '../../GeneralComponents/SingleCheckboxes'
import moment from 'moment'
import Status from '../../GeneralComponents/Status'
import { useTranslation } from 'react-i18next'
import EditAndDelete from '../../GeneralComponents/EditAndDelete'
type SinglePlayerProps = {
    checkBoxItems: any[],
    value: {
        _id: string,
        firstName: string,
        fullName: string,
        nameEn: string,
        nameAr: string,
        image: string,
    },
    deleteFunc: (id: string) => void,
    enableFunc: (id: string) => void
}
export default function SingleUser(props: SinglePlayerProps) {
    const { t } = useTranslation()
    return (
        <tr>
            <SingleCheckboxes checkBoxItems={props.checkBoxItems} value={props.value} />
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.firstName}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.fullName}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.nameEn}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.nameAr}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div className="h-10 w-10 flex-shrink-0">
                    <img className="h-10 w-10 rounded-full object-cover" src={props.value.image} alt="" />
                </div>
            </td>
            <EditAndDelete route={`/edit-player/${props.value._id}`} deleteFunc={() => props.deleteFunc(props.value._id)} />
        </tr>

    )
}
