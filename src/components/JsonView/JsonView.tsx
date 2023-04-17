import React from 'react'
import ReactJson from 'react-json-view'
import { Container } from '@mui/material'
import { CreateJsonFormSchema } from '@/types'

type JsonViewProps = {
  data: CreateJsonFormSchema
}

export const JsonView = ({ data }: JsonViewProps) => {
  return (
    <Container
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
      <ReactJson
        style={{
          fontSize: '14px',
          borderRadius: '5px',
          backgroundColor: '#282828',
          padding: '20px 0',
          width: '100%',
          maxHeight: '80vh',
        }}
        src={data}
        name={false}
        theme={'monokai'}
        displayDataTypes={false}
      />
    </Container>
  )
}
