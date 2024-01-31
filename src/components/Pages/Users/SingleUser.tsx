import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import EditAndDelete from '../../GeneralComponents/EditAndDelete'
import SingleCheckboxes from '../../GeneralComponents/SingleCheckboxes'
import moment from 'moment'
import Status from '../../GeneralComponents/Status'
import { useTranslation } from 'react-i18next'
import axiosInstance from '../../../utilities/axiosInstance'
type SingleSubcategoryProps = {
    checkBoxItems: any[],
    value: {
        _id: string,
        username: string,
        number: string,
        createdAt: string,
        points: number,
        coins: number,
        disabled: boolean,
        roles: [string]
    },
    deleteFunc: (id: string) => void,
    disableFunc: (id: string) => void,
    enableFunc: (id: string) => void
}
export default function SingleUser(props: SingleSubcategoryProps) {
    const user = useSelector((state: any) => state.user)
    const { t } = useTranslation()
    const [message, setMessage] = useState('')
    const [showEmailPopUp, setShowEmailPopUp] = useState(false)
    const [emailLoading, setEmailLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
    // const sendMessage = () => {
    //     if (message === '') {
    //         setEmailError('field_required')
    //         return
    //     }
    //     setEmailLoading(true)
    //     setEmailError('')
    //     const payload = {
    //         email: props.value.email,
    //         username: props.value.username,
    //         message: message
    //     }
    //     axiosInstance.post('/send-email-to-user', payload).then(response => {
    //         setShowEmailPopUp(false)
    //         setEmailLoading(false)
    //     })
    // }
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
                    <div className="font-medium text-gray-900 capitalize">{props.value.roles.join(', ')}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.points}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.coins}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.disabled ? <Status title={t('disabled')} color='bg-red-500' /> : <Status title={t('active')} color='bg-green-500' />}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{moment(props.value.createdAt).format('MMMM Do YYYY, h:mm A')}</div>
                </div>
            </td>
            {/* <EditAndDelete emailError={t(emailError)} emailLoading={emailLoading} showEmailPopup={showEmailPopUp} handleClose={() => setShowEmailPopUp(false)} handleOpen={() => setShowEmailPopUp(true)} callbackMessage={(value) => setMessage(value)} sendMessage={sendMessage} emailIcon={true} route={props.value._id === user?._id ? `/edit-admin-user/${props.value._id}` : `/edit-user/${props.value._id}`} deleteFunc={() => props.deleteFunc(props.value._id)} disableFunc={() => props.disableFunc(props.value._id)} enableFunc={() => props.enableFunc(props.value._id)} hideEdit={user.role !== "Super Admin"} showDisable={!props.value.disabled} showEnable={props.value.disabled} /> */}
        </tr>

    )
}
