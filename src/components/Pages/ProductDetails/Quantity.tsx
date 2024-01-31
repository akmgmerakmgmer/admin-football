import React from 'react'
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

type QuantityProps = {
    quantityValue: any,
    quantity: number,
    error:string
}
export default function Quantity(props: QuantityProps) {
    const { t } = useTranslation()
    return (
        <div className='w-full'>
            <TextField
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                label={t('quantity')}
                variant="outlined"
                type="number"
                onChange={(e) => props.quantityValue(e.target.value)}
                value={props.quantity}
                fullWidth
                error={props.error.length>0&&props.error!=undefined}
                helperText={props.error}
            />
        </div>
    )
}
