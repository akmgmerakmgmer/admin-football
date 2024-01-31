import React, { useState } from 'react'
import { Checkbox } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { checkAllFunc } from '../../redux/user'

type SingleCheckboxesProps = {
    checkBoxItems: any[]
    value: any,
}
export default function SingleCheckboxes(props: SingleCheckboxesProps) {
    const checkAll = useSelector((state: any) => state.checkAll)
    const [currentCheck, setCurrentCheck] = useState(null)
    const dispatch = useDispatch()
    const checkData = (e: any) => {
        setCurrentCheck(e.target.checked)
        const index = props.checkBoxItems.indexOf(props.value)
        if (e.target.checked === true) {
            if (index == -1) {
                props.checkBoxItems.push(props.value)
            }
        } else {
            if (index != -1) {
                props.checkBoxItems.splice(index, 1)
            }
        }
        dispatch(checkAllFunc(!checkAll))
    }
    const checkedValue = () => {
        for (let i = 0; i < props.checkBoxItems.length; i++) {
            if (props.checkBoxItems[i]._id === props.value._id) {
                return true
            }
        }
        return false
    }
    return (
        <>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs">
                <Checkbox color='primary' onChange={checkData} checked={checkedValue()} />
            </td>
        </>
    )
}

SingleCheckboxes.defaultProps = {
    checked: false
}