import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/AuthContext"
import { TaskModalProvider } from "@/context/TaskModalContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "COPITEC - Cut Over Plan",
  description: "Project management tool for cut over planning",
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <TaskModalProvider>
              {children}
            </TaskModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

