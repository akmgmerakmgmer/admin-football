import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pagination } from '@mui/material'
import Table from '../../GeneralComponents/Table'
import SingleShopItem from './SingleShopItem'
import EmptyProduct from '../Cart/EmptyProduct'
import Input from '../../TextFields/Input'
import axiosInstance from '../../../utilities/axiosInstance'

export default function MainShopItem() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [shopItems, setShopItems] = useState([])
    const pageNumber = useRef(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const tableHeads = [t("image"), t("englishName"), t('arabicName'), t('price'), t('type')]
    const [checkBoxItems, setCheckBoxItems] = useState([])
    const companySearch = useRef('')
    useEffect(() => {
        getShopItems()
    }, [])

    const getShopItems = () => {
        setLoading(true)
        axiosInstance.get(`admin-shopItems?page=${pageNumber.current}`).then(response => {
            setShopItems(response.data.shopItems)
            setTotalItems(response.data.total_shopItems)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
            setCheckBoxItems([])
        })
    }

    const deleteShopItem = (id: string) => {
        setLoading(true)
        axiosInstance.delete(`/shopItems/${id}`).then(response => {
            getShopItems()
        })
    }

    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getShopItems()
    };
    const checkAllItems = (e: any) => {
        if (e === true) {
            setCheckBoxItems([...shopItems])
        } else {
            setCheckBoxItems([])
        }
    }
    return (
        <div>
            {/* <div className='mb-5 flex md:flex-row flex-col gap-5 md:mx-10 mx-5 items-center justify-center'>
                <Input label={t('companyName')} required={false} inputValue={(value: string) => companySearch.current = value} width="w-full mt-0" disabled={loading} />
                <button className='px-10 h-12 md:w-auto w-full bg-gradient text-sm text-white rounded-md' onClick={() => {
                    pageNumber.current = 1
                    getShopItems()
                }} disabled={loading}>{t("search")}</button>
            </div> */}
            {shopItems.length === 0 && !loading ?
                <EmptyProduct text={t('noShopItemsAvailable')} />
                : <div className='overflow-y-hidden overflow-x-scroll'>
                    <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='shopItems' reloadItems={getShopItems} title={t("shopItems")} tableHeads={tableHeads} loading={loading}>
                        {shopItems.map((shopItem: any, index: any) => (
                            <SingleShopItem checkBoxItems={checkBoxItems} value={shopItem} deleteFunc={deleteShopItem} key={index} />
                        ))}
                    </Table>
                </div>}
            <div className={`mt-7 transition-all ${loading ? "opacity-0" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
        </div>
    )
}
