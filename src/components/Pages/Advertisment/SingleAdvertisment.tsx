import React from 'react'
import SingleCheckboxes from '../../GeneralComponents/SingleCheckboxes'
import Status from '../../GeneralComponents/Status'
import { useTranslation } from 'react-i18next'
import EditAndDelete from '../../GeneralComponents/EditAndDelete'
type SingleAdvertismentProps = {
    checkBoxItems: any[],
    value: {
        company: string,
        advertiseAt: string,
        directionLink: string,
        status: string,
        image: string,
        priority: number,
        clicks: number,
        _id: string
    },
    deleteFunc: (id: string) => void,
    enableFunc: (id: string, priority: number, advertiseAt: string) => void
    disableFunc: (id: string) => void
}
export default function SingleUser(props: SingleAdvertismentProps) {
    const { t } = useTranslation()
    return (
        <tr>
            <SingleCheckboxes checkBoxItems={props.checkBoxItems} value={props.value} />
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div className="flex gap-4 items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full object-cover" src={props.value.image} alt={props.value.company} />
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{props.value.company}</div>
                    </div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{t(props.value.advertiseAt)}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.priority.toString()}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.clicks.toString()}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    {props.value.status === 'active' ? <Status color='bg-green-500' title={t('active')} /> : <Status color='bg-red-500' title={t('disabled')} />}
                </div>
            </td>
            <EditAndDelete
                route={`/edit-advertisment/${props.value._id}`}
                deleteFunc={() => props.deleteFunc(props.value._id)}
                showDisable={props.value.status == 'active'}
                disableFunc={() => props.disableFunc(props.value._id)}
                showEnable={props.value.status == 'disabled'}
                enableFunc={() => props.enableFunc(props.value._id, props.value.priority, props.value.advertiseAt)} />
        </tr>

    )
}
