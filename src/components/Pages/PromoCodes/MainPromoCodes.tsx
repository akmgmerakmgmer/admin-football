import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pagination } from '@mui/material'
import Table from '../../GeneralComponents/Table'
import EmptyProduct from '../Cart/EmptyProduct'
import SingleCode from './SingleCode'
import axiosInstance from '../../../utilities/axiosInstance'

export default function MainPromoCodes() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [codes, setCodes] = useState([])
    const pageNumber = useRef(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const tableHeads = [t("code"), t("discount"), t("oneTimeUsage"), t("maxDiscount"), t("minimumOrder"),t('productCoupon')]
    const [checkBoxItems, setCheckBoxItems] = useState([])
    useEffect(() => {
        getCodes()
    }, [])

    const getCodes = () => {
        setLoading(true)
        axiosInstance.get(`promo-codes?page=${pageNumber.current}`).then(response => {
            setCodes(response.data.codes)
            setTotalItems(response.data.total_codes)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
            setCheckBoxItems([])
        })
    }

    const deleteUser = (id: string) => {
        setLoading(true)
        axiosInstance.delete(`/promo-code/${id}`).then(response => {
            getCodes()
        })
    }

    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getCodes()
    };
    const checkAllItems = (e: any) => {
        if (e === true) {
            setCheckBoxItems([...codes])
        } else {
            setCheckBoxItems([])
        }
    }
    return (
        <div>
            {codes.length === 0 && !loading ?
                <EmptyProduct text={t('noCodesAvailable')} />
                : <div className='overflow-y-hidden overflow-x-scroll'>
                    <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='promo-code' reloadItems={getCodes} title={t("promoCodes")} tableHeads={tableHeads} loading={loading}>
                        {codes.map((order: any, index: any) => (
                            <SingleCode checkBoxItems={checkBoxItems} value={order} deleteFunc={deleteUser} key={index} />
                        ))}
                    </Table>
                </div>}
            <div className={`mt-7 transition-all ${loading ? "opacity-0" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
        </div>
    )
}
