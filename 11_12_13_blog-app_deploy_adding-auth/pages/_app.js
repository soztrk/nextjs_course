import {Provider} from "next-auth/client"
import Head from "next/head"

import Layout from '../components/layouts/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
