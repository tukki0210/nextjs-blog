import '../styles/global.css'
import '../styles/normalize.css'
import React from 'react'
import { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />
}

// export const config = { amp:true }

export default App;