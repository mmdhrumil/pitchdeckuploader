import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Fira+Sans&family=Oxygen:wght@400;700&display=swap" rel="stylesheet" />

        </Head>
        <body>
          <Main />
          <NextScript />
            <script src="/__/firebase/8.4.1/firebase-app.js"></script>

            <script src="/__/firebase/8.4.1/firebase-analytics.js"></script>

            <script src="/__/firebase/init.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument