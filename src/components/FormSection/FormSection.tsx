import { createTheme } from '@mui/material'
import React, { FunctionComponent, ReactNode } from 'react'

type FormSectionProps = {
  children?: ReactNode
}

export const FormSection: FunctionComponent<FormSectionProps> = ({
  children,
}) => {
  const theme = createTheme()

  return (
    <form
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        backgroundColor: '#282828',
        width: '100%',
        maxWidth: 'sm',
        maxHeight: '80vh',
        overflowY: 'scroll',
        padding: theme.spacing(3),
        gap: '1.5rem',
        borderRadius: '5px',
      }}
    >
      {children}
    </form>
  )
}
