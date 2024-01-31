import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Table from '../../GeneralComponents/Table'
import EmptyProduct from '../Cart/EmptyProduct'
import { Pagination } from '@mui/material'
import axiosInstance from '../../../utilities/axiosInstance'
import SinglePayment from './SinglePayment'
import { useSelector } from 'react-redux'
import SelectedComponent from '../../GeneralComponents/SelectComponent'

export default function MainPayment() {
    const { t } = useTranslation()
    const user = useSelector((state: any) => state.user)
    const [loading, setLoading] = useState(true)
    const [payments, setPayments] = useState([])
    const tableHeads = [t('recieverName'), t('amount'), t('number'), t('accountNumber'), t('bankName'), t("status"), t('datePlaced')]
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const pageNumber = useRef(1)
    const statuses = ["pending", "done", "rejected"]
    const status = useRef('')
    useEffect(() => {
        getPayments()
    }, [])

    const getPayments = () => {
        setLoading(true)
        axiosInstance.get(`payments?page=${pageNumber.current}&status=${status.current ? status.current : ''}${user.role === 'Affiliate' ? `&affiliateUser=${user._id}` : ''}`).then(response => {
            setPayments(response.data.payments)
            setTotalItems(response.data.total_payments)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
        })
    }
    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getPayments()
    };

    const changeStatus = (value: string, status: string) => {
        setLoading(true)
        axiosInstance.put(`update-payment/${value}`, { status: status }).then(response => {
            getPayments()
        })
    }
    const filterStatus = (value: string) => {
        status.current = value
        getPayments()
    }
    return (
        <div>
            <div className='mb-5 flex md:flex-row flex-col gap-5 md:mx-10 mx-5 items-center justify-center '>
                <SelectedComponent uppercase={true} translation={true} label={t("status")} disabled={loading} items={statuses} callbackValue={filterStatus} />
                <button className='px-10 h-12 md:w-auto w-full bg-gradient text-sm text-white rounded-md' onClick={getPayments} disabled={loading}>{t("search")}</button>
            </div>
            {payments.length === 0 && !loading ?
                <EmptyProduct text={t('noWithdrawals')} />
                : <Table showCheckbox={false} title={t("withdrawals")} tableHeads={tableHeads} loading={loading}>
                    {payments.map((payment: any) => (
                        <SinglePayment rejectFunc={changeStatus} doneFunc={changeStatus} user={user} key={payment._id} value={payment} />
                    ))}
                </Table>}
            <div className={`mt-7 ${loading ? "opacity-0 cursor-default" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
        </div>
    )
}
