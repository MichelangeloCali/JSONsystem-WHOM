import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import CryptoJS from 'crypto-js'
import { JsonView } from '../JsonView/JsonView'
import { FormSection } from '../FormSection'
import {
  Box,
  Autocomplete,
  TextField,
  Container,
  createTheme,
  IconButton,
  InputLabel,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { InputDinamic } from '../InputDinamic'

const proxy = [
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
    .nonempty('ID é obrigatório')
    .min(4, 'ID com no mínimo 4 caracteres'),
  SISTEMA: z.string(),
  TRIBUNAL: z.string().min(4, 'Tribunal com no mínimo 4 caracteres'),
  NOME_COMPLETO: z.string().min(4, 'Nome com no mínimo 4 caracteres'),
  URL_BASE: z
    .string()
    .url('Precisa ser uma URL válida')
    .nonempty('URL Base é obrigatória')
    .min(10, 'URL Base com no mínimo 10 caracteres'),
  URL_BUSCA: z
    .string()
    .url('Precisa ser uma URL válida')
    .nonempty('URL Busca é obrigatória')
    .min(10, 'URL Busca com no mínimo 10 caracteres'),
  URL_LOGIN: z
    .string()
    .url('Precisa ser uma URL válida')
    .nonempty('URL Login é obrigatória')
    .min(8, 'URL Login com no mínimo 8 caracteres')
    .max(30, 'URL Login com no máximo 20 caracteres'),
  PROXY: z.string().optional(),
  DOMINIOS: z.array(z.string()).nonempty('Domínio é obrigatório'),
  JS: z
    .array(
      z.object({
        comando: z.string(),
        xpath: z.string(),
      })
    )
    .optional(),
  fieldDinamic: z
    .array(
      z.object({
        keyDinamic: z.string(),
        valueDinamic: z.string(),
      })
    )
    .optional(),
})

export type CreateJsonFormSchema = z.infer<typeof createJsonFormSchema>

