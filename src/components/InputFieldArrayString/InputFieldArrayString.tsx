import { Box, IconButton, InputLabel, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegisterReturn,
} from 'react-hook-form'

type InputFieldArrayStringProps = {
  name: string
  domains?: object
  message?: string
  fieldsDomains: Record<'id', string>[]
  error: boolean
  register: UseFormRegisterReturn<string>
  handleUpdateOutput: () => void
  appendDomain: UseFieldArrayAppend<FieldValues, string>
  removeDomain: UseFieldArrayRemove
}

export const InputFieldArrayString = ({
  name,
  domains,
  message,
  fieldsDomains,
  error,
  register,
  handleUpdateOutput,
  appendDomain,
  removeDomain,
}: InputFieldArrayStringProps) => {
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
          {name}
        </InputLabel>
        <IconButton
          onClick={() => appendDomain(' ')}
          size="small"
          sx={{
            maxWidth: 'fit-content',
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      {domains && (
        <InputLabel
          error
          sx={{
            fontSize: '13px',
          }}
        >
          {message}
        </InputLabel>
      )}
      {fieldsDomains.map((field, index) => (
        <Box
          key={index}
          sx={{
            position: 'relative',
            width: '100%',
            gridColumn: 'span 2',
          }}
        >
          <TextField
            required
            variant="outlined"
            error={error}
            label={`Domínio ${index + 1}`}
            color="success"
            sx={{
              width: '100%',
            }}
            size="small"
            {...register}
            onBlur={handleUpdateOutput}
          />
          {fieldsDomains.length === 1 ? (
            <IconButton
              disabled
              onClick={() => removeDomain(index)}
              size="small"
              sx={{
                position: 'absolute',
                right: 0,
                bottom: '5px',
              }}
            >
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => removeDomain(index)}
              size="small"
              sx={{
                position: 'absolute',
                right: 0,
                bottom: '5px',
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
