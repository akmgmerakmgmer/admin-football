import React, { useRef, useEffect, useState } from 'react'
import ApiLoading from '../Loadings/ApiLoading';
import { CSSTransition } from 'react-transition-group'
import { Checkbox } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SelectedComponent from './SelectComponent';
import { useSelector } from 'react-redux';
import ButtonLoading from '../Loadings/ButtonLoading'
import fileDownload from 'js-file-download';
import ApiLoadingNotFixed from '../Loadings/ApiLoadingNotFixed';
import axiosInstance from '../../utilities/axiosInstance';
type TableProps = {
    title: string,
    checkBoxItems: any[]
    tableHeads: string[],
    children: any,
    loading: boolean,
    checkAll?: any,
    reloadItems: () => void,
    deleteUrl?: string,
    showCheckbox: boolean
}
export default function Table(props: TableProps) {
    const { t } = useTranslation()
    const checkAll = useSelector((state: any) => state.checkAll)
    const user = useSelector((state: any) => state.user)
    const [actions, setActions] = useState(['deleteAll'])
    const [selectedValue, setSelectedValue] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const newActions = [...actions]
        if (window.location.href.includes('products') || window.location.href.includes('users')) {
            newActions.push('disable')
            newActions.push('enable')
        }
        if (user && (user.role === 'Admin' || user.role === 'Super Admin')) {
            newActions.push('exportAll')
        }
        setActions([...newActions])
    }, [])
    useEffect(() => {
    }, [checkAll])



    const apply = () => {
        setLoading(true)
        if (selectedValue === "deleteAll") {
            for (let i = 0; i < props.checkBoxItems.length; i++) {
                axiosInstance.delete(`${props.deleteUrl}/${props.checkBoxItems[i]._id}`).then(response => {

                }).finally(() => {
                    if (i === props.checkBoxItems.length - 1) {
                        setLoading(false)
                        props.reloadItems()
                    }
                })
            }
        } else if (selectedValue === 'exportAll') {
            axiosInstance.post('convert-all', { name: props.title }, { responseType: "blob" }).then(response => {
                fileDownload(response.data, `${props.title}.xlsx`)
            }).finally(() => {
                setLoading(false)
            })
        } else if (selectedValue === 'disable') {
            for (let i = 0; i < props.checkBoxItems.length; i++) {
                axiosInstance.put(`${props.deleteUrl}/${props.checkBoxItems[i]._id}`, { disabled: true }).then(response => {

                }).finally(() => {
                    if (i === props.checkBoxItems.length - 1) {
                        setLoading(false)
                        props.reloadItems()
                    }
                })
            }
        } else if (selectedValue === 'enable') {
            for (let i = 0; i < props.checkBoxItems.length; i++) {
                axiosInstance.put(`${props.deleteUrl}/${props.checkBoxItems[i]._id}`, { disabled: false }).then(response => {

                }).finally(() => {
                    if (i === props.checkBoxItems.length - 1) {
                        setLoading(false)
                        props.reloadItems()
                    }
                })
            }
        }
        else {
            axiosInstance.post('convert-to-excel', { data: props.checkBoxItems, name: props.title }, { responseType: "blob" }).then(response => {
                fileDownload(response.data, `${props.title}.xlsx`)
            }).finally(() => {
                setLoading(false)
            })
        }
    }
    return (
        <div>
            <ApiLoadingNotFixed loading={props.loading} />
            <CSSTransition
                in={!props.loading}
                timeout={300}
                classNames="default"
                unmountOnExit
            >
                <div className='w-full'>
                    <div className='text-center pb-3'>
                        <h1 className="text-lg border-b-4 border-primaryColor font-bold inline-block text-gray-800">{props.title}</h1>
                    </div>
                    <CSSTransition
                        in={props.checkBoxItems.length > 0}
                        timeout={300}
                        classNames="default"
                        unmountOnExit>
                        <div className='flex justify-between items-center mx-8'>
                            <div className='w-64 '>
                                <SelectedComponent uppercase={true} translation={true} label={t("bulkAction")} defaultValue={selectedValue} disabled={props.loading} items={actions} key={selectedValue} callbackValue={(value: string) => setSelectedValue(value)} />
                            </div>
                            <button className='bg-primaryColor text-white px-8 py-3 rounded-md' disabled={selectedValue === ''} onClick={apply}>{loading ? <ButtonLoading loading={loading} /> : t('apply')}</button>
                        </div>
                    </CSSTransition>
                    <div className="mt-5 flex flex-col w-full">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 px-3">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                                    <table className="min-w-full bg-gray-50 divide-y divide-gray-300">
                                        <thead className="w-full">
                                            <tr>
                                                {props.showCheckbox && <th scope="col" className="py-3.5 ltr:pl-4 rtl:pr-4 ltr:text-left rtl:text-right text-xs font-semibold text-gray-900 sm:pl-6 whitespace-nowrap">
                                                    <Checkbox color='primary' onChange={(e) => props.checkAll(e.target.checked)} />
                                                </th>}
                                                {props.tableHeads.map((head: string, index: number) => {
                                                    return (
                                                        <th key={index} scope="col" className="py-3.5 ltr:pl-4 rtl:pr-4 ltr:text-left rtl:text-right text-xs font-semibold text-gray-900 sm:pl-6 whitespace-nowrap">
                                                            {head}
                                                        </th>
                                                    )
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white pr-2">
                                            {props.children}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

Table.defaultProps = {
    checkBoxItems: [],
    reloadItems: () => { },
    showCheckbox: true
}