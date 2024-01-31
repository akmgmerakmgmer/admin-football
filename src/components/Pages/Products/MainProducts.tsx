import { Pagination } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import SelectedComponentById from '../../GeneralComponents/SelectedComponentById'
import Input from '../../TextFields/Input'
import Table from '../../GeneralComponents/Table'
import SingleProduct from './SingleProduct'
import AddFirstProduct from '../../GeneralComponents/AddFirstProduct'
import axiosInstance from '../../../utilities/axiosInstance'


type MainProductsProps = {
    url: string,
    query?: string,
}

export default function MainProducts(props: MainProductsProps) {
    const categorySearchRef = useRef("")
    const subcategorySearchRef = useRef("")
    const brandSearchRef = useRef("")
    const searchRef = useRef("")
    const pageNumber = useRef(1)
    const { t } = useTranslation()
    const user = useSelector((state: any) => state.user)
    const categories = useSelector((state: any) => state.categories)
    const [subcategories, setSubcategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const tableHeads = [t("name"), t("category"), t("subcategory"), t("price"), t("quantity"), t('sellerEmail'), t('numberOfViews'), t('numberOfAddToCarts'), t('status')]
    const tableHeadsAffiliate = [t("name"), t("category"), t("subcategory"), t("price"), t("quantity"), t('sellerEmail'), t('numberOfViews'), t('numberOfAddToCarts'), t('status'), t('profitAffiliateAccounts')]
    const [checkBoxItems, setCheckBoxItems] = useState([])
    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        setLoading(true)
        axiosInstance.get(`${props.url}?page=${pageNumber.current}${`&per_page=${16}`}${`&search=${searchRef.current}`}${`&category=${categorySearchRef.current}`}${`&subcategory=${subcategorySearchRef.current}`}${`&brand=${brandSearchRef.current}`}${user.role === 'Seller' ? `&user=${user._id}` : ''}`).then(response => {
            setProducts(response.data.product)
            setTotalItems(response.data.total_products)
            setItemsPerPage(response.data.per_page)
        }).finally(() => {
            setLoading(false)
            setCheckBoxItems([])
        })
    }

    const textSearch = (value: string) => {
        pageNumber.current = 1
        searchRef.current = value
    }

    const chooseCategory = async (value: string) => {
        setLoading(true)
        pageNumber.current = 1;
        categorySearchRef.current = value
        subcategorySearchRef.current = ''
        brandSearchRef.current = ''
        await axiosInstance.get(`categories/${value}`).then(response => {
            setSubcategories(response.data.subcategory)
        })
        getProducts()
    }

    const chooseSubcategory = async (value: string) => {
        setLoading(true)
        pageNumber.current = 1;
        subcategorySearchRef.current = value
        brandSearchRef.current = ''
        await axiosInstance.get(`subcategories/${value}`).then(response => {
            setBrands(response.data.brand)
        })
        getProducts()
    }

    const chooseBrand = (value: string) => {
        pageNumber.current = 1;
        brandSearchRef.current = value
        getProducts()
    }

    const changePageNumber = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scroll(0, 0)
        pageNumber.current = value;
        getProducts()
    };

    const deleteProduct = (id: string) => {
        setLoading(true)
        axiosInstance.delete(`/products/${id}`).then(response => {
            getProducts()
        })
    }

    const enableProduct = (id: string) => {
        setLoading(true)
        axiosInstance.put(`/products/${id}`, { pending: false, disabled: false }).then(response => {
            getProducts()
        })
    }

    const disableProduct = (id: string) => {
        setLoading(true)
        axiosInstance.put(`/products/${id}`, { disabled: true }).then(response => {
            getProducts()
        })
    }

    const checkAllItems = (e: any) => {
        if (e === true) {
            setCheckBoxItems([...products])
        } else {
            setCheckBoxItems([])
        }
    }
    return (
        <div>
            <div className='flex md:flex-row flex-col gap-5 mb-5 items-center mx-10'>
                <Input label={t('search')} inputValue={textSearch} width="w-full mt-0" disabled={loading} />
                <SelectedComponentById newValue={categorySearchRef.current} disabled={loading} defaultValue={""} label={t('categories')} items={categories} callbackValue={(value) => chooseCategory(value)} />
                <SelectedComponentById newValue={subcategorySearchRef.current} disabled={loading} defaultValue={""} label={t('subcategories')} items={subcategories} callbackValue={(value) => chooseSubcategory(value)} />
                <SelectedComponentById newValue={brandSearchRef.current} disabled={loading} defaultValue={""} label={t('brands')} items={brands} callbackValue={(value) => chooseBrand(value)} />
                <button className='px-10 h-12 md:w-auto w-full bg-gradient transition-all text-sm text-white rounded-md' onClick={getProducts} disabled={loading}>{t("search")}</button>
            </div>
            {products.length === 0 && !loading ?
                <AddFirstProduct />
                : <Table checkBoxItems={checkBoxItems} checkAll={checkAllItems} deleteUrl='products' reloadItems={getProducts} title={t("products")} tableHeads={(user?.role !== 'Seller' || user?._id === '64971b58b67e7566dc5b298b') ? tableHeadsAffiliate : tableHeads} loading={loading} >
                    {products.map((product: any) => (
                        <SingleProduct showAffiliateProfit={(user.role !== 'Seller' || user._id === '64971b58b67e7566dc5b298b')} showDisable={(!product.disabled && !product.pending) || (!product.disabled && user.role === 'Seller')} showEnable={(product.pending && user.role !== 'Seller') || (product.disabled && !product.pending)} enableFunc={enableProduct} disableFunc={disableProduct} key={product._id} checkBoxItems={checkBoxItems} value={product} deleteFunc={deleteProduct} />
                    ))}
                </Table>}
            <div className={`mt-7 ${loading ? "opacity-0 cursor-default" : ""}`}>
                {Math.ceil(totalItems / itemsPerPage) > 1 && <Pagination size='large' color='primary' shape='rounded' variant='outlined' count={Math.ceil(totalItems / itemsPerPage)} onChange={changePageNumber} />}
            </div>
        </div>
    )
}
