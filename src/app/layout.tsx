import { ReactNode } from 'react'
import './globals.css'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'JSON system - WHOM',
  description: 'JSON generator',
  icons: {
    icon: 'iconJSON.png',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <header>
        <div style={{ width: '100%', maxWidth: '1120px' }}>
          <Image src="/logo.png" alt="logo" width={140} height={45} />
        </div>
      </header>
      <body>{children}</body>
    </html>
  )
}
