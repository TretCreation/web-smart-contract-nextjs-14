'use client'

import React from 'react'

import styles from './Home.module.css'

import Account from '../account/Account'
import { useAccount } from 'wagmi'

const Home = () => {
  const account = useAccount()

  return (
    <div className={styles.wrapper}>
      {!account?.address ? (
        <div className={styles.container}>
          <w3m-button />
        </div>
      ) : (
        <Account />
      )}
    </div>
  )
}

export default Home
