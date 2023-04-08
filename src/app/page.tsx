'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Forms } from '@/app/components/Forms/Forms'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Forms />
    </ThemeProvider>
  )
}
