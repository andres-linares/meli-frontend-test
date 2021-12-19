import Document, { Head, Html, Main, NextScript } from "next/document";

/**
 * This file was overriden in oder to include the Proxima Nova font family.
 */
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-light.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
          />
          <link
            href="https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-regular.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
          />
          <link
            href="https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-semibold.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
