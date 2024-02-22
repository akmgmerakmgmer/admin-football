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
        hints
    } = props
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
        addQuestion: () => {
            if (questionForm.questionMode === 'multipleChoices') {
                for (let i in choicesRef.current) {
                    if (choicesRef.current[i].en.trim() === '' || choicesRef.current[i].ar.trim() === '') return setErrorData({ ...errorData, questionMode: 'missing_choices' })
                }
            }
            if (questionForm.questionMode === 'passwordChallenge' || questionForm.questionMode === 'guessThePlayer') {
                for (let i in hintsRef.current) {
                    if (hintsRef.current[i].en.trim() === '' || hintsRef.current[i].ar.trim() === '') return setErrorData({ ...errorData, questionMode: 'missing_hints' })
                }
            }
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
            console.log(hintsRef, 'dsadsadasd')

            setLoading(true)
            axiosInstance.put(`questions/${id}`, { ...questionForm, choices: choicesRef.current, hints: hintsRef.current }).then(response => {
                navigate('/questions')
            }).finally(() => setLoading(false))
        },
        addHint: () => {
            const newHintsValue = [...hints, { en: '', ar: '' }]
            setHints(newHintsValue)
        },
        showQuestion: () => {
            if (questionForm.questionMode === 'multipleChoices' || questionForm.questionMode === 'trueOrFalse') return true
            return false
        }
    }
}