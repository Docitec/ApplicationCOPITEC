// src/pages/_app.tsx
import "@/styles/globals.css"; // styles globaux avec Tailwind
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
