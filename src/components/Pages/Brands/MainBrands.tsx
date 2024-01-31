import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Table from '../../GeneralComponents/Table'
import EmptyProduct from '../Cart/EmptyProduct'
import SingleBrand from './SingleBrand'
import AlertComponent from '../../GeneralComponents/Alert'
import { Pagination } from '@mui/material'
import axiosInstance from '../../../utilities/axiosInstance'

export default function MainBrands() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [brands, setBrands] = useState([])
    const tableHeads = [t("name"), t("category"), t("subcategory")]
    const [checkBoxItems, setCheckBoxItems] = useState([])
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const pageNumber = useRef(1)
    useEffect(() => {
        getBrands()
    }, [])

    const getBrands = () => {
        setLoading(true)
        axiosInstance.get(`brands?page=${pageNumber.current}`).then(response => {
            setBrands(response.data.brand)
            setTotalItems(response.data.total_brands)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
            setCheckBoxItems([])
        })
    }
    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getBrands()
    };
    const deleteBrand = (id: string) => {
        pageNumber.current = 1
        setLoading(true)
        axiosInstance.delete(`/brands/${id}`).then(response => {
            getBrands()
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
            setCheckBoxItems([...brands])
        } else {
            setCheckBoxItems([])
        }
    }
    return (
        <div>
            {brands.length === 0 && !loading ?
                <EmptyProduct text={t('noBrandsAvailable')} />
                : <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='brands' reloadItems={getBrands} title={t("brands")} tableHeads={tableHeads} loading={loading}>
                    {brands.map((brand: any) => (
                        <SingleBrand checkBoxItems={checkBoxItems} value={brand} deleteFunc={deleteBrand} />
                    ))}
                </Table>}
            <div className={`mt-7 ${loading ? "opacity-0 cursor-default" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
            <AlertComponent error={true} open={showErrorMessage} message={t('cannot_delete_brand_attached_to_product')} />
        </div>
    )
}
