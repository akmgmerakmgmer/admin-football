import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pagination } from '@mui/material'
import Table from '../../GeneralComponents/Table'
import SingleAdvertisment from './SingleAdvertisment'
import EmptyProduct from '../Cart/EmptyProduct'
import Input from '../../TextFields/Input'
import axiosInstance from '../../../utilities/axiosInstance'
import AlertComponent from '../../GeneralComponents/Alert'

export default function MainAdvertisment() {
    const { i18n, t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [advertisments, setAdvertisments] = useState([])
    const pageNumber = useRef(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const tableHeads = [t("companyName"), t("advertiseAt"), t('priority'), t('adClicked'), t("status")]
    const [checkBoxItems, setCheckBoxItems] = useState([])
    const companySearch = useRef('')
    const [generalMessage, setGeneralMessage] = useState({ en: "", ar: "" })
    const [openErrorSnackbar, setOpenSnackbar] = useState(false)
    useEffect(() => {
        getAdvertisments()
    }, [])

    const getAdvertisments = () => {
        setLoading(true)
        axiosInstance.get(`admin-advertisments?page=${pageNumber.current}&company=${companySearch.current}&advertiseAt=`).then(response => {
            setAdvertisments(response.data.advertisments)
            setTotalItems(response.data.total_ads)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
            setCheckBoxItems([])
        })
    }

    const deleteAdvertisment = (id: string) => {
        setLoading(true)
        axiosInstance.delete(`/advertisments/${id}`).then(response => {
            getAdvertisments()
        })
    }

    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getAdvertisments()
    };
    const checkAllItems = (e: any) => {
        if (e === true) {
            setCheckBoxItems([...advertisments])
        } else {
            setCheckBoxItems([])
        }
    }

    const enableFunc = (id: string, priority: number, advertiseAt: string) => {
        setLoading(true)
        axiosInstance.put(`/advertisments/${id}`, { status: 'active', prevStatus: 'disabled', priority: priority, advertiseAt: advertiseAt }).then(response => {
            getAdvertisments()
        }).catch(err => {
            setOpenSnackbar(true)
            setLoading(false)
            setGeneralMessage(err.response.data.message)
            setTimeout(() => {
                setOpenSnackbar(false)
            }, 3000)
        })
    }

    const disableFunction = (id: string) => {
        setLoading(true)
        axiosInstance.put(`/advertisments/${id}`, { status: 'disabled' }).then(response => {
            getAdvertisments()
        })
    }

    return (
        <div>
            <div className='mb-5 flex md:flex-row flex-col gap-5 md:mx-10 mx-5 items-center justify-center'>
                <Input label={t('companyName')} required={false} inputValue={(value: string) => companySearch.current = value} width="w-full mt-0" disabled={loading} />
                <button className='px-10 h-12 md:w-auto w-full bg-gradient text-sm text-white rounded-md' onClick={() => {
                    pageNumber.current = 1
                    getAdvertisments()
                }} disabled={loading}>{t("search")}</button>
            </div>
            {advertisments.length === 0 && !loading ?
                <EmptyProduct text={t('noAdvertismentsAvailable')} />
                : <div className='overflow-y-hidden overflow-x-scroll'>
                    <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='advertisments' reloadItems={getAdvertisments} title={t("advertisments")} tableHeads={tableHeads} loading={loading}>
                        {advertisments.map((advertisment: any, index: any) => (
                            <SingleAdvertisment disableFunc={disableFunction} enableFunc={enableFunc} checkBoxItems={checkBoxItems} value={advertisment} deleteFunc={deleteAdvertisment} key={index} />
                        ))}
                    </Table>
                </div>}
            <div className={`mt-7 transition-all ${loading ? "opacity-0" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
            <AlertComponent message={i18n.language == 'en' ? generalMessage.en : generalMessage.ar} error={true} open={openErrorSnackbar} />
        </div>
    )
}
