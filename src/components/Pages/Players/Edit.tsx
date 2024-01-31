import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonLoading from '../../Loadings/ButtonLoading'
import Input from '../../TextFields/Input'
import { useNavigate, useParams } from 'react-router-dom'
import ApiLoading from '../../Loadings/ApiLoading'
import { CSSTransition } from 'react-transition-group'
import axiosInstance from '../../../utilities/axiosInstance'
export default function Edit() {
    const { t } = useTranslation()
    const { id } = useParams()
    const navigate = useNavigate()
    const [playerForm, setPlayerForm] = useState({
        nameEn: "",
        nameAr: "",
        firstName: ""
    })
    const [errorData, setErrorData] = useState({ firstName: '', nameEn: '', nameAr: '' })
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getPlayer()
    }, [])

    const editPlayer = () => {
        setLoading(true)
        axiosInstance.put(`players/${id}`, playerForm).then(response => {
            navigate('/players')
        }).catch(err => {
            setErrorData(err.response.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    const getPlayer = () => {
        axiosInstance.get(`/players/${id}`).then(response => {
            setPlayerForm({ nameEn: response.data.nameEn, nameAr: response.data.nameAr, firstName: response.data.firstName })
        }).finally(() => {
            setPageLoading(false)
        })
    }
    return (
        <div>
            <ApiLoading loading={pageLoading} />
            <CSSTransition
                in={!pageLoading}
                timeout={300}
                classNames="default"
                unmountOnExit
            >
                <div>
                    <h2 className='text-xl'>{t("editPlayer")}</h2>
                    <div className='flex flex-col gap-1'>
                        <Input value={playerForm.firstName} label={t('firstName')} inputValue={(value: string) => setPlayerForm({ ...playerForm, firstName: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.firstName)} />
                        <Input value={playerForm.nameEn} label={t('englishName')} inputValue={(value: string) => setPlayerForm({ ...playerForm, nameEn: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.nameEn)} />
                        <Input value={playerForm.nameAr} label={t('arabicName')} inputValue={(value: string) => setPlayerForm({ ...playerForm, nameAr: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.nameAr)} />
                    </div>
                    <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={editPlayer}>
                        {loading ? <ButtonLoading loading={loading} /> : <span>{t('editPlayer')}</span>}
                    </button>
                </div>
            </CSSTransition >
        </div >
    )
}
