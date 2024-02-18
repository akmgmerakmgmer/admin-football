import { Box, CircularProgress, TextField } from '@material-ui/core'
import { Autocomplete } from '@mui/material'
import React, { useState, useRef } from 'react'
import axiosInstance from '../../../utilities/axiosInstance'
import { debounce } from 'lodash'
import { useTranslation } from 'react-i18next'

type AnswerPlayerSearchProps = {
    playerCallBack: (product: any) => void,
    disabled: boolean,
    defaultValue?: any
}
export default function AnswerPlayerSearch(props: AnswerPlayerSearchProps) {
    const { t, i18n } = useTranslation()
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(false)
    const getPlayers = debounce((searchValue) => {
        setLoading(true)
        axiosInstance.get(`players?page=1&name=${searchValue}`).then(response => {
            setPlayers(response.data.player)
        }).finally(() => {
            setLoading(false)
        })
    }, 300)

    return (
        <div className='w-full'>
            <Autocomplete
                disabled={props.disabled}
                id="get-player-answer"
                defaultValue={props.defaultValue || null}
                autoHighlight
                onChange={(event: any, newValue: string | null) => props.playerCallBack(newValue)}
                loading={loading}
                options={players}
                getOptionLabel={(option: any) => i18n.language === 'en' ? option.nameEn : option.nameAr}
                renderOption={(props, option) => (
                    <Box {...props}>
                        <div className='flex gap-2 items-center'>
                            <img className='rounded-full w-8' src={option.image} />
                            <span>{i18n.language === 'en' ? option.nameEn : option.nameAr}</span>
                        </div>
                    </Box >
                )}
                renderInput={(params) => <TextField
                    variant='outlined'
                    onChange={(e) => {
                        getPlayers(e.target.value)
                    }}
                    {...params}
                    label={t('answer')}
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
