import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonLoading from '../../Loadings/ButtonLoading'
import Input from '../../TextFields/Input'
import { useNavigate, useParams } from 'react-router-dom'
import SelectedComponent from '../../GeneralComponents/SelectComponent'
import SelectedComponentById from '../../GeneralComponents/SelectedComponentById'
import ApiLoading from '../../Loadings/ApiLoading'
import { CSSTransition } from 'react-transition-group'
import MultipleChoices from './MultipleChoices'
import useQuestions from '../../../customHooks/useQuestions'
import PasswordChallenge from './PasswordChallenge'
import AnswerPlayerSearch from './AnswerPlayerSearch'
import UploadImage from '../../GeneralComponents/UploadImage'
import SinglePlayer from './SinglePlayer'
import { Delete } from '@material-ui/icons'
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@material-ui/core'

export default function Add() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { id } = useParams()
    const questionModes = ['multipleChoices', 'trueOrFalse', 'passwordChallenge', 'guessThePlayer', 'guessTheTeam']
    const modes = ['worldCup', 'championsLeague', 'europaLeague', 'premierLeague', 'laliga', 'seriaA', 'bundesliga', 'ligue1', 'africaCup', 'clubWorldCup', 'euros', 'general']
    const trueOrFalseAnswers = ['true', 'false']
    const difficulties = ['easy', 'medium', 'hard']
    const [choices, setChoices] = useState<any>([{ en: '', ar: '', value: '' }, { en: '', ar: '', value: '' }, { en: '', ar: '', value: '' }, { en: '', ar: '', value: '' }])
    const [hints, setHints] = useState<any>([])
    const [imageError, setImageError] = useState('')
    const [questionForm, setQuestionForm] = useState<any>({
        question: {
            en: "",
            ar: ""
        },
        choices: [],
        teamPlayers: [],
        answer: "",
        questionMode: "",
        difficulty: "",
        mode: ""
    })
    const [errorData, setErrorData] = useState({ 'question.ar': '', 'question.en': '', answer: '', difficulty: '', questionMode: '' })
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [translateLoading, setTranslateLoading] = useState(false)
    const [rerender, setRerender] = useState(false)
    const [playersNumberError, setPlayersNumberError] = useState('')
    const [isDeveloper, setIsDeveloper] = useState(false)
    const [developerError, setDeveloperError] = useState('')
    const choicesRef: any = useRef()
    const hintsRef: any = useRef()
    const questionFormRef = useRef()
    const developerQuestions = useRef('')

    choicesRef.current = choices
    hintsRef.current = hints
    questionFormRef.current = questionForm

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
        hints,
        setImageError,
        questionFormRef,
        setPlayersNumberError,
        setTranslateLoading,
        isDeveloper,
        developerQuestions,
        setDeveloperError
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
                        {!id && <div className='self-start'>
                            <FormControlLabel control={<Checkbox checked={isDeveloper} onChange={(e: any) => setIsDeveloper(e.target.checked)} />} label="ChatGPT" />
                        </div>}
                        {isDeveloper && <div>
                            <Input errorMessage={developerError} value={developerQuestions.current} label={'ChatGPT'} inputValue={(value: string) => developerQuestions.current = value} width="w-full" disabled={loading} textarea={true} />
                        </div>}
                        {!isDeveloper && <div className="mt-5 flex items-center gap-3">
                            <div className='flex-1 self-start'>
                                <SelectedComponent disabled={loading} uppercase={true} translation={true} callbackValue={(value) => questionMethods.changeQuestionMode(value)} defaultValue={questionForm.questionMode} items={questionModes} label={t("questionMode")} errorMessage={errorData.questionMode ? true : false} />
                            </div>
                            {(questionForm.questionMode === 'passwordChallenge' || questionForm.questionMode === 'guessThePlayer') && <button className="bg-primaryColor px-5 py-2.5 text-white text-sm rounded-full h-full" onClick={questionMethods.addHint}>{t('addHint')}</button>}
                        </div>}
                        {questionMethods.showQuestion() && !isDeveloper && < div className='flex flex-col gap-1'>
                            <div className='flex gap-3 items-center'>
                                <Input value={questionForm.question.en} label={t('questionEn')} inputValue={(value: string) => setQuestionForm({ ...questionForm, question: { en: value, ar: questionForm.question.ar } })} width="w-full" disabled={loading} errorMessage={t(errorData['question.en'])} />
                                {/* <button className='bg-primaryColor py-4 px-3 rounded-lg whitespace-nowrap text-xs mt-5 text-white' onClick={() => questionMethods.translate('en', 'ar', questionForm.question.en)}>{translateLoading ? <ButtonLoading loading={translateLoading} /> : t('translateToArabic')}</button> */}
                            </div>
                            <div className='flex gap-3 items-center'>
                                <Input value={questionForm.question.ar} label={t('questionAr')} inputValue={(value: string) => setQuestionForm({ ...questionForm, question: { ar: value, en: questionForm.question.en } })} width="w-full" disabled={loading} errorMessage={t(errorData['question.ar'])} />
                                {/* <button className='bg-primaryColor py-4 px-3 rounded-lg whitespace-nowrap text-xs mt-5 text-white' onClick={() => questionMethods.translate('ar', 'en', questionForm.question.ar)}>{translateLoading ? <ButtonLoading loading={translateLoading} /> : t('translateToEnglish')}</button> */}
                            </div>
                        </div>}
                        <span className='text-red-500 text-xs'>{t(errorData.questionMode)}</span>
                        {questionForm.questionMode === 'multipleChoices' && !isDeveloper &&
                            <div className='mx-5'>
                                {choices.map((choice: any, index: any) => (
                                    <MultipleChoices choices={choices} index={index} loading={loading}
                                        setChoices={() => setChoices(choicesRef.current)}
                                        setRerender={() => { setRerender(!rerender) }}
                                        t={t} />
                                ))}
                            </div>
                        }
                        {questionMethods.showHints() && !isDeveloper &&
                            <div className='mx-5'>
                                {hints.map((hint: any, index: any) => (
                                    <PasswordChallenge index={index} loading={loading}
                                        hintEnglishCallback={(value) => {
                                            hints[index].en = value
                                        }}
                                        hintArabicCallBack={(value) => {
                                            hints[index].ar = value
                                        }}
                                        valueAr={hints[index].ar}
                                        valueEn={hints[index].en}
                                        textarea={questionForm.questionMode === 'guessThePlayer'}
                                        showDelete={hints.length > 1}
                                        deleteHint={() => {
                                            const newHints = [...hints];
                                            newHints.splice(index, 1);
                                            setHints(newHints);
                                        }}
                                        t={t} />
                                ))}
                            </div>
                        }
                        {questionForm.questionMode === 'trueOrFalse' && !isDeveloper &&
                            <div className="mt-5">
                                <SelectedComponent disabled={loading} uppercase={true} translation={true} callbackValue={(value) => setQuestionForm({ ...questionForm, answer: value })} defaultValue={questionForm.answer} items={trueOrFalseAnswers} label={t("answer")} errorMessage={errorData.answer ? true : false} />
                            </div>
                        }
                        {questionForm.questionMode === 'multipleChoices' && !isDeveloper &&
                            <div className="mt-5">
                                <SelectedComponentById disabled={loading || questionMethods.checkShowAnswers()} callbackValue={(value) => setQuestionForm({ ...questionForm, answer: value })} defaultValue={questionForm.answer} items={choices} label={t("answer")} errorMessage={errorData.answer ? true : false} />
                            </div>
                        }
                        {questionForm.questionMode === 'guessTheTeam' && !isDeveloper &&
                            <div>
                                {!questionForm.teamImage ? <UploadImage imageError={imageError} imageUploaded={(value: any) => setQuestionForm({ ...questionForm, teamImage: value })} imageNotUploaded={(error: any) => setImageError(error)} /> :
                                    <div className='relative'>
                                        <img src={questionForm.teamImage} className='w-full object-cover' />
                                        <div className='absolute top-5 ltr:right-5 rtl:left-5 cursor-pointer' onClick={() => setQuestionForm({ ...questionForm, teamImage: '' })}>
                                            <Delete color='error' />
                                        </div>
                                    </div>}
                            </div>
                        }
                        {questionMethods.showPlayerSearch() && !isDeveloper &&
                            <div className='mt-5'>
                                <AnswerPlayerSearch disabled={loading} defaultValue={Array.isArray(questionForm.answer) ? '' : questionForm.answer} playerCallBack={(value) => questionMethods.choosePlayerMethod(value)} />
                                {playersNumberError && <span className='text-red-500 text-xs'>{t(playersNumberError)}</span>}
                            </div>
                        }
                        {questionForm.teamPlayers && questionForm.teamPlayers.length && questionForm.questionMode === 'guessTheTeam' ? <div className='mt-3 flex flex-col gap-3'>
                            {questionForm.teamPlayers.map((player: any, index: number) => (
                                <SinglePlayer player={player} index={index} deletePlayer={() => questionMethods.deletePlayer(index)} />
                            ))}
                        </div> : <></>}
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
