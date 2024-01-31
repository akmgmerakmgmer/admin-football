import React from 'react'
import { useTranslation } from 'react-i18next'
import EditAndDelete from '../../GeneralComponents/EditAndDelete'
import SingleCheckboxes from '../../GeneralComponents/SingleCheckboxes'

type SingleBrandProps = {
    checkBoxItems: any[],
    value: {
        _id: string,
        image: string,
        name: string,
        nameAr: string,
        category: [{
            image: string,
            name: string,
            nameAr: string
        },]
        subcategory: [{
            image: string,
            name: string,
            nameAr: string
        }]
    },
    deleteFunc: (id: string) => void
}
export default function SingleBrand(props: SingleBrandProps) {
    const { i18n } = useTranslation()
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
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div className='flex gap-5'>
                    {props.value.category.map((category: any) => (
                        <div className="flex gap-4 items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                                <img className="h-10 w-10 rounded-full object-cover" src={category.image} alt="" />
                            </div>
                            <div>
                                <div className="font-medium text-gray-900">{i18n.language === "en" ? category.name : category.nameAr}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6 ">
                <div className='flex gap-5'>
                    {props.value.subcategory.map((subcategory => (
                        <div className="flex gap-4 items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                                <img className="h-10 w-10 rounded-full object-cover" src={subcategory.image} alt="" />
                            </div>
                            <div>
                                <div className="font-medium text-gray-900">{i18n.language === "en" ? subcategory.name : subcategory.nameAr}</div>
                            </div>
                        </div>
                    )))}
                </div>
            </td>
            <EditAndDelete route={`/edit-brand/${props.value._id}`} deleteFunc={() => props.deleteFunc(props.value._id)} />
        </tr>

    )
}
