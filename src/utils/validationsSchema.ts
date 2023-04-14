import { z } from 'zod'

export const createJsonFormSchema = z.object({
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

export type JsonFormSchema = z.infer<typeof createJsonFormSchema>
