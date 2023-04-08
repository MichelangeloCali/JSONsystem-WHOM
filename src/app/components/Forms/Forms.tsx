import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  Box,
  Autocomplete,
  TextField,
  Button,
  Container,
  createTheme,
} from '@mui/material'

export const Forms = () => {
  const theme = createTheme()
  const { register, handleSubmit } = useForm()
  const [output, setOutput] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setData = (data: any) => {
    setOutput(JSON.stringify(data, null, 2))
  }
  console.log(output)

  //valores obrigatorios: ID, Sistema, url base, url login, dominios,
  const sistemas = [
    'tjpe_pe',
    'tjma_1',
    'tjsp_2',
    'procon',
    'secretaria_fazenda',
    'sefaz_ma',
  ]

  return (
    <Container
      sx={{
        maxWidth: 'sm',
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(4),
        padding: theme.spacing(2.5),
        borderRadius: '5px',
        backgroundColor: '#282828',
      }}
    >
      <FormControl
        style={{
          display: 'flex',
          gap: '1rem',
          borderRadius: '5px',
        }}
        sx={{ maxWidth: 'sm' }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            width: 'auto',
          }}
        >
          <TextField
            type="name"
            variant="outlined"
            label="Sistemas"
            {...register('Sistemas')}
            size="small"
          />

          <TextField
            type="name"
            variant="outlined"
            label="Sistemas"
            {...register('Sistemas')}
            size="small"
          />
        </Box>

        <TextField
          type="name"
          variant="outlined"
          label="Sistemas"
          {...register('Sistemas')}
        />

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
          color: 'black',
          height: 300,
          backgroundColor: 'white',
          maxWidth: 'sm',
        }}
      >
        {output}
      </Box>
    </Container>
  )
}
