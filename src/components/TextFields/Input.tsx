import { TextField } from "@material-ui/core"
import { useTranslation } from "react-i18next"

type InputProps = {
    label?: string,
    inputType: string,
    placeholder?: string,
    width?: string
    inputValue: any,
    disabled: boolean,
    errorMessage: string,
    variant: any,
    value: any,
    textarea: boolean,
    required: boolean,
    minRows?: number
}
const Input = (props: InputProps) => {
    const { t } = useTranslation()
    return (
        <div className={`${props.width} mt-5`}>
            {/* <label className="font-semibold text-gray-800 mb-1 block text-xs">{props.label}</label> */}
            <TextField
                id={props.label}
                label={`${props.label}${!props.required ? ` (${t('optional')})` : ''}`}
                variant={props.variant}
                type={props.inputType}
                fullWidth
                placeholder={props.placeholder}
                onChange={(e) => props.inputValue(e.target.value.trim())}
                color="primary"
                disabled={props.disabled}
                helperText={props.errorMessage}
                error={props.errorMessage.length > 0}
                defaultValue={props.value}
                multiline={props.textarea}
                required={props.required}
                minRows={props.textarea ? '4' : '1'}
                InputLabelProps={{
                    style: {
                        fontSize: '14.5px' // Change this value to the desired font size
                    }
                }}
            />

        </div>
    )
}

Input.defaultProps = {
    inputType: 'text',
    width: 'w-96',
    disabled: false,
    errorMessage: '',
    variant: 'outlined',
    value: '',
    textarea: false,
    required: true
}

export default Input