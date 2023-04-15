import { Box, SxProps, TextField, Theme } from '@mui/material'
import {
  FunctionComponent,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from 'react'
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBlur?: any
  sx?: SxProps<Theme>
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
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (onBlur) {
      onBlur(inputValue)
    }
  }, [inputValue, onBlur])

  const handleChange = (newValue: string) => {
    if (!error) {
      setInputValue(newValue)
    }
  }

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
        onBlur={(event) => handleChange(event.target.value)}
        {...register}
        {...sx}
      ></TextField>
    </Box>
  )
}
