'use client'

import React from 'react'

import styles from './Home.module.css'

import Account from '../account/Account'
import { useAccount } from 'wagmi'

const Home = () => {
  const account = useAccount()

  return (
    <div className={styles.wrapper}>
      {!account?.address ? <w3m-button /> : <Account account={account} />}
    </div>
  )
}

export default Home

// <div className={styles.container}>
// <div className={styles.form}>
//   <h1 className={styles.h1}>Connect your wallet</h1>
//   <h3 className={styles.h3}>To begin, please connect your MetaMask wallet.</h3>
//   <button type='button' className={styles.btn} onClick={onConnect}>
//     Connect MetaMask
//   </button>
// </div>
// </div>
