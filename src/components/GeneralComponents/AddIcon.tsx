import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Fab } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import AlertComponent from './Alert';
import { useTranslation } from 'react-i18next';

type AddIconComponentProps = {
    route: string
}
export default function AddIconComponent(props: AddIconComponentProps) {
    const navigate = useNavigate()
    const [verifyError, setVerifyError] = useState(false)
    const { t } = useTranslation()

    const navigateToRoute = () => {
        navigate(props.route)
    }
    return (
        <>
            <div className='fixed bottom-5 ltr:right-5 rtl:left-5 z-30'>
                <div onClick={navigateToRoute}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </div>
            </div>
            <AlertComponent message={t('verifiedError')} open={verifyError} error={true} />
        </>
    )
}
