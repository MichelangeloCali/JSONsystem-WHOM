import React from 'react'
import ReactJson from 'react-json-view'
import { Container } from '@mui/material'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const JsonView = ({ src }: any) => {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxHeight: '80vh',
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
        src={src}
        name={false}
        theme={'monokai'}
        displayDataTypes={false}
      />
    </Container>
  )
}
