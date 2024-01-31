import { CircularProgress, TextField } from '@material-ui/core'
import { Autocomplete } from '@mui/material'
import React, { useState, useRef } from 'react'
import axiosInstance from '../../../utilities/axiosInstance'
import { debounce } from 'lodash'
import { useTranslation } from 'react-i18next'

type ProductSearchProduct = {
    productCallback: (product: any) => void,
    multiChoice: boolean,
    disabled: boolean,
    defaultValue?: any
}
export default function ProductSearch(props: ProductSearchProduct) {
    const { t } = useTranslation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const getProducts = debounce((searchValue) => {
        setLoading(true)
        axiosInstance.get(`products-admin?search=${searchValue}`).then(response => {
            setProducts(response.data.product)
        }).finally(() => {
            setLoading(false)
        })
    }, 300)

    return (
        <div className='mt-5 lg:w-1/3 w-96'>
            <Autocomplete
                disabled={props.disabled}
                defaultValue={props.defaultValue}
                id="combo-box-demo"
                onChange={(event: any, newValue: string | null) => {
                    if (newValue && props.multiChoice) {
                        props.productCallback(newValue)
                        return;
                    }
                    if (!props.multiChoice) {
                        props.productCallback(newValue)
                    }
                }}
                loading={loading}
                options={products}
                getOptionLabel={(option: any) => option.nameAr}
                renderInput={(params) => <TextField
                    variant='outlined'
                    onChange={(e) => {
                        getProducts(e.target.value)
                    }}
                    {...params}
                    label={t('addProduct')}
                    InputLabelProps={{
                        style: {
                            fontSize: '14.5px' // Change this value to the desired font size
                        }
                    }}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="primary" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />}
            />
        </div>
    )
}
