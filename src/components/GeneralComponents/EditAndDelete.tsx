import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import AreYouSureModal from './AreYouSureModal'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Tooltip } from '@material-ui/core'
import SendEmailToUser from '../Pages/Users/SendEmailToUser';
import { Comment } from '@material-ui/icons';
import ShowComments from '../Pages/Orders/ShowComments';
type EditAndDeleteProps = {
    route: string,
    hideEdit?: boolean,
    hideDelete?: boolean,
    showEnable: boolean,
    showDisable: boolean,
    showDonePayment: boolean,
    showRejectPayment: boolean,
    emailIcon: boolean,
    showComments: boolean,
    showEmailPopup: boolean,
    showCommentsPopup: boolean,
    emailLoading: boolean,
    commentsLoading: boolean,
    deleteFunc: () => void,
    enableFunc: () => void
    doneFunc: () => void,
    rejectFunc: () => void,
    disableFunc: () => void,
    sendMessage: () => void,
    addComment: () => void,
    handleClose: () => void,
    handleOpen: () => void,
    handleCommentsClose: () => void,
    handleCommentsOpen: () => void,
    openComments: () => void,
    callbackMessage: (value: string) => void,
    callbackComment: (value: string) => void,
    emailError: string,
    commentsError: string,
    detailsText: string,
    comments: []
}
export default function EditAndDelete(props: EditAndDeleteProps) {
    const { t } = useTranslation()
    const [showModal, setShowModal] = useState(false)
    const [showEnableModal, setShowEnableModal] = useState(false)
    const [showDisableModal, setShowDisableModal] = useState(false)
    const [showDonePaymentModal, setShowDonePaymentModal] = useState(false)
    const [showRejectPaymentModal, setShowRejectPaymentModal] = useState(false)
    return (
        <>
            <td className="flex items-center justify-end mt-2.5 gap-1.5 whitespace-nowrap py-4 ltr:pl-3 rtl:pr-3 ltr:pr-4 rtl:pl-4 ltr:text-right rtl:text-left text-xs font-medium sm:pr-6">
                {props.showDisable && <button className='relative'>
                    <span className='text-red-900 bg-red-100 hover:bg-red-300 py-2 px-5 rounded-full text-xxs font-semibold transition-all' onClick={() => setShowDisableModal(true)}>{t("disable")}</span>
                    <AreYouSureModal text={t('areYouSureDisable')} deleteItem={() => {
                        setShowDisableModal(false)
                        props.disableFunc()
                    }} hideModal={() => setShowDisableModal(false)} show={showDisableModal} disable={true} />
                </button>}
                {props.showEnable && <button className='relative'>
                    <span className='text-white bg-orange-500 py-2 px-5 rounded-full text-xxs font-semibold transition-all hover:bg-orange-600' onClick={() => setShowEnableModal(true)}>{t("enable")}</span>
                    <AreYouSureModal text={t('areYouSureEdit')} deleteItem={() => {
                        setShowEnableModal(false)
                        props.enableFunc()
                    }} hideModal={() => setShowEnableModal(false)} show={showEnableModal} enable={true} />
                </button>}
                {!props.hideEdit && <Link to={props.route} >
                    <span className="text-indigo-900 bg-indigo-100 text-xxs py-2 px-5 rounded-full font-semibold transition-all hover:bg-indigo-300">{t(props.detailsText)}</span>
                </Link>}
                {!props.hideDelete && <button className='relative'>
                    <span className='text-red-900 bg-red-100 py-2 px-5 rounded-full text-xxs font-semibold transition-all hover:bg-red-300' onClick={() => setShowModal(true)}>{t("delete")}</span>
                    <AreYouSureModal text={t('areYouSure')} deleteItem={() => {
                        setShowModal(false)
                        props.deleteFunc()
                    }} hideModal={() => setShowModal(false)} show={showModal} />
                </button>}
                {props.emailIcon && <div>
                    <Tooltip title={t('sendEmail')}>
                        <button className='bg-primaryColor rounded-full text-white p-1.5' onClick={props.handleOpen}>
                            <AppRegistrationIcon color='inherit' fontSize='small' />
                        </button>
                    </Tooltip>
                    <SendEmailToUser errorMessage={props.emailError} loading={props.emailLoading} show={props.showEmailPopup} handleClose={props.handleClose} callbackMessage={(value) => props.callbackMessage(value)} sendMessage={props.sendMessage} />
                </div>}
                {props.showComments && <div>
                    <div className='relative'>
                        <Tooltip title={t('showComments')}>
                            <button onClick={props.handleCommentsOpen}>
                                <Comment color='primary' fontSize='small' />
                            </button>
                        </Tooltip>
                        {props.comments.length ? <div className="absolute z-50 w-4 h-4 rounded-full -top-2 -left-2 bg-red-500 flex items-center justify-center"><span className='text-white font-semibold text-xxxs'>{props.comments.length}</span></div> : <></>}
                        <ShowComments comments={props.comments} errorMessage={props.commentsError} loading={props.commentsLoading} show={props.showCommentsPopup} handleClose={props.handleCommentsClose} callbackMessage={(value) => props.callbackComment(value)} sendMessage={props.addComment} />
                    </div>
                </div>}
                {props.showDonePayment &&
                    <button className='relative'>
                        <span className='text-green-900 capitalize bg-green-100 py-2 px-5 rounded-full text-xxs font-semibold transition-all hover:bg-green-200' onClick={() => setShowDonePaymentModal(true)}>{t("changeStatusToDone")}</span>
                        <AreYouSureModal text={t('areYouSureStatusDone')} deleteItem={() => {
                            setShowDonePaymentModal(false)
                            props.doneFunc()
                        }} hideModal={() => setShowDonePaymentModal(false)} show={showDonePaymentModal} />
                    </button>
                }
                {props.showRejectPayment &&
                    <button className='relative'>
                        <span className='text-red-900 capitalize bg-red-100 py-2 px-5 rounded-full text-xxs font-semibold transition-all hover:bg-red-300' onClick={() => setShowRejectPaymentModal(true)}>{t("changeStatusToReject")}</span>
                        <AreYouSureModal text={t('areYouSureStatusReject')} deleteItem={() => {
                            setShowRejectPaymentModal(false)
                            props.rejectFunc()
                        }} hideModal={() => setShowRejectPaymentModal(false)} show={showRejectPaymentModal} />
                    </button>
                }
            </td>
        </>
    )
}
EditAndDelete.defaultProps = {
    enableFunc: () => { },
    disableFunc: () => { },
    doneFunc: () => { },
    rejectFunc: () => { },
    deleteFunc: () => { },
    sendMessage: () => { },
    addComment: () => { },
    handleClose: () => { },
    handleOpen: () => { },
    handleCommentsClose: () => { },
    handleCommentsOpen: () => { },
    openComments: () => { },
    callbackMessage: (value: any) => { },
    callbackComment: (value: any) => { },
    showEnable: false,
    showDisable: false,
    showDonePayment: false,
    showRejectPayment: false,
    emailIcon: false,
    showComments: false,
    showEmailPopup: false,
    showCommentsPopup: false,
    emailLoading: false,
    commentsLoading: false,
    emailError: '',
    commentsError: '',
    detailsText: 'edit',
    comments: []
}
