import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pagination } from '@mui/material'
import Table from '../../GeneralComponents/Table'
import SinglePerk from './SinglePerk'
import EmptyProduct from '../Cart/EmptyProduct'
import Input from '../../TextFields/Input'
import axiosInstance from '../../../utilities/axiosInstance'

export default function MainPerk() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [perks, setPerks] = useState([])
    const pageNumber = useRef(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const tableHeads = [t("image"), t("englishName"), t('arabicName'), t('price')]
    const [checkBoxItems, setCheckBoxItems] = useState([])
    useEffect(() => {
        getPerks()
    }, [])

    const getPerks = () => {
        setLoading(true)
        axiosInstance.get(`admin-perks?page=${pageNumber.current}`).then(response => {
            setPerks(response.data.perks)
            setTotalItems(response.data.total_perks)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
            setCheckBoxItems([])
        })
    }

    const deletePerk = (id: string) => {
        setLoading(true)
        axiosInstance.delete(`/perks/${id}`).then(response => {
            getPerks()
        })
    }

    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getPerks()
    };
    const checkAllItems = (e: any) => {
        if (e === true) {
            setCheckBoxItems([...perks])
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
                    getPerks()
                }} disabled={loading}>{t("search")}</button>
            </div> */}
            {perks.length === 0 && !loading ?
                <EmptyProduct text={t('noPerksAvailable')} />
                : <div className='overflow-y-hidden overflow-x-scroll'>
                    <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='perks' reloadItems={getPerks} title={t("perks")} tableHeads={tableHeads} loading={loading}>
                        {perks.map((perk: any, index: any) => (
                            <SinglePerk checkBoxItems={checkBoxItems} value={perk} deleteFunc={deletePerk} key={index} />
                        ))}
                    </Table>
                </div>}
            <div className={`mt-7 transition-all ${loading ? "opacity-0" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
        </div>
    )
}
