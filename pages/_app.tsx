import '../styles/global.css'
import '../styles/normalize.css'
import React from 'react'
import { AppProps } from 'next/app'
import usePageView from '../hooks/usePageView'

const App = ({ Component, pageProps }: AppProps) => {
    usePageView();

    return (
        <Component {...pageProps} />
    )
}
// export const config = { amp:true }

export default App;