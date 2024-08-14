import '@/assets/main.css'
import '@/assets/chrome-bug.css'

import { Caveat, Inter, Lora } from 'next/font/google'
// import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
})
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${(inter.variable, lora.variable, caveat.variable)}`}
    >
      <body className="text-gray-800 antialiased dark:bg-black dark:text-gray-400">
        {/* <ManagedUIContext> */}
        {/* <Providers>{children}</Providers> */}
        {children}
        {/* </ManagedUIContext> */}
      </body>
    </html>
  )
}
