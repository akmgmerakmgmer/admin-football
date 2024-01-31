import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pagination } from '@mui/material'
import Table from '../../GeneralComponents/Table'
import SingleOrder from './SingleOrder'
import SelectedComponent from '../../GeneralComponents/SelectComponent'
import EmptyProduct from '../Cart/EmptyProduct'
import Input from '../../TextFields/Input'
import { useSelector } from 'react-redux'
import axiosInstance from '../../../utilities/axiosInstance'
import { useNavigate } from 'react-router-dom'

export default function MainOrders() {
    const { t } = useTranslation()
    const user = useSelector((state: any) => state.user)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])
    const pageNumber = useRef(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const tableAdminHeads = [t("name"), t("number"), t("orderTotal"), t("detailedAddress"), t('sellerEmail'), t("status"), t('affiliateOrder'), t("datePlaced")]
    const tableHeads = [t("name"), t("number"), t("orderTotal"), t("detailedAddress"), t('sellerEmail'), t("status"), t("datePlaced")]
    const tableHeadsAffiliate = [t("name"), t("number"), t("orderTotal"), t('profit'), t("detailedAddress"), t("status"), t("datePlaced")]
    const status = useRef('')
    const displayStatus = useRef('')
    const nameSearch = useRef('')
    const numberSearch = useRef('')
    const [checkBoxItems, setCheckBoxItems] = useState([])
    const statuses = ["all", "pending", "confirmed", "shipped", "delivered", "canceled", "returnRequested", "returnApproved", "returnOrderPicked", "returnDone"]
    const deductedDays = useRef(365)
    const shownDays = useRef('')
    const availableDays = ['lastDay', 'last7Days', 'lastMonth', 'lastYear']
    useEffect(() => {
        getOrders()
    }, [user])

    const getOrders = () => {
        if (user?._id) {
            setLoading(true)
            axiosInstance.get(`orders?page=${pageNumber.current}&days=${deductedDays.current}&status=${status.current}&name=${nameSearch.current}&number=${numberSearch.current}${user.role === 'Seller' ? `&sellerId=${user._id}` : ''}${user.role === 'Affiliate' ? `&affiliateSellerId=${user._id}` : ''}`).then(response => {
                setOrders(response.data.order)
                setTotalItems(response.data.total_orders)
                setItemsPerPage(response.data.per_page)
            }).finally(() => {
                setLoading(false)
                setCheckBoxItems([])
            })
        }
    }
    const deleteOrder = (id: string) => {
        setLoading(true)
        axiosInstance.delete(`/orders/${id}`).then(response => {
            getOrders()
        })
    }

    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getOrders()
    };

    const filterStatus = (value: string) => {
        displayStatus.current = value
        if (value === "all") {
            status.current = ""
        } else {
            status.current = value
        }
        getOrders()
    }

    const filterDays = (value: string) => {
        shownDays.current = value
        if (value === "lastDay") {
            deductedDays.current = 1
        }
        if (value === "last7Days") {
            deductedDays.current = 7
        }
        if (value === "lastMonth") {
            deductedDays.current = 30
        }
        if (value === "lastYear") {
            deductedDays.current = 365
        }
        getOrders()
    }

    const checkAllItems = (e: any) => {
        if (e === true) {
            setCheckBoxItems([...orders])
        } else {
            setCheckBoxItems([])
        }
    }

    return (
        <div>
            <div className='mb-5 flex md:flex-row flex-col gap-5 md:mx-10 mx-5 items-center justify-center '>
                <Input label={t('name')} inputValue={(value: string) => nameSearch.current = value} width="w-full mt-0" disabled={loading} />
                <Input label={t('number')} inputValue={(value: any) => numberSearch.current = value} width="w-full mt-0" disabled={loading} />
                <SelectedComponent uppercase={true} translation={true} defaultValue={displayStatus.current} label={t("status")} disabled={loading} items={statuses} key={status.current} callbackValue={filterStatus} />
                <SelectedComponent uppercase={true} defaultValue={shownDays.current} label={t("ordersDate")} disabled={loading} items={availableDays} key={deductedDays.current} callbackValue={filterDays} />
                <button className='px-10 h-12 md:w-auto w-full bg-gradient text-sm text-white rounded-md' onClick={getOrders} disabled={loading}>{t("search")}</button>
            </div>
            {orders.length === 0 && !loading && user.role === 'Affiliate' ? <div className='flex items-center flex-col justify-center'>
            <a href="https://discountaty.com/login" target="_blank"><h2 className='capitalize cursor-pointer bg-primaryColor font-semibold text-lg p-4 rounded-md text-white'>{t('goToProductsPage')}</h2></a>
            </div> : orders.length === 0 && !loading && user.role !== 'Affiliate' ?
                <EmptyProduct text={t('noOrdersAvailable')} />
                : <div className='overflow-y-hidden overflow-x-scroll'>
                    <Table
                        deleteUrl='orders'
                        reloadItems={getOrders}
                        title={t("orders")}
                        tableHeads={(user?.role === 'Admin' || user?.role === 'Super Admin') ? tableAdminHeads : user?.role === 'Affiliate' ? tableHeadsAffiliate : tableHeads}
                        loading={loading}
                        checkAll={checkAllItems}
                        checkBoxItems={checkBoxItems}>
                        {orders.map((order: any) => (
                            <SingleOrder getOrders={getOrders} user={user} key={order._id} checkBoxItems={checkBoxItems} value={order} deleteFunc={deleteOrder} />
                        ))}
                    </Table>
                </div>}

            <div className={`mt-7 transition-all ${loading ? "opacity-0" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
        </div>
    )
}