export const Forms = () => {
  const theme = createTheme()

  const [output, setOutput] = useState<CreateJsonFormSchema>({
    ID: '',
    SISTEMA: '',
    TRIBUNAL: '',
    NOME_COMPLETO: '',
    URL_BASE: '',
    URL_BUSCA: '',
    URL_LOGIN: '',
    PROXY: '',
    DOMINIOS: [''],
    JS: [],
  })

  const {
    register,
    formState: { errors },
    control,
    getValues,
  } = useForm<CreateJsonFormSchema>({
    resolver: zodResolver(createJsonFormSchema),
    mode: 'onChange',
    defaultValues: output,
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

  const handleUpdateOutput = () => {
    const values = getValues()
    let id = ''

    const createId = () => {
      const url = values.URL_BASE
      const hashUrl = CryptoJS.SHA256(url).toString()
      const tratedUrl = url
        .replace(/^(https?:\/\/)?(www\.)?/, '')
        .replace(/\.(com\.br|com|br\/)$/, '')
        .replaceAll('.', '_')

      return tratedUrl + '_' + hashUrl.substring(0, 4)
    }

    if (values.URL_BASE && !errors.URL_BASE) {
      id = createId()
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const valuesFilter: any = { ...errors }
    for (const key in valuesFilter) {
      if (Object.prototype.hasOwnProperty.call(valuesFilter, key)) {
        valuesFilter[key] = ''
        console.log(valuesFilter)
      }
    }

    setOutput({
      ...values,
      ID: id,
      ...valuesFilter,
      SISTEMA: values.SISTEMA.toUpperCase(),
    })
  }

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
      <FormSection>
        <TextField
          disabled
          variant="outlined"
          color="success"
          label="ID"
          size="small"
          value={output.ID}
          sx={{ gridRow: 1 }}
        />

        <Autocomplete
          options={proxy}
          renderInput={(params) => (
            <TextField
              error={!!errors.SISTEMA}
              helperText={errors.SISTEMA?.message}
              color="success"
              {...params}
              label="Sistema"
              {...register('SISTEMA')}
            />
          )}
          sx={{ width: '100%', gridRow: 1 }}
          size="small"
          onBlur={handleUpdateOutput}
        />

        <TextField
          variant="outlined"
          error={!!errors.TRIBUNAL}
          helperText={errors.TRIBUNAL?.message}
          color="success"
          label="Tribunal"
          size="small"
          {...register('TRIBUNAL')}
          onBlur={handleUpdateOutput}
          sx={{ gridRow: 2, gridColumn: 'span 2' }}
        />

        <TextField
          variant="outlined"
          error={!!errors.NOME_COMPLETO}
          helperText={errors.NOME_COMPLETO?.message}
          label="Nome Completo"
          color="success"
          size="small"
          {...register('NOME_COMPLETO')}
          onBlur={handleUpdateOutput}
          sx={{ gridRow: 3, gridColumn: 'span 2' }}
        />
        <TextField
          required
          variant="outlined"
          error={!!errors.URL_BASE}
          helperText={errors.URL_BASE?.message}
          label="URL base"
          color="success"
          size="small"
          {...register('URL_BASE')}
          onBlur={handleUpdateOutput}
          sx={{ gridRow: 4, gridColumn: 'span 2' }}
        />
        <TextField
          required
          variant="outlined"
          error={!!errors.URL_BUSCA}
          helperText={errors.URL_BUSCA?.message}
          label="URL busca"
          color="success"
          size="small"
          {...register('URL_BUSCA')}
          onBlur={handleUpdateOutput}
          sx={{ gridRow: 5, gridColumn: 'span 2' }}
        />
        <TextField
          required
          variant="outlined"
          error={!!errors.URL_LOGIN}
          helperText={errors.URL_LOGIN?.message}
          label="URL login"
          color="success"
          size="small"
          {...register('URL_LOGIN')}
          onBlur={handleUpdateOutput}
          sx={{ gridRow: 6, gridColumn: 'span 2' }}
        />
        <Autocomplete
          options={proxy}
          renderInput={(params) => (
            <TextField
              error={!!errors.PROXY}
              helperText={errors.PROXY?.message}
              color="success"
              {...params}
              label="Proxy"
              {...register('PROXY')}
            />
          )}
          size="small"
          {...register('PROXY')}
          onBlur={handleUpdateOutput}
          sx={{ gridRow: 7, gridColumn: 'span 2' }}
        />

        {/* array de string */}
        <Box
          sx={{
            gridColumn: 'span 2',
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
        {errors.DOMINIOS && (
          <InputLabel
            error
            sx={{
              fontSize: '13px',
            }}
          >
            {errors.DOMINIOS?.message}
          </InputLabel>
        )}
        {fieldsDomains.map((field, index) => (
          <Box
            key={field.id}
            sx={{
              mb: 1,
              position: 'relative',
              width: '100%',
              gridColumn: 'span 2',
            }}
          >
            <TextField
              required
              variant="outlined"
              error={!!errors.DOMINIOS}
              label={`Domínio ${index + 1}`}
              color="success"
              sx={{
                width: '100%',
                marginTop: theme.spacing(1),
              }}
              size="small"
              {...register(`DOMINIOS.${index}`)}
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

        {/* Array de objetos */}
        <Box
          sx={{
            gridColumn: 'span 2',
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
                display: 'flex',
                flexDirection: 'column',
                gap: '7px',
                mb: 1,
                position: 'relative',
                width: '100%',
              }}
            >
              <TextField
                variant="outlined"
                error={!!errors.JS?.[index]?.comando}
                helperText={errors.JS?.[index]?.comando?.message}
                label={`Comando ${index + 1}`}
                color="success"
                sx={{
                  width: '100%',
                  mb: '2px',
                  mt: '2px',
                }}
                size="small"
                {...register(`JS.${index}.comando`)}
                onBlur={handleUpdateOutput}
              />
              <TextField
                variant="outlined"
                error={!!errors.JS?.[index]?.xpath}
                helperText={errors.JS?.[index]?.xpath?.message}
                label={`XPath ${index + 1}`}
                color="success"
                sx={{
                  marginTop: '20px',
                  width: '100%',
                  mt: '2px',
                }}
                size="small"
                {...register(`JS.${index}.xpath`)}
                onBlur={handleUpdateOutput}
              />
              {fieldsJS.length === 1 ? (
                <IconButton
                  disabled
                  onClick={() => removeJS(index)}
                  size="small"
                  sx={{
                    position: 'absolute',
                    right: 0,
                    bottom: '55px',
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
                    bottom: '55px',
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>

        {/* Array do campo dinamico */}
        <InputDinamic handleUpdateOutput={handleUpdateOutput} />
      </FormSection>

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

// AJUSTES
// [X]padronizar inputs
// [X]onChange atualizar JSON
// [X]sitema com uppercase
// [X]ID automatico (com tratamento e hash)
// []campo dinamico ()
// []proxy, sistema e JS com autocomplete.

//GERANDO ID AUTOMATICAMENTE

// EM PYTHON:
// name = request.name
// url_login = request.url
// url_base = "{}://{}".format(urlparse(url_login).scheme, urlparse(url_login).netloc)
// domains = [urlparse(url_login).netloc]
// filtered = filter(lambda word: word not in ['www', 'gov', 'com', 'br'], urlparse(url_login).netloc.split('.'))
// id = f"{'_'.join(filtered)}_{md5(url_login.encode()).hexdigest()[:4]}"

//PASSO A PASSO:
// 1- https://doc9.proofhub.com/
// 2- doc9.proofhub.com
// 3- doc9.proofhub
// 4- doc9_proofhub
// 5- doc9_proofhub_{hash(https://doc9.proofhub.com/)}
// 6- doc9_proofhub_5a4b
