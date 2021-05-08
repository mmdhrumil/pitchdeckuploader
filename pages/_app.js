import '../styles/globals.css'
import { ToastProvider } from 'react-toast-notifications';

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={2500}
      placement="top-right"
    >
      <Component {...pageProps} />
    </ToastProvider>
  )
}

export default MyApp
