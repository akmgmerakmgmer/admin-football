import React from 'react'
import Modal from '@mui/material/Modal';
import Input from '../../TextFields/Input';
import { useTranslation } from 'react-i18next';
import AuthButton from '../../Buttons/AuthButton';
import { Person } from '@material-ui/icons';
type ShowCommentsProps = {
    show: boolean,
    loading: boolean,
    errorMessage: string,
    comments: []
    handleClose: () => void
    sendMessage: () => void
    callbackMessage: (value: string) => void
}
export default function ShowComments(props: ShowCommentsProps) {
    const { t } = useTranslation()
    return (
        <div>
            <Modal
                open={props.show}
                onClose={props.handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <div className='bg-white min-h-1/2 py-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute px-10 rounded-md md:w-3/4 w-96'>
                    <div className='flex flex-col gap-3'>
                        {props.comments.map((comment: any) => {
                            return (
                                <div className='flex gap-2 items-center bg-blue-600 p-3 rounded-md text-white'>
                                    <div className="bg-blue-400 rounded-md  w-10 h-10 shadow-md flex items-center justify-center font-semibold">
                                        <span className='uppercase text-white'>{comment.user.username[0]}{comment.user.username[1]}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className=" text-xs font-semibold">{comment.user.email}</span>
                                        <span className=' font-semibold'>{comment.comment}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='flex flex-col justify-center gap-3 items-start'>
                        <Input errorMessage={props.errorMessage} label={t('message')} inputValue={(value: any) => { props.callbackMessage(value) }} width='w-full' required={true} />
                        <AuthButton loginIcon={false} click={props.sendMessage} text={t('addComment')} loading={props.loading} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
