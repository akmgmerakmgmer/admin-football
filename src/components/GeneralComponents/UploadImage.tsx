import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ApiLoadingNotFixed from '../Loadings/ApiLoadingNotFixed'
import axiosInstance from '../../utilities/axiosInstance'

export default function UploadImage(props: any) {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const handleMediaChange = (e: any) => {
        setLoading(true);
        let formData = new FormData();
        const file = e.target.files[0];

        // Append the file to formData as 'file'
        formData.append(file.type.includes('video') ? 'file' : 'image', file);
        formData.append('name', file.type.includes('video') ? 'video' : 'image');

        // Define the endpoint based on file type
        const uploadEndpoint = file.type.includes('video') ? 'upload-video' : 'upload-single';

        axiosInstance.post(uploadEndpoint, formData)
            .then(response => {
                // Notify the parent component of successful upload
                props.imageUploaded(response.data.secure_url); // This can handle both image and video URLs
            })
            .catch(err => {
                // Handle upload error
                props.imageNotUploaded(err.response?.data?.error || 'Upload failed');
            })
            .finally(() => {
                setLoading(false);
            });
    };
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
                    <input type='file' name="file" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" onChange={handleMediaChange} />
                </div>
                {props.imageError && <span className='text-red-500 text-xs mt-1 block'>{t(props.imageError)}</span>}
            </div> : <ApiLoadingNotFixed loading={loading} />}
        </div>
    )
}