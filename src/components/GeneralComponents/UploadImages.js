import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ApiLoadingNotFixed from '../Loadings/ApiLoadingNotFixed'
import axiosInstance from '../../utilities/axiosInstance'

export default function UploadImages(props) {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const handleImageChange = (e) => {
        setLoading(true)
        let formData = new FormData()
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('images', e.target.files[i])
        }
        axiosInstance.post('upload-multi', formData).then(response => {
            props.imageUploaded(response.data)
        }).catch(err => {
            props.imageNotUploaded(err.response.data.error)
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <div>
            {!loading ? <div>
                <div class="relative">
                    <label for="file-input" class="flex shadow-md items-center justify-center w-full h-full p-6 bg-gray-200 rounded-lg cursor-pointer">
                        <div class="text-center">
                            <div class="text-lg font-medium text-gray-500">{t('dragImage')}</div>
                            <div class="text-gray-400">{t('or')}</div>
                            <div class="text-lg font-medium text-indigo-500 hover:text-indigo-600 cursor-pointer">{t('browseFiles')}</div>
                        </div>
                    </label>
                    <input type='file' name="images" multiple class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} />
                </div>
                {props.imageError && <span className='text-red-500 text-xs mt-1 block'>{t(props.imageError)}</span>}
            </div> : <ApiLoadingNotFixed loading={loading} />}
        </div>
    )
}