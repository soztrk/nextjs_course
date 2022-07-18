import Head from "next/head"

import '../styles/globals.css'
import Layout from "../layouts/Layout"
import { NotificationContextProvider } from "../store/NotificationContext"

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
        <title>Nextjs Events</title>
          <meta name="description" content="Find  a lot of events here." />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="keywords" content="one,two,three" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  )
}

export default MyApp
