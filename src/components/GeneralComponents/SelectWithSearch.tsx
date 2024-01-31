import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { BooleanLiteral } from 'typescript'

type SelectWithSearchProps = {
    options:[],
    label:string,
    disabled:boolean,
    inputValue: any,
}
export default function SelectWithSearch(props:SelectWithSearchProps) {
    return (
        <div className='w-full mt-5'>
            <label className="font-semibold text-gray-800 mb-1 block text-xs">{props.label}</label>
            <Autocomplete
                disablePortal
                className='capitalize'
                id="combo-box-demo"
                options={props.options}
                fullWidth
                disabled={props.disabled}
                value={props.inputValue}
                onChange={(e: any, newValue: string | null) => props.inputValue(newValue)}
                renderInput={(params) => <TextField {...params} label="" />}
            />
        </div>
    )
}
