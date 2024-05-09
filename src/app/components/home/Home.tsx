'use client'

import React from 'react'

import styles from './Home.module.css'
import Account from '../account/Account'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Web3 from 'web3'

const Home = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)

  const [isConnected, setIsConnected] = useState(false)
  const [ethBalance, setEthBalance] = useState<any>('')

  const router = useRouter()

  const detectCurrentProvider = () => {
    let provider
    if (window.ethereum) {
      provider = window.ethereum
    } else if (window.web3) {
      provider = window.web3.currentProvider
    } else {
      console.log('Non-ethereum browser detected. You should install Metamask')
    }
    return provider
  }

  // useEffect(() => {
  //   if (isConnected) {
  //     router.push('/account')
  //   }
  // }, [isConnected, router])

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider()
      if (currentProvider) {
        await currentProvider.request({ method: 'eth_requestAccounts' })
        const web3 = new Web3(currentProvider)

        const userAccount = await web3.eth.getAccounts()

        const account = userAccount[0]

        let ethBalance = await web3.eth.getBalance(account)
        setEthBalance(Number(ethBalance))
        setIsConnected(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {!isConnected ? (
        <div className={styles.login}>
          <button type='button' className={styles.btn} onClick={onConnect}>
            Login
          </button>
        </div>
      ) : (
        <div>
          <h2> You are connected to metamask.</h2>
          <div>
            <span>Balance: {Number(ethBalance)}</span>
          </div>
        </div>
      )}
    </>
  )
}

// () => router.push('/dashboard')

export default Home
