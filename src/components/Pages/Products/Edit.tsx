import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonLoading from '../../Loadings/ButtonLoading'
import Input from '../../TextFields/Input'
import { useNavigate, useParams } from 'react-router-dom'
import ApiLoading from '../../Loadings/ApiLoading'
import { CSSTransition } from 'react-transition-group'
import IconLinks from '../../Navbar/NavComponents/IconLinks'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useSelector } from 'react-redux'
import SelectedComponentById from '../../GeneralComponents/SelectedComponentById'
import UploadImages from '../../GeneralComponents/UploadImages'
import SingleVariation from './SingleVariation'
import { Button, Checkbox, FormControlLabel } from '@material-ui/core'
import EnteringSingleVariation from './EnteringSingleVariation'
import AddIcon from '@mui/icons-material/Add';
import AlertComponent from '../../GeneralComponents/Alert'
import axiosInstance from '../../../utilities/axiosInstance'
export default function Edit() {
    const { t } = useTranslation()
    const { id } = useParams()
    const navigate = useNavigate()
    const user = useSelector((state: any) => state.user)
    const categories = useSelector((state: any) => state.categories)
    const [subcategories, setSubcategories] = useState<any>([])
    const [brands, setBrands] = useState([])
    const [productForm, setProductForm] = useState<any>({
        name: "",
        nameAr: "",
        description: '',
        descriptionAr: '',
        category: "",
        subcategory: "",
        brand: "",
        price: null,
        stock: null,
        discount: null,
        images: [],
        variations: [],
    })
    const [errorData, setErrorData] = useState({ name: '', nameAr: '', category: '', subcategory: '', description: '', descriptionAr: '', price: '', stock: '', image: '', profit: '' })
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [rerender, setRerender] = useState(false)
    const [subcategoryError, setSubcategoryError] = useState(false)
    const [variationErrors, setVariationErrors] = useState({ color: false, size: '', price: '', stock: '' })
    const colors = ['White', 'Black', 'Red', 'Blue', 'Yellow', 'Orange', 'Gray', 'Purple', 'Silver', 'Pink', 'Green', 'Gold', 'Bronze', 'Navy-Blue', 'Burgundy', 'Mauve', 'Beige', 'Brown']
    const variations = useRef<any>([])
    const imagesRef = useRef<any>(null)
    const previousSubcategory = useRef('')
    const previousBrand = useRef('')
    useEffect(() => {
        getProduct()
    }, [])

    const editProduct = () => {
        if (productForm.affiliateProduct && productForm.profit === 0) {
            setErrorData({ ...errorData, profit: 'field_required' })
        }
        if (productForm.images.length === 0) {
            imagesRef.current.scrollIntoView({ behavior: 'smooth' });
            return setErrorData({ ...errorData, image: 'field_required' })
        }
        if (!productForm.subcategory) {
            setSubcategoryError(true)
            setTimeout(() => {
                setSubcategoryError(false)
            }, 3000)
            return;
        }
        setLoading(true)
        if (user.role === 'Seller') {
            productForm.user = user._id
            productForm.sellerName = user.username
        }
        axiosInstance.put(`products/${id}`, productForm).then(response => {
            navigate('/products')
        }).finally(() => {
            setLoading(false)
        })
    }

    const getProduct = () => {
        axiosInstance.get(`/admin-products/${id}`).then(response => {
            setProductForm({
                name: response.data.name,
                nameAr: response.data.nameAr,
                description: response.data.description,
                descriptionAr: response.data.descriptionAr,
                category: response.data.category,
                subcategory: response.data.subcategory,
                brand: response.data.brand,
                price: response.data.price,
                stock: response.data.stock,
                discount: response.data.discount,
                images: response.data.images,
                variations: response.data.variations,
                link: response.data.link,
                affiliateProduct: response.data.affiliateProduct,
                profit: response.data.profit
            })
            setSubcategories(response.data.category.subcategory)
            setBrands(response.data.subcategory.brand)
        }).finally(() => {
            setPageLoading(false)
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
            <ApiLoading loading={pageLoading} />
            <CSSTransition
                in={!pageLoading}
                timeout={300}
                classNames="default"
                unmountOnExit
            >
                <div>
                    <h2 className='text-xl'>{t("editProduct")}</h2>
                    <div className='flex flex-col gap-1'>
                        <Input value={productForm.name} label={t('productName')} inputValue={(value: string) => setProductForm({ ...productForm, name: value, nameAr: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.name)} />
                        {/* <Input value={productForm.nameAr} label={t('arabicName')} inputValue={(value: string) => setProductForm({ ...productForm, nameAr: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.nameAr)} /> */}
                        <Input textarea={true} value={productForm.description} label={t('productDesc')} inputValue={(value: string) => setProductForm({ ...productForm, description: value, descriptionAr: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.description)} />
                        {/* <Input textarea={true} value={productForm.descriptionAr} label={t('descriptionAr')} inputValue={(value: string) => setProductForm({ ...productForm, descriptionAr: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.descriptionAr)} /> */}
                        <div className='mt-5 lg:w-1/3 md:w-96 w-full'>
                            <SelectedComponentById disabled={loading} defaultValue={productForm.category._id} label={t('categories')} items={categories} callbackValue={(value) => {
                                const updatedSubcategories = categories.filter((category: any) => category._id === value)[0].subcategory
                                if (updatedSubcategories.length === 0) {
                                    previousSubcategory.current = productForm.subcategory
                                    setProductForm({ ...productForm, subcategory: '' })
                                } else {
                                    setProductForm({ ...productForm, subcategory: previousSubcategory.current })
                                }
                                setSubcategories(updatedSubcategories)
                                setProductForm({ ...productForm, category: value })
                            }} errorMessage={errorData.category ? true : false} />
                        </div>
                        <div className='mt-5 lg:w-1/3 md:w-96 w-full'>
                            <SelectedComponentById disabled={loading} defaultValue={productForm.subcategory._id} label={t('subcategories')} items={subcategories} callbackValue={(value) => {
                                const updatedBrands = subcategories.filter((subcategory: any) => subcategory._id === value)[0].brand
                                if (updatedBrands.length === 0) {
                                    previousBrand.current = productForm.brand
                                    setProductForm({ ...productForm, brand: { id: null } })
                                } else {
                                    setProductForm({ ...productForm, brand: previousBrand.current })
                                }
                                setBrands(updatedBrands)
                                setProductForm({ ...productForm, subcategory: value })
                            }} errorMessage={errorData.subcategory ? true : false} />
                        </div>
                        <div className='mt-5 lg:w-1/3 md:w-96 w-full'>
                            <SelectedComponentById disabled={loading} defaultValue={productForm.brand && productForm.brand._id || ''} label={t('brands')} items={brands} callbackValue={(value) => setProductForm({ ...productForm, brand: value })} />
                        </div>
                        {user.role !== 'Seller' && <Input value={productForm.link} label={t('affiliateLink')} inputValue={(value: any) => setProductForm({ ...productForm, link: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} />}
                        <Input value={productForm.price} inputType="number" label={t('price')} inputValue={(value: any) => setProductForm({ ...productForm, price: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.price)} />
                        <Input value={productForm.discount} inputType="number" label={t('discount')} inputValue={(value: any) => setProductForm({ ...productForm, discount: value })} width="lg:w-1/3 w-96" disabled={loading} required={false} />
                        <Input value={productForm.stock} inputType="number" label={t('quantity')} inputValue={(value: any) => setProductForm({ ...productForm, stock: value })} width="lg:w-1/3 w-96" disabled={loading} errorMessage={t(errorData.stock)} />
                        {(user.role !== 'Seller' || user._id === '64971b58b67e7566dc5b298b') && <div className='-mb-3'><FormControlLabel control={<Checkbox defaultChecked={productForm.affiliateProduct} color='primary' onChange={(e) => setProductForm({ ...productForm, affiliateProduct: e.target.checked })} />} label={t('affiliateProduct')} /></div>}
                        {productForm.affiliateProduct && <Input value={productForm.profit} label={t('profit')} inputType='number' inputValue={(value: string) => setProductForm({ ...productForm, profit: value })} width="lg:w-1/3 md:w-96 w-full" disabled={loading} errorMessage={t(errorData.profit)} />}
                        {productForm.images.length > 0 &&
                            <div className='mt-5 flex gap-3'>
                                {productForm.images.map((image: any, index: any) => {
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
                            <UploadImages imageError={errorData.image} imageUploaded={(value: any) => {
                                const allImages = productForm.images
                                for (let i in value) {
                                    allImages.push(value[i])
                                }
                                setProductForm({ ...productForm, images: allImages })
                            }} imageNotUploaded={(error: any) => { setErrorData({ ...errorData, image: error }) }} />
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
                        <button className={`w-full h-12 bg-primaryColor mt-7 text-white rounded-md`} onClick={editProduct}>
                            {loading ? <ButtonLoading loading={loading} /> : <span>{t('editProduct')}</span>}
                        </button>
                    </div>
                </div>
            </CSSTransition>
            <AlertComponent message={t('subcategory_field_required')} open={subcategoryError} error={true} />
        </div>
    )
}
