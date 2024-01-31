import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type AlertComponentProps = {
    open: boolean,
    message: string,
    error: boolean
}
export default function AlertComponent(props: AlertComponentProps) {
    return (
        <Snackbar open={props.open} autoHideDuration={6000}>
            <Alert severity={props.error ? 'error' : 'success'} sx={{ width: '100%' }} dir="ltr">
                {props.message}
            </Alert>
        </Snackbar>
    )
}

AlertComponent.defaultProps = {
    error: false
}
