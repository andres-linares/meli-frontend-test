import "../styles/reset.sass";
import "../styles/globals.sass";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Mercado Libre</title>
        <meta
          name="description"
          content="Compre productos con Envío Gratis en el día en Mercado Libre. Encuentre miles de marcas y productos a precios increíbles."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
