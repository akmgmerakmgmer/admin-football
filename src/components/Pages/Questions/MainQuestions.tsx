import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pagination } from '@mui/material'
import Table from '../../GeneralComponents/Table'
import SingleQuestion from './SingleQuestion'
import EmptyProduct from '../Cart/EmptyProduct'
import Input from '../../TextFields/Input'
import axiosInstance from '../../../utilities/axiosInstance'
import SelectedComponent from '../../GeneralComponents/SelectComponent'

export default function MainQuestions() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [questions, setQuestions] = useState([])
    const pageNumber = useRef(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const tableHeads = [t("questionEn"), t("questionAr"), t('answer'), t('questionMode'),]
    const [checkBoxItems, setCheckBoxItems] = useState([])
    const questionModes = ['multipleChoices', 'trueOrFalse', 'passwordChallenge', 'guessThePlayer', 'reversedWords']
    const questionSearch = useRef('')
    const questionMode = useRef('')
    const answer = useRef('')
    useEffect(() => {
        getQuestions()
    }, [])

    const getQuestions = () => {
        console.log(answer.current)
        setLoading(true)
        axiosInstance.get(`admin-questions?page=${pageNumber.current}&question=${questionSearch.current}&questionMode=${questionMode.current}&answer=${answer.current}`).then(response => {
            setQuestions(response.data.question)
            setTotalItems(response.data.total_questions)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
            setCheckBoxItems([])
        })
    }

    const deleteQuestion = (id: string) => {
        setLoading(true)
        axiosInstance.delete(`/questions/${id}`).then(response => {
            getQuestions()
        })
    }

    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getQuestions()
    };
    const checkAllItems = (e: any) => {
        if (e === true) {
            setCheckBoxItems([...questions])
        } else {
            setCheckBoxItems([])
        }
    }

    const enableFunc = (id: string) => {
        setLoading(true)
        axiosInstance.put(`/questions/${id}`, { disabled: false }).then(response => {
            getQuestions()
        })
    }

    const chooseQuestionType = (value: string) => {
        questionMode.current = value
        getQuestions()
    }
    return (
        <div>
            <div className='mb-5 flex md:flex-row flex-col gap-5 md:mx-10 mx-5 items-center justify-center'>
                <Input label={t('searchQuestion')} required={false} inputValue={(value: string) => questionSearch.current = value} width="w-full mt-0" disabled={loading} />
                <Input label={t('answer')} required={false} inputValue={(value: string) => answer.current = value} width="w-full mt-0" disabled={loading} />
                <SelectedComponent translation disabled={loading} defaultValue={""} label={t('categories')} items={questionModes} callbackValue={(value) => chooseQuestionType(value)} />
                <button className='px-10 h-12 md:w-auto w-full bg-gradient text-sm text-white rounded-md' onClick={() => {
                    pageNumber.current = 1
                    getQuestions()
                }} disabled={loading}>{t("search")}</button>
            </div>
            {questions.length === 0 && !loading ?
                <EmptyProduct text={t('noQuestionsAvailable')} />
                : <div className='overflow-y-hidden overflow-x-scroll'>
                    <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='questions' reloadItems={getQuestions} title={t("questions")} tableHeads={tableHeads} loading={loading}>
                        {questions.map((question: any, index: any) => (
                            <SingleQuestion enableFunc={enableFunc} checkBoxItems={checkBoxItems} value={question} deleteFunc={deleteQuestion} key={index} />
                        ))}
                    </Table>
                </div>}
            <div className={`mt-7 transition-all ${loading ? "opacity-0" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
        </div>
    )
}
