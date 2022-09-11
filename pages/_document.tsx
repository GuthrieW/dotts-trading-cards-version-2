import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href={'public/favicon.svg'} />
        </Head>
        <body className="m-0 bg-neutral-700 text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
