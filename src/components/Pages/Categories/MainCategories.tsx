import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchCategoriesDone } from '../../../redux/user'
import Table from '../../GeneralComponents/Table'
import EmptyProduct from '../Cart/EmptyProduct'
import SingleCategory from './SingleCategory'
import AlertComponent from '../../GeneralComponents/Alert'
import { Pagination } from '@mui/material'
import axiosInstance from '../../../utilities/axiosInstance'

export default function MainCategories() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const tableHeads = [t("name")]
    const [checkBoxItems, setCheckBoxItems] = useState([])
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const pageNumber = useRef(1)
    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = () => {
        setLoading(true)
        axiosInstance.get(`categories?page=${pageNumber.current}`).then(response => {
            setCategories(response.data.category)
            setTotalItems(response.data.total_categories)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
            setCheckBoxItems([])
        })
    }
    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getCategories()
    };
    const deleteCategory = (id: string) => {
        setLoading(true)
        axiosInstance.delete(`/categories/${id}`).then(response => {
            getCategories()
        }).catch(err => {
            setLoading(false)
            setShowErrorMessage(true)
            setTimeout(() => {
                setShowErrorMessage(false)
            }, 5000)
        })
    }

    const checkAllItems = (e: any) => {
        if (e === true) {
            setCheckBoxItems([...categories])
        } else {
            setCheckBoxItems([])
        }
    }
    return (
        <div>
            {categories.length === 0 && !loading ?
                <EmptyProduct text={t('noCategoriesAvailable')} />
                : <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='categories' reloadItems={getCategories} title={t("categories")} tableHeads={tableHeads} loading={loading}>
                    {categories.map((category: any) => (
                        <SingleCategory checkBoxItems={checkBoxItems} value={category} deleteFunc={deleteCategory} />
                    ))}
                </Table>}
            <div className={`mt-7 ${loading ? "opacity-0 cursor-default" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
            <AlertComponent error={true} open={showErrorMessage} message={t("cannot_delete_category_attached_to_subcategory")} />
        </div>
    )
}
