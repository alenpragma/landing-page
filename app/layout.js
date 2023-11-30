import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import './globals.css'
export const metadata = {
  title: 'Goodmorning Aid',
  description: 'A trusted herbal platform in Bangladesh',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://i.postimg.cc/PJ8b3Msv/gmfav.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
