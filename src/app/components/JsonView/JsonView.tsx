import React from 'react'
import ReactJson from 'react-json-view'
import { Container } from '@mui/material'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const JsonView = ({ data }: any) => {
  return (
    <Container>
      <ReactJson
        style={{ padding: '10px' }}
        src={data}
        name={false}
        theme={'monokai'}
        displayDataTypes={false}
      />
    </Container>
  )
}
