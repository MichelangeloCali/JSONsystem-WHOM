import { SxProps, TextField, Theme } from '@mui/material'
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form'

interface IInputForm {
  required?: boolean
  disabled?: boolean
  label?: string
  value?: string
  size?: 'small' | 'medium'
  type?: string
  error?: boolean
  helperText?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (name: any, options?: RegisterOptions) => UseFormRegisterReturn
  handleBlur?: () => void
  sx?: SxProps<Theme>
}

export const InputForm = ({
  required = false,
  disabled = false,
  label,
  value,
  size = 'small',
  type = 'text',
  error = false,
  helperText,
  register,
  handleBlur,
  sx,
  ...props
}: IInputForm) => {
  const registerValue = label?.toUpperCase().replaceAll(/\s+/g, '_')

  return (
    <TextField
      variant="outlined"
      color="success"
      required={required}
      disabled={disabled}
      label={label}
      value={value}
      size={size}
      type={type}
      error={error}
      helperText={helperText}
      {...register(registerValue)}
      onBlur={handleBlur}
      sx={{ ...sx }}
      {...props}
    ></TextField>
  )
}
