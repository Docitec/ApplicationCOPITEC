// src/pages/_app.tsx
import "@/styles/globals.css"; // styles globaux avec Tailwind
import type { AppProps } from "next/app";
import { TaskModalProvider } from "@/context/TaskModalContext"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TaskModalProvider>
      <Component {...pageProps} />
    </TaskModalProvider>
  )
}
