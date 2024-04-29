'use client'

import React from 'react'

import styles from './Home.module.css'
import Account from '../account/Account'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import detectEthereumProvider from '@metamask/detect-provider'

const Home = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const initialState = { accounts: [] }
  const [wallet, setWallet] = useState(initialState)

  const router = useRouter()

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      console.log(provider)
      // Transform provider to true or false.
      setHasProvider(Boolean(provider))
    }

    getProvider()
  }, [])

  // useEffect(() => {
  //   if (wallet.accounts.length > 0) {
  //     router.push('/account')
  //   }
  // }, [router, wallet.accounts.length])

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })
    setWallet({ accounts })
  }

  return (
    <div className={styles.wrapper}>
      <div>Injected Provider {hasProvider ? 'DOES' : 'DOES NOT'} Exist</div>

      {hasProvider /* Updated */ && (
        <button className={styles.btn} onClick={handleConnect}>
          Connect MetaMask
        </button>
      )}

      {wallet.accounts.length > 0 /* New */ && <div>Wallet Accounts: {wallet.accounts[0]}</div>}
    </div>
  )
}

// () => router.push('/dashboard')

export default Home
