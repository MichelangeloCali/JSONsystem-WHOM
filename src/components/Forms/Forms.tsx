import { useState } from 'react'
import {
  FormControl,
  Box,
  Autocomplete,
  TextField,
  Button,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { Container } from './Forms.style'

export const Forms = () => {
  const { register, handleSubmit } = useForm()
  const [output, setOutput] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setData = (data: any) => {
    setOutput(JSON.stringify(data, null, 2))
  }
  console.log(output)

  const sistemas = [
    'tjpe_pe',
    'tjma_1',
    'tjsp_2',
    'procon',
    'secretaria_fazenda',
    'sefaz_ma',
  ]

  return (
    <Container>
      <FormControl
        style={{
          display: 'flex',
          gap: '1rem',
          width: '300px',
          borderRadius: '5px',
        }}
      >
        <TextField
          type="name"
          variant="outlined"
          label="Sistemas"
          {...register('Sistemas')}
        />

        <Autocomplete
          options={sistemas}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tribunais"
              {...register('Tribunais')}
            />
          )}
          size="small"
          color="secondary"
          {...register('Tribunais')}
        />
        <Button type="submit" color="primary" onClick={handleSubmit(setData)}>
          Send
        </Button>
      </FormControl>
      <Box
        sx={{
          width: 300,
          color: 'black',
          height: 300,
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        {output}
      </Box>
    </Container>
  )
}
