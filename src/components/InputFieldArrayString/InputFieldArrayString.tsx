import { Box, IconButton, InputLabel, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  FieldValues,
  RegisterOptions,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegisterReturn,
} from 'react-hook-form'
import { FunctionComponent } from 'react'

interface IInputFieldArrayString {
  title: string
  message?: string
  fields: Record<'id', string>[]
  errors: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (name: any, options?: RegisterOptions) => UseFormRegisterReturn
  handleBlur?: () => void
  appendItem: UseFieldArrayAppend<FieldValues, string>
  removeItem: UseFieldArrayRemove
}

export const InputFieldArrayString: FunctionComponent<
  IInputFieldArrayString
> = ({
  title,
  message,
  fields,
  errors = false,
  register,
  handleBlur,
  appendItem,
  removeItem,
}) => {
  return (
    <>
      <Box
        sx={{
          gridColumn: 'span 2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          mb: '-10px',
        }}
      >
        <InputLabel required sx={{ color: '#CC6633' }}>
          {title}
        </InputLabel>
        <IconButton
          onClick={() => appendItem(' ')}
          size="small"
          sx={{
            maxWidth: 'fit-content',
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      {fields.map((field, index) => (
        <Box
          key={field.id}
          sx={{
            position: 'relative',
            width: '100%',
            gridColumn: 'span 2',
          }}
        >
          <TextField
            variant="outlined"
            error={errors}
            helperText={message}
            label={`Domínio ${index + 1}`}
            color="success"
            sx={{
              width: '100%',
            }}
            size="small"
            {...register(`DOMINIOS.${index}`)}
            onBlur={handleBlur}
          />
          {fields.length === 1 ? (
            <IconButton
              disabled
              onClick={() => removeItem(index)}
              size="small"
              sx={{
                position: 'absolute',
                right: 0,
                bottom: errors ? '27px' : '5px',
              }}
            >
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => removeItem(index)}
              size="small"
              sx={{
                position: 'absolute',
                right: 0,
                bottom: errors ? '27px' : '5px',
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
    </>
  )
}
