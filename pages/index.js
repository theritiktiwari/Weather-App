import React from 'react';
import Head from 'next/head'

import Search from '../Components/Search';

const index = ({ siteName, router }) => {
  return (
    <>
      <Head>
        <title>Home | {siteName}</title>
      </Head>
      <h1 className='title'>{siteName}</h1>
      <Search router={router} />
    </>
  )
}

export default index