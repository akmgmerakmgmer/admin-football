import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material';
import React from 'react'
import MainLoader from '../Loadings/MainLoader';
type authButtonProps = {
    text: string,
    bgColor: string,
    width?: string,
    additionalClasses?: string,
    loading?: boolean,
    click: any,
    loginIcon: boolean
}
export default function AuthButton(props: authButtonProps) {
    return (
        <div className={`${props.width} ${props.additionalClasses}`}>
            <Button variant="contained" color="primary" fullWidth disabled={props.loading} onClick={props.click}>
                {props.loading ? <MainLoader loading={props.loading} /> : <div className='flex gap-1.5'><span className='text-white'>{props.text}</span>{props.loginIcon && <LoginIcon color="secondary" />}</div>}
            </Button>
        </div>
    )
}

AuthButton.defaultProps = {
    bgColor: "primary",
    loading: false,
    loginIcon: true
}
