import React, { useState } from 'react'
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useTranslation } from 'react-i18next';
type DynamicSelectProps = {
    items: any,
    label: string,
    value?: string,
    selectCallback: (value: any) => void,
}
export default function DynamicSelect(props: DynamicSelectProps) {
    const { i18n } = useTranslation()
    return (
        <div className='w-full mt-5'>
            <FormControl sx={{ width: '100% ' }}>
                <InputLabel id="demo-multiple-chip-label">{props.label}</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    onChange={(e) => {
                        props.selectCallback(e.target.value)
                    }}
                    value={props.items.filter((item: any) => item._id == props.value)[0]}
                    input={<OutlinedInput id="select-multiple-chip" label={props.label} />}
                    renderValue={(selected: any) => {
                        return (
                            <div>
                                {selected.title ? <span>{i18n.language === 'ar' ? selected.title.ar : selected.title.en}</span> :
                                    <img src={selected.image} className='object-cover w-11 rounded-full' />}
                            </div>
                        )
                    }}
                >
                    {props.items.map((item: any) => (
                        <MenuItem
                            key={item._id}
                            value={item}
                        >
                            <div className='flex gap-1 items-center'>
                                <img src={item.image} className='object-cover w-11 rounded-full' />
                                {item.title && <span>{i18n.language === 'ar' ? item.title.ar : item.title.en}</span>}
                            </div>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}