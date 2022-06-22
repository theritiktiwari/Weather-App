import '../styles/globals.scss';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter;
  const siteName = "Weather App";

  return <Component {...pageProps} router={router} siteName={siteName} />
}

export default MyApp
