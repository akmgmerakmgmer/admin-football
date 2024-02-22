import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ApiLoadingNotFixed from '../Loadings/ApiLoadingNotFixed'
import axiosInstance from '../../utilities/axiosInstance'

export default function UploadImage(props: any) {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const handleImageChange = (e: any) => {
        setLoading(true)
        let formData = new FormData()
        formData.append('image', e.target.files[0])
        formData.append('name', 'image')
        axiosInstance.post('upload-single', formData).then(response => {
            props.imageUploaded(response.data.secure_url)
        }).catch(err => {
            props.imageNotUploaded(err.response.data.error)
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <div>
            {!loading ? <div>
                <div className="relative">
                    <label htmlFor="file-input" className="flex shadow-md items-center justify-center w-full h-full p-6 border-2 bg-gray-200 rounded-lg cursor-pointer">
                        <div className="text-center">
                            <div className="text-lg font-medium text-gray-500">{t('dragImage')}</div>
                            <div className="text-gray-400">{t('or')}</div>
                            <div className="text-lg font-medium text-indigo-500 hover:text-indigo-600 cursor-pointer">{t('browseFiles')}</div>
                        </div>
                    </label>
                    <input type='file' name="image" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} />
                </div>
                {props.imageError && <span className='text-red-500 text-xs mt-1 block'>{t(props.imageError)}</span>}
            </div> : <ApiLoadingNotFixed loading={loading} />}
        </div>
    )
}