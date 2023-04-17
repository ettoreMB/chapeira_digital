/* eslint-disable react/no-unknown-property */

import { LojaSiglaProvider } from '@/contexts/lojaSiglaContext'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from '../styles/global'
import { defaultTheme } from '../styles/themes/default'
import ToastContainer from '@/components/Toast/ToastContainer'
import { AuthProvider } from '@/contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <ToastContainer />
        <LojaSiglaProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </LojaSiglaProvider>
        <GlobalStyle />
      </ThemeProvider>
    </>
  )
}
