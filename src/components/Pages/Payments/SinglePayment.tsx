import React from 'react'
import { useTranslation } from 'react-i18next'
import EditAndDelete from '../../GeneralComponents/EditAndDelete'
import SingleCheckboxes from '../../GeneralComponents/SingleCheckboxes'
import Status from '../../GeneralComponents/Status'
import moment from 'moment'

type SinglePaymentProps = {
    user: any,
    doneFunc: (value: string, status: string) => void,
    rejectFunc: (value: string, status: string) => void,
    value: {
        _id: string,
        status: string,
        amount: string | number,
        bankInformation: any,
        mobileInformation: any,
        createdAt: any
    },
}
export default function SinglePayment(props: SinglePaymentProps) {
    const { i18n, t } = useTranslation()
    const getStatus = () => {
        switch (props.value.status) {
            case "pending":
                return <Status title={t(props.value.status)} color="bg-orange-500" />
            case "done":
                return <Status title={t(props.value.status)} color="bg-green-500" />
            case "rejected":
                return <Status title={t(props.value.status)} color="bg-red-500" />
        }
    }
    return (
        <tr key={props.value._id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.bankInformation.recieverName || props.value.mobileInformation.recieverName}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.amount}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.mobileInformation.number ? props.value.mobileInformation.number : t('NA')}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.bankInformation.accountNumber ? props.value.bankInformation.accountNumber : t('NA')}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.bankInformation.bankName ? props.value.bankInformation.bankName : t('NA')}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{getStatus()}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{moment(props.value.createdAt).format('MMMM Do YYYY, h:mm A')}</div>
                </div>
            </td>
            <EditAndDelete rejectFunc={() => props.rejectFunc(props.value._id, 'rejected')} doneFunc={() => props.doneFunc(props.value._id, 'done')} route='/payments' hideDelete={true} hideEdit={true} showDonePayment={props.user.role === 'Admin' || props.user.role === 'Super Admin'} showRejectPayment={props.user.role === 'Admin' || props.user.role === 'Super Admin'} />
        </tr>

    )
}
