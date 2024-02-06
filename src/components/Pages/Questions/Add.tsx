import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonLoading from '../../Loadings/ButtonLoading'
import Input from '../../TextFields/Input'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../../utilities/axiosInstance'
import SelectedComponent from '../../GeneralComponents/SelectComponent'
import SelectedComponentById from '../../GeneralComponents/SelectedComponentById'
import ApiLoading from '../../Loadings/ApiLoading'
import { CSSTransition } from 'react-transition-group'

export default function Add() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { id } = useParams()
    const questionModes = ['multipleChoices', 'trueOrFalse']
    const modes = ['worldCup', 'championsLeague', 'europaLeague', 'premierLeague', 'laliga', 'seriaA', 'bundesliga', 'ligue1', 'africaCup', 'clubWorldCup', 'euros', 'general']
    const trueOrFalseAnswers = ['true', 'false']
    const difficulties = ['easy', 'medium', 'hard']
    const [choices, setChoices] = useState<any>([{ en: '', ar: '', value: '' }, { en: '', ar: '', value: '' }, { en: '', ar: '', value: '' }, { en: '', ar: '', value: '' }])
    const [questionForm, setQuestionForm] = useState<any>({
        question: {
            en: "",
            ar: ""
        },
        choices: [],
        answer: "",
        questionMode: "",
        difficulty: "",
        mode: ""
    })
    const [errorData, setErrorData] = useState({ 'question.ar': '', 'question.en': '', answer: '', difficulty: '', questionMode: '' })
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [rerender, setRerender] = useState(false)
    const choicesRef: any = useRef()
    choicesRef.current = choices
    useEffect(() => {
        if (id) {
            axiosInstance.get(`questions/${id}`).then((response: any) => {
                setQuestionForm(response.data)
                setChoices(response.data.choices)
                setRerender(!rerender)
            }).finally(() => {
                setPageLoading(false)
            })
        } else {
            setPageLoading(false)
        }
    }, [])
    useEffect(() => { }, [rerender])
    const addQuestion = () => {
        if (questionForm.questionMode == 'multipleChoices') {
            for (let i in choices) {
                if (choices[i].en.trim() === '' || choices[i].ar.trim() === '') return setErrorData({ ...errorData, questionMode: 'missing_choices' })
            }
            setQuestionForm({ ...questionForm, choices: choices })
        }
        setLoading(true)
        axiosInstance.post('questions', questionForm).then(response => {
            navigate('/questions')
        }).catch(err => {
            setErrorData(err.response.data)
        }).finally(() => {
            setLoading(false)
        })
    }
    const checkShowAnswers = () => {
        for (let i in choicesRef.current) {
            if (choicesRef.current[i].en.trim() === '' || choicesRef.current[i].ar.trim() === '') return true
        }
    }

    const editQuestion = () => {
        setLoading(true)
        axiosInstance.put(`questions/${id}`, questionForm).then(response => {
            navigate('/questions')
        }).finally(() => setLoading(false))
    }
    return (
        <>
            <ApiLoading loading={pageLoading} />
            <CSSTransition
                in={!pageLoading}
                timeout={300}
                classNames="default"
                unmountOnExit
            >

                <div>
                    <h2 className='text-xl'>{id ? t("editQuestion") : t("addQuestion")}</h2>
                    <div className='flex flex-col gap-1'>
                        <Input value={questionForm.question.en} label={t('questionEn')} inputValue={(value: string) => setQuestionForm({ ...questionForm, question: { en: value, ar: questionForm.question.ar } })} width="w-full" disabled={loading} errorMessage={t(errorData['question.en'])} />
                        <Input value={questionForm.question.ar} label={t('questionAr')} inputValue={(value: string) => setQuestionForm({ ...questionForm, question: { ar: value, en: questionForm.question.en } })} width="w-full" disabled={loading} errorMessage={t(errorData['question.ar'])} />
                        <div className="mt-5">
                            <SelectedComponent disabled={loading} uppercase={true} translation={true} callbackValue={(value) => setQuestionForm({ ...questionForm, questionMode: value })} defaultValue={questionForm.questionMode} items={questionModes} label={t("questionMode")} errorMessage={errorData.questionMode ? true : false} />
                            <span className='text-red-500 text-xs'>{t(errorData.questionMode)}</span>
                        </div>
                        {questionForm.questionMode === 'multipleChoices' &&
                            <div className='mx-5'>
                                {choices.map((choice: any, index: any) => (
                                    <div className='flex gap-5' key={index}>
                                        <Input value={choices[index]?.en} label={t('choiceInEnglish')} inputValue={(value: string) => {
                                            choices[index].en = value
                                            choices[index].value = value.trim()
                                            setChoices(choicesRef.current)
                                            setRerender(!rerender)
                                        }} width="w-full" disabled={loading} />
                                        <Input value={choices[index]?.ar} label={t('choiceInArabic')} inputValue={(value: string) => {
                                            choices[index].ar = value
                                            setChoices(choicesRef.current)
                                            setRerender(!rerender)
                                        }} width="w-full" disabled={loading} />
                                    </div>
                                ))}
                            </div>
                        }
                        {questionForm.questionMode === 'trueOrFalse' &&
                            <div className="mt-5">
                                <SelectedComponent disabled={loading} uppercase={true} translation={true} callbackValue={(value) => setQuestionForm({ ...questionForm, answer: value })} defaultValue={questionForm.answer} items={trueOrFalseAnswers} label={t("answer")} errorMessage={errorData.answer ? true : false} />
                            </div>
                        }
                        {questionForm.questionMode === 'multipleChoices' &&
                            <div className="mt-5">
                                <SelectedComponentById disabled={loading || checkShowAnswers()} callbackValue={(value) => setQuestionForm({ ...questionForm, answer: value })} defaultValue={questionForm.answer} items={choices} label={t("answer")} errorMessage={errorData.answer ? true : false} />
                            </div>
                        }
                        <div className="mt-5">
                            <SelectedComponent disabled={loading} uppercase={true} translation={true} callbackValue={(value) => setQuestionForm({ ...questionForm, difficulty: value })} defaultValue={questionForm.difficulty} items={difficulties} label={t("difficulty")} errorMessage={errorData.difficulty ? true : false} />
                        </div>
                        <div className="mt-5">
                            <SelectedComponent disabled={loading} uppercase={true} translation={true} callbackValue={(value) => setQuestionForm({ ...questionForm, mode: value })} defaultValue={questionForm.mode} items={modes} label={t("mode")} required={false} />
                        </div>
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={id ? editQuestion : addQuestion}>
                            {loading ? <ButtonLoading loading={loading} /> : <span>{id ? t('editQuestion') : t('addQuestion')}</span>}
                        </button>
                    </div>
                </div>
            </CSSTransition>

        </>
    )
}
