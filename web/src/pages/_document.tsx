import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head title="chapeira digital" />

      <body>
        <div id="loader-root" />
        <div id="modal-root" />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
