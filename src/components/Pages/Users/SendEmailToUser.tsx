import React from 'react'
import Modal from '@mui/material/Modal';
import Input from '../../TextFields/Input';
import { useTranslation } from 'react-i18next';
import AuthButton from '../../Buttons/AuthButton';
type SendEmailToUserProps = {
    show: boolean,
    loading: boolean,
    errorMessage: string,
    handleClose: () => void
    sendMessage: () => void
    callbackMessage: (value: string) => void
}
export default function SendEmailToUser(props: SendEmailToUserProps) {
    const { t } = useTranslation()
    return (
        <div>
            <Modal
                open={props.show}
                onClose={props.handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <div className='bg-white flex flex-col justify-center gap-5 h-1/2 items-start top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute px-10 rounded-md md:w-3/4 w-96'>
                    <Input errorMessage={props.errorMessage} label={t('message')} inputValue={(value: any) => { props.callbackMessage(value) }} width='w-full' textarea={true} required={true} minRows={10} />
                    <AuthButton loginIcon={false} click={props.sendMessage} text={t('sendMessage')} loading={props.loading} />
                </div>
            </Modal>
        </div>
    )
}
