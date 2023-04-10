import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import {
  Box,
  Autocomplete,
  TextField,
  Button,
  Container,
  createTheme,
  IconButton,
  InputLabel,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Delete, Send } from '@mui/icons-material'
import { JsonView } from '../JsonView/JsonView'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

//valores obrigatorios: ID, Sistema, url base, url login, dominios,
const sistemas = [
  'tjpe_pe',
  'tjma_1',
  'tjsp_2',
  'procon',
  'secretaria_fazenda',
  'sefaz_ma',
]

const createJsonFormSchema = z.object({
  ID: z
    .string()
    .nonempty('O ID é obrigatório')
    .min(4, 'O ID precisa de no mínimo 4 caracteres'),
  SISTEMA: z
    .string()
    .nonempty('O Sistema é obrigatório')
    .min(4, 'O Sistema precisa de no mínimo 4 caracteres'),
  TRIBUNAL: z.string().optional(),
  NOME_COMPLETO: z.string().optional(),
  URL_BASE: z
    .string()
    .url('Precisa ser uma URL válida')
    .nonempty('A URL Base é obrigatória')
    .min(10, 'A URL Base precisa de no mínimo 10 caracteres'),
  URL_BUSCA: z
    .string()
    .url('Precisa ser uma URL válida')
    .nonempty('A URL Busca é obrigatória')
    .min(10, 'A URL Busca precisa de no mínimo 10 caracteres'),
  URL_LOGIN: z
    .string()
    .url('Precisa ser uma URL válida')
    .nonempty('A URL Login é obrigatória')
    .min(10, 'A URL Login precisa de no mínimo 10 caracteres'),
  PROXY: z.string().optional(),
  DOMINIOS: z
    .array(z.string().min(10, 'O Domínio precisa de no mínimo 10 caracteres'))
    .nonempty('O Domínio é obrigatório'),
  TRIBUNAIS: z.string().optional(),
  JS: z
    .array(
      z.object({
        comando: z.string(),
        xpath: z.string(),
      })
    )
    .optional(),
})

type CreateJsonFormSchema = z.infer<typeof createJsonFormSchema>

export const Forms = () => {
  const theme = createTheme()
  const [output, setOutput] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateJsonFormSchema>({
    resolver: zodResolver(createJsonFormSchema),
  })

  const {
    fields: fieldsDomains,
    remove: removeDomain,
    append: appendDomain,
  } = useFieldArray({
    control,
    name: 'DOMINIOS',
  } as never)

  const {
    fields: fieldsJS,
    remove: removeJS,
    append: appendJS,
  } = useFieldArray({
    control,
    name: 'JS',
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreateJson = (data: any) => setOutput(data)
  const handleClearAllJson = () => setOutput('')

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: theme.spacing(3),
        width: '100%',
        maxWidth: 'md',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        borderRadius: '5px',
      }}
    >
      <form
        style={{
          backgroundColor: '#282828',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: 'sm',
          maxHeight: '80vh',
          overflowY: 'scroll',
          padding: theme.spacing(3),
          gap: '1rem',
          borderRadius: '5px',
        }}
        onSubmit={handleSubmit(handleCreateJson)}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            width: 'auto',
          }}
        >
          <TextField
            required
            variant="filled"
            color="success"
            label="ID"
            size="small"
            sx={{
              width: '100%',
            }}
            {...register('ID')}
          />

          <TextField
            required
            variant="filled"
            color="success"
            label="Sistema"
            size="small"
            sx={{
              width: '100%',
            }}
            {...register('SISTEMA')}
          />
        </Box>

        <TextField
          variant="outlined"
          color="success"
          label="Tribunal"
          size="small"
          {...register('TRIBUNAL')}
        />

        <TextField
          variant="outlined"
          label="Nome Completo"
          color="success"
          size="small"
          {...register('NOME_COMPLETO')}
        />

        <TextField
          required
          type={'url'}
          variant="standard"
          color="success"
          label="URL base"
          size="small"
          {...register('URL_BASE')}
        />

        <TextField
          required
          type="url"
          variant="standard"
          color="success"
          label="URL busca"
          size="small"
          {...register('URL_BUSCA')}
        />

        <TextField
          required
          type="url"
          variant="standard"
          color="success"
          label="URL login"
          size="small"
          {...register('URL_LOGIN')}
        />

        <TextField
          type="url"
          variant="standard"
          color="success"
          label="Proxy"
          size="small"
          {...register('PROXY')}
        />

        {/* array de string */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <InputLabel required>Domínios</InputLabel>
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
          {fieldsDomains.map((field, index) => (
            <Box
              key={field.id}
              sx={{
                mb: 1,
                position: 'relative',
                width: '100%',
              }}
            >
              <TextField
                required
                variant="standard"
                color="success"
                label={`Domínio ${index + 1}`}
                sx={{ width: '100%', marginTop: theme.spacing(1) }}
                size="small"
                {...register(`DOMINIOS.${index}`)}
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
        </Box>

        <Autocomplete
          options={sistemas}
          renderInput={(params) => (
            <TextField
              color="success"
              {...params}
              label="Tribunais"
              {...register('TRIBUNAIS')}
            />
          )}
          size="small"
          {...register('TRIBUNAIS')}
        />

        {/* Array de objetos */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <InputLabel>JS</InputLabel>
            <IconButton
              onClick={() => appendJS({ comando: '', xpath: '' })}
              size="small"
              sx={{
                maxWidth: 'fit-content',
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          {fieldsJS.map((field, index) => (
            <Box
              key={field.id}
              sx={{
                mb: 1,
                position: 'relative',
                width: '100%',
              }}
            >
              <TextField
                variant="standard"
                color="success"
                label={`Comando ${index + 1}`}
                sx={{ width: '100%' }}
                size="small"
                {...register(`JS.${index}.comando`)}
              />
              <TextField
                variant="standard"
                color="success"
                label={`XPath ${index + 1}`}
                sx={{ width: '100%' }}
                size="small"
                {...register(`JS.${index}.xpath`)}
              />
              {fieldsJS.length === 1 ? (
                <IconButton
                  disabled
                  onClick={() => removeJS(index)}
                  size="small"
                  sx={{
                    position: 'absolute',
                    right: 0,
                    bottom: '50px',
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => removeJS(index)}
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

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: theme.spacing(3),
            width: '100%',
            paddingTop: theme.spacing(3),
          }}
        >
          <Button
            variant="outlined"
            size="small"
            endIcon={<Delete />}
            color="error"
            sx={{ width: '100%', padding: theme.spacing(1) }}
            onClick={handleClearAllJson}
          >
            Limpar
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="small"
            endIcon={<Send />}
            color="success"
            sx={{ width: '100%', color: '#282828', padding: theme.spacing(1) }}
          >
            Enviar
          </Button>
        </Box>
      </form>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 'sm',
          maxHeight: '80vh',
          borderRadius: '5px',
          overflowY: 'scroll',
          backgroundColor: '#282828',
        }}
      >
        {output ? <JsonView src={output} /> : '{...}'}
      </Box>
    </Container>
  )
}

// const data = {
//   ID: string,
//   SISTEMA: string,
//   TRIBUNAL?: string,
//   NOME_COMPLETO?: string,
//   URL_BASE: 'URL',
//   URL_BUSCA: 'URL',
//   URL_LOGIN: 'URL'
//   PROXY?: 'URL'
//   DOMINIOS: [''],
//   JS?: [{}]
// }
