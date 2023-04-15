import { FunctionComponent, useState } from 'react'
import { FieldArrayMethodProps, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Box,
  TextField,
  IconButton,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { zodResolver } from '@hookform/resolvers/zod'
import { createJsonFormSchema } from '@/utils/validationsSchema'

type InputDinamicSchema = z.infer<typeof createJsonFormSchema>

type InputDinamicProps = {
  handleUpdateOutput: () => void
}

export const InputDinamic: FunctionComponent<InputDinamicProps> = ({
  handleUpdateOutput,
}) => {
  const [fieldDinamic, setFieldDinamic] = useState('')
  const [keyDinamic, setKeyDinamic] = useState<FieldArrayMethodProps>()
  const [valueDinamic, setValueDinamic] = useState<FieldArrayMethodProps>()

  const {
    register,
    formState: { errors },
    control,
    getValues,
  } = useForm<InputDinamicSchema>({
    resolver: zodResolver(createJsonFormSchema),
    mode: 'onChange',
  })

  const {
    fields: fieldsDinamic,
    remove: removeFieldDinamic,
    append: appendFieldDinamic,
  } = useFieldArray({
    control,
    name: fieldDinamic,
  } as never)

  //CAMPO DINAMICO
  const [selectedValue, setSelectedValue] = useState('')
  function handleSelectChange(event: SelectChangeEvent) {
    setSelectedValue(event.target.value)
    if (selectedValue === 'chaveValor') {
      appendFieldDinamic(keyDinamic, valueDinamic)
    }
    if (selectedValue === 'arrayString') {
      console.log()
    }
  }

  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <InputLabel>Campo Dinâmico</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label="Age"
          onChange={handleSelectChange}
          size="small"
        >
          <MenuItem value={'objeto'}>Chave valor</MenuItem>
          <MenuItem value={'arrayString'}>Array de string</MenuItem>
          <MenuItem value={'arrayObjeto'}>Array de objeto</MenuItem>
        </Select>
        <InputLabel>{selectedValue}</InputLabel>
      </Box>

      {fieldsDinamic.map((field, index) => (
        <Box
          key={field.id}
          sx={{
            mb: 1,
            position: 'relative',
            width: '100%',
          }}
        >
          <TextField
            variant="outlined"
            label={`Chave dinâmica ${index + 1}`}
            color="success"
            sx={{
              width: '100%',
              mb: '2px',
              mt: '2px',
            }}
            size="small"
            onBlur={handleUpdateOutput}
          />
          <TextField
            variant="outlined"
            label={`Valor dinâmico ${index + 1}`}
            color="success"
            sx={{
              width: '100%',
              mt: '2px',
            }}
            size="small"
            onBlur={handleUpdateOutput}
          />
          {fieldsDinamic.length === 1 ? (
            <IconButton
              disabled
              onClick={() => removeFieldDinamic(index)}
              size="small"
              sx={{
                position: 'absolute',
                right: 0,
                bottom: '48px',
              }}
            >
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => removeFieldDinamic(index)}
              size="small"
              sx={{
                position: 'absolute',
                right: 0,
                bottom: '50px',
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  )
}
