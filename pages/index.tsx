import React from 'react';
import Head from 'next/head';
import styles from '../styles/BlockList.module.scss';
import BlocksList from '../components/BlocksList';

export default function Home() {
  return (
    <>
      <Head>
        <title>Frontent Challenge App</title>
        <link rel="preconnect" href="https://db.onlinewebfonts.com" />
        <link
          href="//db.onlinewebfonts.com/c/1868e326d3ee28e5395f6efa2bc037bf?family=Eina01-Regular"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <div className={styles.container}>
        <h1>
          <img src="/moonbeam-logo.webp" />
        </h1>
        <BlocksList />
      </div>
    </>
  );
}
