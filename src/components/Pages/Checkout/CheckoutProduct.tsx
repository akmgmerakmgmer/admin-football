import React from 'react'
import { useTranslation } from 'react-i18next'
import IconLinks from '../../Navbar/NavComponents/IconLinks'
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
type CheckoutProductProps = {
  item: {
    product: {
      _id: string
      name: string,
      nameAr: string,
      images: [string],
    },
    _id: string
    quantity: number,
    chosenColor: string,
    chosenSize: string,
    price: number,
    discount: number
  },
  deleteProduct: (itemId: string) => any,
}
export default function CheckoutProduct(props: CheckoutProductProps) {
  const { t, i18n } = useTranslation()
  const { id } = useParams()

  const deleteProduct = () => {
    props.deleteProduct(props.item._id)
  }
  return (
    <div className='flex items-start justify-between'>
      <div className='flex gap-2'>
        <img src={props.item.product.images[0]} alt={props.item.product.name} className="h-32 w-28 object-cover rounded-md" />
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col gap-1'>
            <h3 className='font-semibold'>{i18n.language === "en" ? props.item.product.name : props.item.product.nameAr}</h3>
            <div className="flex text-gray-800 text-xs">
              {props.item.chosenColor !== "default" && props.item.chosenColor && <span>{t(props.item.chosenColor.toLowerCase())}</span>}
              {!props.item.chosenSize || props.item.chosenSize !== "default" && <Divider orientation="vertical" variant="middle" flexItem />}
              {props.item.chosenSize !== "default" && props.item.chosenSize && <span>{props.item.chosenSize}</span>}
            </div>
            <span className='text-xs mt-0.5'>{t("quantity")}: {props.item.quantity}</span>
          </div>
          <div className='flex gap-1 items-center'>
            {props.item.discount > 0 && <span className='text-xs line-through'>{props.item.discount + props.item.price} {t("currency")}</span>}
            <span className='text-xs font-semibold'>{props.item.price} {t("currency")}</span>
          </div>
        </div>
      </div>
      {!id && <IconLinks title={t('deleteProduct')} iconAction={deleteProduct}><DeleteIcon color='error' /></IconLinks>}
    </div>
  )
}
