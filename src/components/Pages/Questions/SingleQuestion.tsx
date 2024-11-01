import React, { useState } from 'react'
import SingleCheckboxes from '../../GeneralComponents/SingleCheckboxes'
import { useTranslation } from 'react-i18next'
import EditAndDelete from '../../GeneralComponents/EditAndDelete'
type SingleQuestionProps = {
    checkBoxItems: any[],
    value: {
        _id: string,
        question: {
            en: string,
            ar: string
        },
        questionMode: string,
        answer: any
    },
    deleteFunc: (id: string) => void,
    enableFunc: (id: string) => void
}
export default function SingleQuestion(props: SingleQuestionProps) {
    const { t } = useTranslation()
    return (
        <tr>
            <SingleCheckboxes checkBoxItems={props.checkBoxItems} value={props.value} />
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.question.en}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{props.value.question.ar}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{typeof (props.value.answer) === 'string' ? (props.value.questionMode === 'passwordChallenge' || props.value.questionMode === 'guessThePlayer') ? props.value.answer : t(props.value.answer) : props.value.questionMode === 'reversedWords' ? props.value.answer.ar : 'Multiple Answers'}</div>
                </div>
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                <div>
                    <div className="font-medium text-gray-900">{t(props.value.questionMode)}</div>
                </div>
            </td>
            <EditAndDelete route={`/edit-question/${props.value._id}`} deleteFunc={() => props.deleteFunc(props.value._id)} />
        </tr>

    )
}
