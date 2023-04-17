import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CryptoJS from 'crypto-js'
import { FormSection } from '../FormSection'
import { JsonView } from '../JsonView/JsonView'
import { InputDinamic } from '../InputDinamic'
import { proxy } from '@/utils/constants'
import { createJsonFormSchema } from '@/utils/validationsSchema'
import type { CreateJsonFormSchema } from '@/types'
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
import { InputFieldArrayString } from '../InputFieldArrayString'
import { InputForm } from '../InputForm'

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
    console.log(values)

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
        <InputForm
          disabled
          label="ID"
          value={output.ID}
          register={register}
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

        <InputForm
          label="Tribunal"
          error={!!errors.TRIBUNAL}
          helperText={errors.TRIBUNAL?.message}
          register={register}
          handleBlur={handleUpdateOutput}
          sx={{ gridRow: 2, gridColumn: 'span 2' }}
        />

        <InputForm
          label="Nome Completo"
          error={!!errors.NOME_COMPLETO}
          helperText={errors.NOME_COMPLETO?.message}
          register={register}
          handleBlur={handleUpdateOutput}
          sx={{ gridRow: 3, gridColumn: 'span 2' }}
        />

        <InputForm
          label="URL base"
          error={!!errors.URL_BASE}
          helperText={errors.URL_BASE?.message}
          register={register}
          handleBlur={handleUpdateOutput}
          sx={{ gridRow: 4, gridColumn: 'span 2' }}
        />

        <InputForm
          label="URL busca"
          error={!!errors.URL_BUSCA}
          helperText={errors.URL_BUSCA?.message}
          register={register}
          handleBlur={handleUpdateOutput}
          sx={{ gridRow: 5, gridColumn: 'span 2' }}
        />

        <InputForm
          label="URL login"
          error={!!errors.URL_LOGIN}
          helperText={errors.URL_LOGIN?.message}
          register={register}
          handleBlur={handleUpdateOutput}
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
        <InputFieldArrayString
          title="Domínios"
          message={errors.DOMINIOS?.[0]?.message}
          fields={fieldsDomains}
          errors={!!errors.DOMINIOS}
          register={register}
          handleBlur={handleUpdateOutput}
          appendItem={appendDomain}
          removeItem={removeDomain}
        />

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
              mb: '10px',
            }}
          >
            <InputLabel sx={{ color: '#CC6633' }}>JS</InputLabel>
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

      {output ? <JsonView data={output} /> : '{...}'}
    </Container>
  )
}

// AJUSTES
// [X]padronizar inputs
// [X]onChange atualizar JSON
// [X]sitema com uppercase
// [X]ID automatico (com tratamento e hash)
// [X]Componentizar array string
// []Componentizar array de objeto
// []Componentizar campo dinamico chamando a lib Monaco
// []JS com autocomplete com opcao default e opcao de escolha chamando Campo Dinamico.
// []proxy, sistema com autocomplete.
// []organizar estrutura projeto.

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
