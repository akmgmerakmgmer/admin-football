import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

type SelectedComponentProps = {
    callbackValue: (arg0: any) => void,
    label: string,
    items: any,
    defaultValue?: any,
    disabled?: boolean,
    customLabel?: string,
    errorMessage?: boolean,
    variant: any,
    ref?: any,
    newValue?: string,
    translation: boolean,
    required: boolean,
    uppercase: boolean
}


export default function SelectedComponent(props: SelectedComponentProps) {
    const { t, i18n } = useTranslation()
    const itemSelected = React.useRef(false)
    return (
        <FormControl fullWidth>
            {/* <label className="font-semibold text-gray-800 mb-1 block text-xs">{props.label}</label> */}
            <InputLabel style={{ fontSize: '14.5px' }} className='ltr:ml-4 rtl:mr-4 -mt-1 '>{`${props.label}${!props.required ? ` (${t('optional')})` : ''}`}</InputLabel>
            <Select
                defaultValue={props.defaultValue}
                disabled={props.disabled ? props.disabled : false}
                value={props.newValue}
                label={`${props.label}${!props.required ? ` (${t('optional')})` : ''}`}
                onChange={(e) => {
                    itemSelected.current = true
                    props.callbackValue(e.target.value)
                }}
                error={props.errorMessage}
                variant={props.variant}
                ref={props.ref}
                required={props.required}
            >
                {props.items.map((item: string) => {
                    return (
                        <MenuItem value={item} key={item}><span className="capitalize text-sm">{props.uppercase ? t(item) : props.translation ? t(item.toLowerCase()) : item}</span> </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    );
}

SelectedComponent.defaultProps = {
    variant: 'outlined',
    translation: false,
    uppercase: false,
    required: true
}