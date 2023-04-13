import { Box, SxProps, TextField } from '@mui/material'
import { FunctionComponent, HTMLInputTypeAttribute } from 'react'

type Props = {
  label?: string
  type?: HTMLInputTypeAttribute
  sx?: SxProps
  size?: number
  error?: boolean
  ref?: any
  onChange?: any
  onBluer?: any
  pattern?: RegExp
  maxLength?: number
  minLength?: number
  variant?: 'standard' | 'filled' | 'outlined' | undefined
}

export const InputForm: FunctionComponent<Props> = ({ label }) => {
  return (
    <Box>
      <TextField variant="outlined" color="success" label={label}></TextField>
    </Box>
  )
}
