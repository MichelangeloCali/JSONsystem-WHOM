import { ReactNode } from 'react'
import './globals.css'

export const metadata = {
  title: 'JSON system - WHOM',
  description: 'JSON generator',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
