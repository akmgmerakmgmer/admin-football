import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonLoading from '../../Loadings/ButtonLoading'
import Input from '../../TextFields/Input'
import UploadImage from '../../GeneralComponents/UploadImage'
import { useNavigate, useParams } from 'react-router-dom'
import ApiLoading from '../../Loadings/ApiLoading'
import { CSSTransition } from 'react-transition-group'
import IconLinks from '../../Navbar/NavComponents/IconLinks'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useSelector } from 'react-redux'
import AlertComponent from '../../GeneralComponents/Alert'
import MultipleSelect from '../../GeneralComponents/MultipleSelect'
import axiosInstance from '../../../utilities/axiosInstance'
export default function Edit() {
    const { t } = useTranslation()
    const { id } = useParams()
    const categories = useSelector((state: any) => state.categories)
    const [subcategories, setSubcategories] = useState([])
    const navigate = useNavigate()
    const [brandForm, setBrandForm] = useState<any>({
        name: "",
        nameAr: "",
        category: [],
        subcategory: [],
        image: ""
    })
    const [errorData, setErrorData] = useState({ name: '', nameAr: '', category: '', subcategory: "", image: '' })
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [subcategoryError, setSubcategoryError] = useState(false)

    useEffect(() => {
        getBrands()
    }, [])

    const editBrand = () => {
        if (!brandForm.subcategory) {
            setSubcategoryError(true)
            setTimeout(() => {
                setSubcategoryError(false)
            }, 3000)
            return;
        }
        setLoading(true)
        axiosInstance.put(`brands/${id}`, brandForm).then(response => {
            navigate('/brands')
        }).catch(err => {
            setErrorData(err.response.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    const getBrands = () => {
        axiosInstance.get(`/brands/${id}`).then(response => {
            const categoryValues: any = []
            const subcategoryValues: any = []
            const subcategories:any=[]
            response.data.category.forEach((category: any) => {
                categoryValues.push(category._id)
                subcategories.push(...category.subcategory)
            })
            response.data.subcategory.forEach((category: any) => {
                subcategoryValues.push(category._id)
            })
            setBrandForm({ name: response.data.name, nameAr: response.data.nameAr, category: categoryValues, subcategory: subcategoryValues, image: response.data.image })
            setSubcategories(subcategories)
        }).finally(() => {
            setPageLoading(false)
        })
    }

    const chooseCategory = (value: any) => {
        let currentSubcategories: any = []
        let brandFormSubcategories: any = []
        for (let i in value) {
            categories.filter((category: any) => category._id === value[i])[0].subcategory.forEach((value: any) => {
                if (brandForm.subcategory.includes(value._id)) {
                    brandFormSubcategories.push(value._id)
                }
            });
            setBrandForm({ ...brandForm, subcategory: brandFormSubcategories, category: typeof value === 'string' ? value.split(',') : value })
            currentSubcategories.push(...categories.filter((category: any) => category._id === value[i])[0].subcategory)
        }
        setSubcategories(currentSubcategories)
    }
    const chooseSubcategory = (value: any) => {
        setBrandForm({ ...brandForm, subcategory: typeof value === 'string' ? value.split(',') : value })
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
                    <h2 className='text-xl'>{t("editBrand")}</h2>
                    <div className='flex flex-col gap-1'>
                        <Input value={brandForm.name} label={t('englishName')} inputValue={(value: string) => setBrandForm({ ...brandForm, name: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.name)} />
                        <Input value={brandForm.nameAr} label={t('arabicName')} inputValue={(value: string) => setBrandForm({ ...brandForm, nameAr: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.nameAr)} />
                        <div className='mt-5 lg:w-1/3 md:w-96 w-full'>
                            <MultipleSelect defaultValue={brandForm.category} errorMessage={errorData.category ? true : false} disabled={loading} title={t('categories')} items={categories} value={brandForm.category} callbackValue={chooseCategory} />
                        </div>
                        <div className='mt-5 lg:w-1/3 md:w-96 w-full'>
                            <MultipleSelect defaultValue={brandForm.subcategory} errorMessage={errorData.subcategory ? true : false} disabled={loading} title={t('subcategories')} items={subcategories} value={brandForm.subcategory} callbackValue={chooseSubcategory} />
                        </div>
                        <div className='mt-5 relative'>
                            {brandForm.image && <div className='absolute top-0 ltr:left-0 rtl:right-0'>
                                <IconLinks delete={true} title={t("delete")} iconAction={() => {
                                    setBrandForm({ ...brandForm, image: '' })
                                }}><RemoveCircleIcon /></IconLinks>
                            </div>}
                            {brandForm.image && <img src={brandForm.image} alt={brandForm.name} className="h-36 w-36 rounded-md object-cover" />}
                            {!brandForm.image && <UploadImage imageError={errorData.image} imageUploaded={(value: any) => { setBrandForm({ ...brandForm, image: value }) }} imageNotUploaded={(error: any) => { setErrorData({ ...errorData, image: error }) }} />}
                        </div>
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={editBrand}>
                            {loading ? <ButtonLoading loading={loading} /> : <span>{t('editBrand')}</span>}
                        </button>
                    </div>
                </div>
            </CSSTransition>
            <AlertComponent message={t('subcategory_field_required')} open={subcategoryError} error={true} />
        </div>
    )
}
