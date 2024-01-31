import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

type SelectedComponentByIdProps = {
    callbackValue: (arg0: any) => void,
    label: string,
    items: any,
    defaultValue: any,
    disabled?: boolean,
    customLabel?: string,
    errorMessage?: boolean,
    variant: any,
    ref?: any,
    newValue?: string,
    fullItem: boolean,
    required: boolean
}


export default function SelectedComponentById(props: SelectedComponentByIdProps) {
    const { i18n, t } = useTranslation()
    return (
        <FormControl fullWidth>
            {/* <label className="font-semibold text-gray-800 mb-1 block text-xs">{props.label}</label> */}
            <InputLabel style={{ fontSize: '14.5px' }} className='ltr:ml-4 rtl:mr-4 -mt-1 '>{props.required ? props.label : `${props.label} (${t('optional')})`}</InputLabel>
            <Select
                defaultValue={props.defaultValue}
                disabled={props.items.length == 0 ? true : props.disabled ? props.disabled : false}
                value={props.newValue}
                label={props.required ? props.label : `${props.label} ${t('optional')}`}
                onChange={(e) => {
                    props.callbackValue(e.target.value)
                }}
                error={props.errorMessage}
                variant={props.variant}
                ref={props.ref}
                required={props.required}
            >
                {props.items.map((item: any) => {
                    return (
                        <MenuItem value={props.fullItem ? item : item._id} key={item._id}><span className="capitalize text-sm">{i18n.language === "en" ? item.name : item.nameAr}</span> </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    );
}

SelectedComponentById.defaultProps = {
    variant: 'outlined',
    fullItem: false,
    required: true
}