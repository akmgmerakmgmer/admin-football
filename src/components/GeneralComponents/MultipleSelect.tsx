import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

type MultipleSelectProps = {
    title: string
    items: any,
    callbackValue: (arg0: any) => void,
    value: any,
    disabled?: boolean,
    errorMessage?: boolean,
    defaultValue?: any
}

export default function MultipleSelect(props: MultipleSelectProps) {
    const { i18n } = useTranslation()
    const getSelectedNames = () => {
        return props.items.filter((item: any) => props.value.indexOf(item._id) > -1)
            .map((item: any) => i18n.language === 'en' ? item.name : item.nameAr)
            .join(", ");
    };

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel dir='rtl' style={{ fontSize: '14.5px',direction:'rtl' }} className='ltr:ml-4 rtl:mr-4 -mt-1 '>{props.title}</InputLabel>
                <Select
                    multiple
                    value={props.value || []}
                    onChange={(event: any) => props.callbackValue(event.target.value)}
                    renderValue={getSelectedNames}
                    MenuProps={MenuProps}
                    disabled={props.disabled}
                    error={props.errorMessage}
                    defaultValue={props.defaultValue}
                    label={props.title}
                    variant='outlined'
                >
                    {props.items.map((item: any) => (
                        <MenuItem key={item._id} value={item._id}>
                            <Checkbox size='small' checked={props.value.indexOf(item._id) > -1} />
                            <ListItemText primary={<span className='text-sm'>{i18n.language === 'en' ? item.name : item.nameAr}</span>} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}