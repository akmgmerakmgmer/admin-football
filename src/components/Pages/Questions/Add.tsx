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
import MultipleChoices from './MultipleChoices'
import useQuestions from '../../../customHooks/useQuestions'
import PasswordChallenge from './PasswordChallenge'
import AnswerPlayerSearch from './AnswerPlayerSearch'

export default function Add() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { id } = useParams()
    const questionModes = ['multipleChoices', 'trueOrFalse', 'passwordChallenge']
    const modes = ['worldCup', 'championsLeague', 'europaLeague', 'premierLeague', 'laliga', 'seriaA', 'bundesliga', 'ligue1', 'africaCup', 'clubWorldCup', 'euros', 'general']
    const trueOrFalseAnswers = ['true', 'false']
    const difficulties = ['easy', 'medium', 'hard']
    const [choices, setChoices] = useState<any>([{ en: '', ar: '', value: '' }, { en: '', ar: '', value: '' }, { en: '', ar: '', value: '' }, { en: '', ar: '', value: '' }])
    const [hints, setHints] = useState<any>([])
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
    const hintsRef: any = useRef()

    choicesRef.current = choices
    hintsRef.current = hints

    useEffect(() => {
        questionMethods.getQuestionDetails()
    }, [])

    useEffect(() => { }, [rerender])

    const hooksProps = {
        id,
        setQuestionForm,
        setChoices,
        setRerender,
        rerender,
        setPageLoading,
        questionForm,
        choicesRef,
        setLoading,
        navigate,
        setErrorData,
        errorData,
        hintsRef,
        setHints,
        hints
    }
    const questionMethods = useQuestions(hooksProps)
    
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
                        <div className="mt-5 flex items-center gap-3">
                            <div className='flex-1 self-start'>
                                <SelectedComponent disabled={loading} uppercase={true} translation={true} callbackValue={(value) => {
                                    if (value === 'passwordChallenge' && !hints.length) questionMethods.addHint()
                                    setQuestionForm({ ...questionForm, questionMode: value })
                                }} defaultValue={questionForm.questionMode} items={questionModes} label={t("questionMode")} errorMessage={errorData.questionMode ? true : false} />
                            </div>
                            {questionForm.questionMode === 'passwordChallenge' && <button className="bg-primaryColor px-5 py-2.5 text-white text-sm rounded-full h-full" onClick={questionMethods.addHint}>{t('addHint')}</button>}
                        </div>
                        {questionMethods.showQuestion() && < div className='flex flex-col gap-5'>
                            <Input value={questionForm.question.en} label={t('questionEn')} inputValue={(value: string) => setQuestionForm({ ...questionForm, question: { en: value, ar: questionForm.question.ar } })} width="w-full" disabled={loading} errorMessage={t(errorData['question.en'])} />
                            <Input value={questionForm.question.ar} label={t('questionAr')} inputValue={(value: string) => setQuestionForm({ ...questionForm, question: { ar: value, en: questionForm.question.en } })} width="w-full" disabled={loading} errorMessage={t(errorData['question.ar'])} />
                        </div>}
                        <span className='text-red-500 text-xs'>{t(errorData.questionMode)}</span>
                        {questionForm.questionMode === 'multipleChoices' &&
                            <div className='mx-5'>
                                {choices.map((choice: any, index: any) => (
                                    <MultipleChoices choices={choices} index={index} loading={loading}
                                        setChoices={() => setChoices(choicesRef.current)}
                                        setRerender={() => { setRerender(!rerender) }}
                                        t={t} />
                                ))}
                            </div>
                        }
                        {questionForm.questionMode === 'passwordChallenge' &&
                            <div className='mx-5'>
                                {hints.map((hint: any, index: any) => (
                                    <PasswordChallenge hints={hints} index={index} loading={loading}
                                        setHints={() => setHints(hintsRef.current)}
                                        setRerender={() => { setRerender(!rerender) }}
                                        // deleteHint={() => deleteHint(index)}
                                        t={t} />
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
                                <SelectedComponentById disabled={loading || questionMethods.checkShowAnswers()} callbackValue={(value) => setQuestionForm({ ...questionForm, answer: value })} defaultValue={questionForm.answer} items={choices} label={t("answer")} errorMessage={errorData.answer ? true : false} />
                            </div>
                        }
                        {questionForm.questionMode === 'passwordChallenge' &&
                            <div className='mt-5'>
                                <AnswerPlayerSearch disabled={loading} defaultValue={questionForm.answer} playerCallBack={(value) => setQuestionForm({ ...questionForm, answer: value })} />
                            </div>
                        }
                        <div className="mt-5">
                            <SelectedComponent disabled={loading} uppercase={true} translation={true} callbackValue={(value) => setQuestionForm({ ...questionForm, difficulty: value })} defaultValue={questionForm.difficulty} items={difficulties} label={t("difficulty")} errorMessage={errorData.difficulty ? true : false} />
                        </div>
                        <div className="mt-5">
                            <SelectedComponent disabled={loading} uppercase={true} translation={true} callbackValue={(value) => setQuestionForm({ ...questionForm, mode: value })} defaultValue={questionForm.mode} items={modes} label={t("mode")} required={false} />
                        </div>
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={id ? questionMethods.editQuestion : questionMethods.addQuestion}>
                            {loading ? <ButtonLoading loading={loading} /> : <span>{id ? t('editQuestion') : t('addQuestion')}</span>}
                        </button>
                    </div>
                </div>
            </CSSTransition >

        </>
    )
}
