import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pagination } from '@mui/material'
import Table from '../../GeneralComponents/Table'
import SingleTransaction from './SingleTransaction'
import EmptyProduct from '../Cart/EmptyProduct'
import axiosInstance from '../../../utilities/axiosInstance'
import SelectedComponent from '../../GeneralComponents/SelectComponent'

export default function MainTransactions() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [transactions, setTransactions] = useState([])
    const pageNumber = useRef(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const tableHeads = [t("username"), t('number'), t('itemBought'), t('quantity'), t('isPaid')]
    const [checkBoxItems, setCheckBoxItems] = useState([])
    const isPaid = useRef<any>('all')
    const isPaidOptions = ['all', 'true', 'false']
    useEffect(() => {
        getTransactions()
    }, [])

    const getTransactions = () => {
        setLoading(true)
        axiosInstance.get(`/transactions?isPaid=${isPaid.current}`).then(response => {
            setTransactions(response.data.transactions)
            setTotalItems(response.data.total_avatars)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
            setCheckBoxItems([])
        })
    }

    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getTransactions()
    };
    const checkAllItems = (e: any) => {
        if (e === true) {
            setCheckBoxItems([...transactions])
        } else {
            setCheckBoxItems([])
        }
    }

    const chooseIsPaid = (value: string) => {
        if (value === 'all') {
            isPaid.current = value
        } else {
            isPaid.current = Boolean(value)
        }
        getTransactions()
    }

    return (
        <div>
            <div className='mb-5 flex md:flex-row flex-col gap-5 md:mx-10 mx-5 items-center justify-center'>
                <SelectedComponent translation disabled={loading} defaultValue={"all"} label={t('isPaid')} items={isPaidOptions} callbackValue={(value) => chooseIsPaid(value)} />
                <button className='px-10 h-12 md:w-auto w-full bg-gradient text-sm text-white rounded-md' onClick={() => {
                    pageNumber.current = 1
                    getTransactions()
                }} disabled={loading}>{t("search")}</button>
            </div>
            {transactions.length === 0 && !loading ?
                <EmptyProduct text={t('noTransactionsAvailable')} />
                : <div className='overflow-y-hidden overflow-x-scroll'>
                    <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='transactions' reloadItems={getTransactions} title={t("transactions")} tableHeads={tableHeads} loading={loading}>
                        {transactions.map((transaction: any, index: any) => (
                            <SingleTransaction checkBoxItems={checkBoxItems} value={transaction} key={index} />
                        ))}
                    </Table>
                </div>}
            <div className={`mt-7 transition-all ${loading ? "opacity-0" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
        </div>
    )
}
