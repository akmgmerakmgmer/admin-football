import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pagination } from '@mui/material'
import Table from '../../GeneralComponents/Table'
import SingleEvent from './SingleEvent'
import EmptyProduct from '../Cart/EmptyProduct'
import axiosInstance from '../../../utilities/axiosInstance'

export default function MainEvents() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState([])
    const pageNumber = useRef(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const tableHeads = [t("englishName"), t('arabicName'), t('players'), t('endDate')]
    const [checkBoxItems, setCheckBoxItems] = useState([])
    useEffect(() => {
        getEvents()
    }, [])

    const getEvents = () => {
        setLoading(true)
        axiosInstance.get(`admin-events?page=${pageNumber.current}`).then(response => {
            setEvents(response.data.events)
            setTotalItems(response.data.total_events)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
            setCheckBoxItems([])
        })
    }

    const deleteEvent = (id: string) => {
        setLoading(true)
        axiosInstance.delete(`/events/${id}`).then(response => {
            getEvents()
        })
    }

    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getEvents()
    };
    const checkAllItems = (e: any) => {
        if (e === true) {
            setCheckBoxItems([...events])
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
                    getevents()
                }} disabled={loading}>{t("search")}</button>
            </div> */}
            {events.length === 0 && !loading ?
                <EmptyProduct text={t('noEventsAvailable')} />
                : <div className='overflow-y-hidden overflow-x-scroll'>
                    <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='events' reloadItems={getEvents} title={t("events")} tableHeads={tableHeads} loading={loading}>
                        {events.map((event: any, index: any) => (
                            <SingleEvent checkBoxItems={checkBoxItems} value={event} deleteFunc={deleteEvent} key={index} />
                        ))}
                    </Table>
                </div>}
            <div className={`mt-7 transition-all ${loading ? "opacity-0" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
        </div>
    )
}
