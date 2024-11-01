import axiosInstance from "../utilities/axiosInstance"

export default function useQuestions(props: any) {
    const {
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
        setPlayersNumberError,
        setTranslateLoading,
        isDeveloper,
        developerQuestions,
        setDeveloperError
    } = props
    const addHint = () => {
        const newHintsValue = [...hints, { en: '', ar: '' }]
        setHints(newHintsValue)
    }
    return {
        getQuestionDetails: () => {
            if (id) {
                axiosInstance.get(`questions/${id}`).then((response: any) => {
                    setQuestionForm(response.data)
                    setChoices(response.data.choices)
                    setHints(response.data.hints)
                    setRerender(!rerender)
                }).finally(() => {
                    setPageLoading(false)
                })
            } else {
                setPageLoading(false)
            }
        },
        changeQuestionMode: (value: string) => {
            if ((value === 'passwordChallenge' || value === 'guessThePlayer') && !hints.length) addHint()
            setQuestionForm({ ...questionForm, questionMode: value, answer: '' })
        },
        addQuestion: () => {
            if (isDeveloper && developerQuestions.current) {
                setLoading(true)
                const payload = JSON.parse(developerQuestions.current);
                for (let i in payload) {
                    if (payload[i].hints?.length) {
                        payload[i]['questionMode'] = payload[i].hints[0].en.split(' ').length === 1 ? 'passwordChallenge' : 'guessThePlayer'
                        payload[i].question = {}
                        if (payload[i].hints[0].en.split(' ').length === 1) {
                            payload[i].question.en = 'Password Challenge'
                            payload[i].question.ar = 'كلمة السر'
                        } else {
                            payload[i].question.en = 'Guess The Player'
                            payload[i].question.ar = 'خمن اللاعب'
                        }
                    }
                    else if (payload[i].answer.en && payload[i].answer.ar) {
                        payload[i].question = {}
                        payload[i].question.en = 'Reversed Words'
                        payload[i].question.ar = 'الكلمات المعكوسة'
                        payload[i]['questionMode'] = 'reversedWords'
                    }
                    else if (payload[i].answer == 'true' || payload[i].answer == 'false') {
                        payload[i]['questionMode'] = 'trueOrFalse'
                    } else {
                        payload[i]['questionMode'] = 'multipleChoices'
                    }
                    payload[i]['mode'] = questionForm.mode || 'general'
                    payload[i]['difficulty'] = questionForm.difficulty || 'medium'
                }
                return axiosInstance.post('questions', payload).then(response => {
                }).catch(err => {
                    setDeveloperError(err.response.data.message)
                }).finally(() => {
                    setLoading(false)
                })
            }
            if (questionForm.questionMode === 'multipleChoices') {
                for (let i in choicesRef.current) {
                    if (choicesRef.current[i].en.trim() === '' || choicesRef.current[i].ar.trim() === '') return setErrorData({ ...errorData, questionMode: 'missing_choices' })
                }
            }
            if (questionForm.questionMode === 'passwordChallenge' || questionForm.questionMode === 'guessThePlayer') {
                questionForm.answer = questionForm.answer.nameEn
                for (let i in hintsRef.current) {
                    if (hintsRef.current[i].en.trim() === '' || hintsRef.current[i].ar.trim() === '') return setErrorData({ ...errorData, questionMode: 'missing_hints' })
                }
            }
            if (questionForm.questionMode === 'guessTheTeam' && !questionForm.teamImage) return setImageError('field_required')
            if (questionForm.questionMode === 'guessTheTeam' && questionForm.answer.length !== 11) return setPlayersNumberError('team_not_compelete')
            setLoading(true)

            axiosInstance.post('questions', { ...questionForm, choices: choicesRef.current, hints: hintsRef.current }).then(response => {
                navigate('/questions')
            }).catch(err => {
                setErrorData(err.response.data)
            }).finally(() => {
                setLoading(false)
            })
        },
        checkShowAnswers: () => {
            for (let i in choicesRef.current) {
                if (choicesRef.current[i].en.trim() === '' || choicesRef.current[i].ar.trim() === '') return true
            }
        },
        editQuestion: () => {
            if (questionForm.questionMode === 'multipleChoices') {
                for (let i in choicesRef.current) {
                    if (choicesRef.current[i].en.trim() === '' || choicesRef.current[i].ar.trim() === '') return setErrorData({ ...errorData, questionMode: 'missing_choices' })
                }
            }
            if (questionForm.questionMode === 'passwordChallenge' || questionForm.questionMode === 'guessThePlayer') {
                questionForm.answer = questionForm.answer.nameEn
                for (let i in hintsRef.current) {
                    if (hintsRef.current[i].en.trim() === '' || hintsRef.current[i].ar.trim() === '') return setErrorData({ ...errorData, questionMode: 'missing_hints' })
                }
            }
            if (questionForm.questionMode === 'guessTheTeam' && !questionForm.teamImage) return setImageError('field_required')
            if (questionForm.questionMode === 'guessTheTeam' && questionForm.answer.length !== 11) return setPlayersNumberError('team_not_compelete')
            setLoading(true)
            axiosInstance.put(`questions/${id}`, { ...questionForm, choices: choicesRef.current, hints: hintsRef.current }).then(response => {
                navigate('/questions')
            }).finally(() => setLoading(false))
        },
        addHint: addHint,
        showQuestion: () => {
            if (questionForm.questionMode === 'multipleChoices' || questionForm.questionMode === 'trueOrFalse') return true
            return false
        },
        showHints: () => {
            if (questionForm.questionMode === 'passwordChallenge' || questionForm.questionMode === 'guessThePlayer') return true
            return false
        },
        showPlayerSearch: () => {
            if (questionForm.questionMode === 'passwordChallenge' || questionForm.questionMode === 'guessThePlayer' || (questionForm.questionMode === 'guessTheTeam' && questionForm.teamPlayers.length < 11)) return true
            return false
        },
        choosePlayerMethod: (value: any) => {
            if (questionForm.questionMode === 'guessTheTeam' && questionForm.answer.indexOf(value.nameEn) === -1) {
                setQuestionForm({ ...questionForm, answer: [...questionForm.answer, value.nameEn], teamPlayers: [...questionForm.teamPlayers, value] })
                return
            }
            setQuestionForm({ ...questionForm, answer: value })
        },
        deletePlayer: (index: any) => {
            questionForm.teamPlayers.splice(index, 1)
            questionForm.answer.splice(index, 1)
            setQuestionForm({ ...questionForm, teamPlayers: [...questionForm.teamPlayers], answer: [...questionForm.answer] })

        },
        translate: (from: string, to: string, msg: string) => {
            setTranslateLoading(true)
            axiosInstance.post('translate', { from: from, to: to, msg: msg }).then(response => {
                if (from === 'en') setQuestionForm({ ...questionForm, question: { en: questionForm.question.en, ar: response.data } })
                else setQuestionForm({ ...questionForm, question: { en: response.data, ar: questionForm.question.ar } })
            }).finally(() => setTranslateLoading(false))
        }
    }
}