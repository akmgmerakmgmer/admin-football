import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonLoading from '../../Loadings/ButtonLoading'
import Input from '../../TextFields/Input'
import UploadImage from '../../GeneralComponents/UploadImage'
import { useNavigate } from 'react-router-dom'
import IconLinks from '../../Navbar/NavComponents/IconLinks'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../../utilities/axiosInstance'

export default function Add() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [questionForm, setQuestionForm] = useState({
        question: {
            en: "",
            ar: ""
        },
        choices: [],
        answer: "",
        questionMode: "multipleChoice"
    })
    const [errorData, setErrorData] = useState({ question: { en: "", ar: "" }, answer: '' })
    const [loading, setLoading] = useState(false)
    const addQuestion = () => {
        setLoading(true)
        axiosInstance.post('questions', questionForm).then(response => {
            navigate('/questions')
        }).catch(err => {
            setErrorData(err.response.data)
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <div>
            <h2 className='text-xl'>{t("addQuestion")}</h2>
            <div className='flex flex-col gap-1'>
                <Input label={t('englishName')} inputValue={(value: string) => setQuestionForm({ ...questionForm, question: { en: value, ar: questionForm.question.ar } })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.question.en)} />
                <Input label={t('arabicName')} inputValue={(value: string) => setQuestionForm({ ...questionForm, question: { ar: value, en: questionForm.question.ar } })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.question.ar)} />
                <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={addQuestion}>
                    {loading ? <ButtonLoading loading={loading} /> : <span>{t('addQuestion')}</span>}
                </button>
            </div>
        </div>
    )
}
