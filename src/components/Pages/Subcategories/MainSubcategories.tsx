import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Table from '../../GeneralComponents/Table'
import EmptyProduct from '../Cart/EmptyProduct'
import SingleSubcategory from './SingleSubcategory'
import AlertComponent from '../../GeneralComponents/Alert'
import { Pagination } from '@mui/material'
import axiosInstance from '../../../utilities/axiosInstance'

export default function MainSubategories() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [subcategories, setSubcategories] = useState([])
    const tableHeads = [t("name"), t("category")]
    const [checkBoxItems, setCheckBoxItems] = useState([])
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const pageNumber = useRef(1)
    useEffect(() => {
        getSubcategories()
    }, [])

    const getSubcategories = () => {
        setLoading(true)
        axiosInstance.get(`subcategories?page=${pageNumber.current}`).then(response => {
            setSubcategories(response.data.subcategory)
            setTotalItems(response.data.total_subcategories)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
            setCheckBoxItems([])
        })
    }
    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getSubcategories()
    };

    const deleteSubcategory = (id: string) => {
        setLoading(true)
        axiosInstance.delete(`/subcategories/${id}`).then(response => {
            getSubcategories()
        }).catch(err => {
            setLoading(false)
            setShowErrorMessage(true)
            setErrorMessage(err.response.data.message)
            setTimeout(() => {
                setShowErrorMessage(false)
            }, 5000)
        })
    }

    const checkAllItems = (e: any) => {
        if (e === true) {
            setCheckBoxItems([...subcategories])
        } else {
            setCheckBoxItems([])
        }
    }
    return (
        <div>
            {subcategories.length === 0 && !loading ?
                <EmptyProduct text={t('noSubcategoriesAvailable')} />
                : <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='subcategories' reloadItems={getSubcategories} title={t("subcategories")} tableHeads={tableHeads} loading={loading}>
                    {subcategories.map((subcategory: any) => (
                        <SingleSubcategory checkBoxItems={checkBoxItems} value={subcategory} deleteFunc={deleteSubcategory} />
                    ))}
                </Table>}
            <div className={`mt-7 ${loading ? "opacity-0 cursor-default" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
            <AlertComponent error={true} open={showErrorMessage} message={t(errorMessage)} />
        </div>
    )
}
