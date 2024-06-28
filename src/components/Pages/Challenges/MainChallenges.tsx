import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pagination } from '@mui/material'
import Table from '../../GeneralComponents/Table'
import SingleChallenge from './SingleChallenge'
import EmptyProduct from '../Cart/EmptyProduct'
import Input from '../../TextFields/Input'
import axiosInstance from '../../../utilities/axiosInstance'

export default function MainChallenges() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [challenges, setChallenges] = useState([])
    const pageNumber = useRef(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const tableHeads = [t("firstName"), t("nameEn"), t('nameAr'), t("image")]
    const [checkBoxItems, setCheckBoxItems] = useState([])
    const nameSearch = useRef('')
    useEffect(() => {
        getChallenges()
    }, [])

    const getChallenges = () => {
        setLoading(true)
        axiosInstance.get(`/admin-challenges?page=${pageNumber.current}&name=${nameSearch.current}`).then(response => {
            setChallenges(response.data.challenge)
            setTotalItems(response.data.total_challenges)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
            setCheckBoxItems([])
        })
    }

    const deleteChallenge = (id: string) => {
        setLoading(true)
        axiosInstance.delete(`/challenges/${id}`).then(response => {
            getChallenges()
        })
    }

    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getChallenges()
    };
    const checkAllItems = (e: any) => {
        if (e === true) {
            setCheckBoxItems([...challenges])
        } else {
            setCheckBoxItems([])
        }
    }

    const enableFunc = (id: string) => {
        setLoading(true)
        axiosInstance.put(`/challenges/${id}`, { disabled: false }).then(response => {
            getChallenges()
        })
    }

    return (
        <div>
            <div className='mb-5 flex md:flex-row flex-col gap-5 md:mx-10 mx-5 items-center justify-center'>
                <Input label={t('name')} required={false} inputValue={(value: string) => nameSearch.current = value} width="w-full mt-0" disabled={loading} />
                <button className='px-10 h-12 md:w-auto w-full bg-gradient text-sm text-white rounded-md' onClick={() => {
                    pageNumber.current = 1
                    getChallenges()
                }} disabled={loading}>{t("search")}</button>
            </div>
            {challenges.length === 0 && !loading ?
                <EmptyProduct text={t('noChallengesAvailable')} />
                : <div className='overflow-y-hidden overflow-x-scroll'>
                    <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='challenges' reloadItems={getChallenges} title={t("challenges")} tableHeads={tableHeads} loading={loading}>
                        {challenges.map((order: any, index: any) => (
                            <SingleChallenge enableFunc={enableFunc} checkBoxItems={checkBoxItems} value={order} deleteFunc={deleteChallenge} key={index} />
                        ))}
                    </Table>
                </div>}
            <div className={`mt-7 transition-all ${loading ? "opacity-0" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
        </div>
    )
}
