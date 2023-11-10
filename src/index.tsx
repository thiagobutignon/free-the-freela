import './index.css'

import { ChakraProvider } from '@chakra-ui/react'
import { Home } from './presentation/pages/home'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { makeGetBankAccount } from './main/factories'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Home getBankAccount={makeGetBankAccount()} />
    </ChakraProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
