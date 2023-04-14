import { Box, SxProps, TextField } from '@mui/material'
import { FunctionComponent, HTMLInputTypeAttribute } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type InputProps = {
  disabled?: boolean
  label?: string
  value?: string
  variant?: 'standard' | 'filled' | 'outlined'
  color?: 'success' | 'error'
  size?: 'small' | 'medium'
  type?: HTMLInputTypeAttribute
  error?: boolean
  helperText?: string
  onBlur?: () => void
  sx?: SxProps
  register?: UseFormRegisterReturn
}

export const InputForm: FunctionComponent<InputProps> = ({
  disabled = false,
  label,
  value,
  variant = 'outlined',
  color = 'success',
  size = 'small',
  type = 'text',
  error = false,
  helperText,
  onBlur,
  register,
  ...sx
}) => {
  return (
    <Box>
      <TextField
        disabled={disabled}
        label={label}
        value={value}
        variant={variant}
        color={color}
        size={size}
        type={type}
        error={error}
        helperText={helperText}
        onBlur={onBlur}
        {...register}
        {...sx}
      ></TextField>
    </Box>
  )
}
