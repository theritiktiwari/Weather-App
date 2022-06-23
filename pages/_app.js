import React, { useState, useEffect } from 'react';
import '../styles/globals.scss';
import LoadingBar from 'react-top-loading-bar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const siteName = "Weather App";
  const color = "#F9E84D";

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(70)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
  }, [router]);

  return <>
    <LoadingBar
      color={color}
      height={5}
      progress={progress}
      waitingTime={800}
      onLoaderFinished={() => setProgress(0)}
    />
    <Component {...pageProps} router={router} siteName={siteName} />
  </>
}

export default MyApp
