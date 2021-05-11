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
            <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@700&display=swap" rel="stylesheet" />
            <script type="text/javascript" src="https://documentcloud.adobe.com/view-sdk/main.js"></script>

        </Head>
        <body>
          <Main />
          <NextScript />
            
        </body>
      </Html>
    )
  }
}

export default MyDocument