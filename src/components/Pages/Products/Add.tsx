import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonLoading from '../../Loadings/ButtonLoading'
import Input from '../../TextFields/Input'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SelectedComponentById from '../../GeneralComponents/SelectedComponentById'
import UploadImages from '../../GeneralComponents/UploadImages'
import IconLinks from '../../Navbar/NavComponents/IconLinks'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Button, Checkbox, FormControlLabel } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add';
import SingleVariation from './SingleVariation'
import EnteringSingleVariation from './EnteringSingleVariation'
import { CSSTransition } from 'react-transition-group'
import ApiLoadingNotFixed from '../../Loadings/ApiLoadingNotFixed'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axiosInstance from '../../../utilities/axiosInstance'

export default function Add() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const user = useSelector((state: any) => state.user)
    const [categories, setCategories] = useState([])
    const [subcategories, setSubcategories] = useState([])
    const [initialLoading, setInitialLoading] = useState(true)
    const [brands, setBrands] = useState([])
    const variations = useRef<any>([])
    const imagesRef = useRef<any>(null)
    const [productForm, setProductForm] = useState<any>({
        name: "",
        nameAr: "",
        description: '',
        descriptionAr: '',
        category: "",
        subcategory: "",
        price: null,
        stock: null,
        discount: null,
        affiliateProduct: false,
        profit: 0,
        images: [],
        variations: [],
    })
    const [errorData, setErrorData] = useState({ name: '', nameAr: '', category: '', subcategory: '', description: '', descriptionAr: '', price: '', stock: '', image: '', profit: '' })
    const [loading, setLoading] = useState(false)
    const [rerender, setRerender] = useState(false)
    const [variationErrors, setVariationErrors] = useState({ color: false, size: '', price: '', stock: '' })
    const colors = ['White', 'Black', 'Red', 'Blue', 'Yellow', 'Orange', 'Gray', 'Purple', 'Silver', 'Pink', 'Green', 'Gold', 'Bronze', 'Navy-Blue', 'Burgundy', 'Mauve', 'Beige', 'Brown']
    useEffect(() => {

    }, [rerender])

    useEffect(() => {
        getCategories()
    }, [])


    const getCategories = () => {
        axiosInstance.get('admin-categories').then(response => {
            setCategories(response.data)
        }).finally(() => {
            setInitialLoading(false)
        })
    }
    const addProduct = () => {
        if (productForm.affiliateProduct && productForm.profit === 0) {
            setErrorData({ ...errorData, profit: 'field_required' })
        }
        // if (productForm.images.length === 0) {
        //     imagesRef.current.scrollIntoView({ behavior: 'smooth' });
        //     return setErrorData({ ...errorData, image: 'field_required' })
        // }
        setLoading(true)
        if (user.role === 'Seller') {
            productForm.user = user._id
            productForm.sellerName = user.username
            productForm.pending = true
        } else {
            productForm.user = '64971b58b67e7566dc5b298b'
            productForm.sellerName = 'Discountaty'
        }
        axiosInstance.post('products', productForm).then(response => {
            navigate('/products')
        }).catch(err => {
            window.scrollTo(0, 0)
            setErrorData(err.response.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    const addVariant = () => {
        let variantValues = {
            color: '',
            size: '',
            stock: 0,
            price: 0,
            discount: 0
        }
        variations.current.push(variantValues as never)
        setRerender(!rerender)
    }
    const submitVariant = (variation: any, index: any) => {
        if ((variation.color || variation.size) && variation.price > 0 && variation.stock) {

            if (!variation.color) {
                variation.color = 'default'
            }
            if (!variation.size) {
                variation.size = 'default'
            }
            if (productForm.variations.length > 0) {
                if ((productForm.variations[productForm.variations.length - 1].color === "default" && variation.color !== "default") || (productForm.variations[productForm.variations.length - 1].color !== "default" && variation.color === "default")) {
                    setVariationErrors({ color: true, size: '', price: '', stock: '' })
                    return;
                }
                if (productForm.variations[productForm.variations.length - 1].size === "default" && variation.size !== "default") {
                    setVariationErrors({ color: false, size: t("cannotSetSize"), price: '', stock: '' })
                    return;
                }
                if (productForm.variations[productForm.variations.length - 1].size !== "default" && variation.size === "default") {
                    setVariationErrors({ color: false, size: t("mustSetSize"), price: '', stock: '' })
                    return;
                }

            }
            variations.current.splice(index, 1)
            setRerender(!rerender)
            productForm.variations.push(variation as never)
            setVariationErrors({ color: false, size: '', price: '', stock: '' })
            return;
        } else {
            setVariationErrors({ color: variation.color || variation.size ? false : true, size: variation.color || variation.size ? '' : t("field_required"), price: !variation.price ? t("field_required") : '', stock: !variation.stock ? t("field_required") : '' })
        }

    }
    const deleteVariation = (index: any) => {
        variations.current.splice(index, 1)
        setRerender(!rerender)
    }
    const deleteProductFormVariation = (index: any) => {
        productForm.variations.splice(index, 1)
        setRerender(!rerender)
    }
    return (
        <div>
            <ApiLoadingNotFixed loading={initialLoading} />
            <CSSTransition
                in={!initialLoading}
                timeout={300}
                classNames="default"
                unmountOnExit
            >
                <div>
                    <h2 className='text-xl'>{t("addProduct")}</h2>
                    <div className='flex flex-col gap-1'>
                        <Input label={t('productName')} inputValue={(value: string) => setProductForm({ ...productForm, name: value, nameAr: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.name)} />
                        {/* <Input label={t('arabicName')} inputValue={(value: string) => setProductForm({ ...productForm, nameAr: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.nameAr)} /> */}
                        <Input textarea={true} label={t('productDesc')} inputValue={(value: string) => setProductForm({ ...productForm, description: value, descriptionAr: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.description)} />
                        {/* <Input textarea={true} label={t('descriptionAr')} inputValue={(value: string) => setProductForm({ ...productForm, descriptionAr: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.descriptionAr)} /> */}
                        <Input label={t('price')} inputType="number" inputValue={(value: any) => setProductForm({ ...productForm, price: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.price)} />
                        <Input label={t('discount')} inputType="number" inputValue={(value: any) => setProductForm({ ...productForm, discount: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} required={false} />
                        <Input label={t('quantity')} inputType="number" inputValue={(value: any) => setProductForm({ ...productForm, stock: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.stock)} />
                        <div className='mt-5 lg:w-1/3 md:w-96 w-full'>
                            <SelectedComponentById fullItem={true} disabled={loading} defaultValue={""} label={t('categories')} items={categories} callbackValue={(value) => {
                                setProductForm({ ...productForm, category: value._id })
                                setSubcategories(value.subcategory)
                            }} errorMessage={errorData.category ? true : false} />
                        </div>
                        <div className='mt-5 lg:w-1/3 md:w-96 w-full'>
                            <SelectedComponentById fullItem={true} disabled={loading} defaultValue={""} label={t('subcategories')} items={subcategories} callbackValue={(value) => {
                                setProductForm({ ...productForm, subcategory: value })
                                setBrands(value.brand)
                            }} errorMessage={errorData.subcategory ? true : false} />
                        </div>
                        <div className='mt-5 lg:w-1/3 md:w-96 w-full'>
                            <SelectedComponentById required={false} disabled={loading} defaultValue={""} label={t('brands')} items={brands} callbackValue={(value) => setProductForm({ ...productForm, brand: value })} />
                        </div>
                        {(user.role !== 'Seller' || user._id === '64971b58b67e7566dc5b298b') && <Input label={t('affiliateLink')} inputValue={(value: any) => setProductForm({ ...productForm, link: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} />}
                        {(user.role !== 'Seller' || user._id === '64971b58b67e7566dc5b298b') && <div className='-mb-3'><FormControlLabel control={<Checkbox color='primary' onChange={(e) => setProductForm({ ...productForm, affiliateProduct: e.target.checked })} />} label={t('affiliateProduct')} /></div>}
                        {productForm.affiliateProduct && <Input label={t('profit')} inputType='number' inputValue={(value: string) => setProductForm({ ...productForm, profit: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.profit)} />}
                        {productForm.images.length > 0 &&
                            <div className='mt-5 flex gap-3'>
                                {productForm.images.map((image: string, index: number) => {
                                    return (
                                        <div className='relative'>
                                            <img src={image} alt={productForm.name} className="h-36 w-36 rounded-md object-cover" />
                                            <div className='absolute top-0 ltr:left-0 rtl:right-0'>
                                                <IconLinks delete={true} title={t("delete")} iconAction={() => {
                                                    let newImages = productForm.images.filter((img: string) => img !== image)
                                                    setProductForm({ ...productForm, images: newImages })
                                                }}><RemoveCircleIcon /></IconLinks>
                                            </div>
                                            {index !== 0 && <div className='absolute top-0 ltr:right-0 rtl:left-0'>
                                                <IconLinks delete={true} title={t("makeImagePrimary")} iconAction={() => {
                                                    const currentImage = productForm.images[0]
                                                    productForm.images[0] = productForm.images[index]
                                                    productForm.images[index] = currentImage
                                                    setProductForm({ ...productForm, images: productForm.images })
                                                }}><StarBorderIcon /></IconLinks>
                                            </div>}
                                        </div>
                                    )
                                })}

                            </div>
                        }
                        <div className='mt-5' ref={imagesRef}>
                            <UploadImages imageError={''} imageUploaded={(value: any) => {
                                const allImages = productForm.images
                                for (let i in value) {
                                    allImages.push(value[i])
                                }
                                setProductForm({ ...productForm, images: allImages })
                            }} imageNotUploaded={(error: string) => { setErrorData({ ...errorData, image: error }) }} />
                        </div>
                        {variations.current.length > 0 &&
                            <div className='shadow-xl p-7 mt-5 rounded-md'>
                                {variations.current.map((variation: any, index: any) => {
                                    return (
                                        <EnteringSingleVariation
                                            colors={colors}
                                            index={index}
                                            loading={loading}
                                            submitVariant={submitVariant}
                                            variation={variation}
                                            variationErrors={variationErrors}
                                            variations={variations}
                                            deleteVariation={deleteVariation}
                                            key={index}
                                        />
                                    )
                                })}
                            </div>
                        }
                        {variations.current.length === 0 && <div className='w-auto mt-5 text-white'>
                            <Button variant="contained" color='primary' endIcon={<AddIcon color='inherit' />} onClick={addVariant}>
                                {t("addVariant")}
                            </Button>
                        </div>}
                        {productForm.variations.length > 0 &&
                            <div className='shadow-xl p-7 mt-5 rounded-md flex flex-col gap-5'>
                                {productForm.variations.map((variation: any, index: any) => {
                                    return (
                                        <SingleVariation
                                            productForm={productForm}
                                            variation={variation}
                                            index={index}
                                            deleteProductFormVariation={deleteProductFormVariation}
                                            colors={colors}
                                            loading={loading}
                                            key={index}
                                        />
                                    )
                                })}
                            </div>
                        }
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={addProduct}>
                            {loading ? <ButtonLoading loading={loading} /> : <span>{t('addProduct')}</span>}
                        </button>
                    </div>
                </div>
            </CSSTransition>

        </div>
    )
}
