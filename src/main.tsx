import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { NhostProvider } from '@nhost/react'
import { nhost } from './lib/nhost.ts'
import { AuthProvider } from './providers/AuthProvider.tsx'
import { ThemeProvider } from './providers/ThemeProvider.tsx'
import { ApolloProvider } from '@apollo/client'
import client from './lib/apolloClient.ts'
import { ChatApp } from './components/chatapp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApolloProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
