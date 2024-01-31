import React from 'react'
import { useTranslation } from 'react-i18next'
import EditAndDelete from '../../GeneralComponents/EditAndDelete'
import SingleCheckboxes from '../../GeneralComponents/SingleCheckboxes'

type SingleCategoryProps = {
    checkBoxItems: any[],
    value: {
        _id: string,
        image: string,
        name: string,
        nameAr: string
    },
    deleteFunc: (id: string) => void
}
export default function SingleCategory(props: SingleCategoryProps) {
    const { i18n, t } = useTranslation()
    return (
        <tr key={props.value._id}>
            <SingleCheckboxes checkBoxItems={props.checkBoxItems} value={props.value} />
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div className="flex gap-4 items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full object-cover" src={props.value.image} alt="" />
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{i18n.language === "en" ? props.value.name : props.value.nameAr}</div>
                    </div>
                </div>
            </td>
            <EditAndDelete route={`/edit-category/${props.value._id}`} deleteFunc={() => props.deleteFunc(props.value._id)} />
        </tr>

    )
}
