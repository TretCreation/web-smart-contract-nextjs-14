'use client'

import React from 'react'

import styles from './Home.module.css'

import { useState } from 'react'
import Web3 from 'web3'

import Account from '../account/Account'

const Home = () => {
  const [account, setAccount] = useState<string>('')
  const [isConnected, setIsConnected] = useState(false)
  const [balance, setBalance] = useState<number>(0)
  const [web3, setWeb3] = useState<any>({})

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

  const onConnect = async () => {
    const currentProvider = detectCurrentProvider()

    try {
      if (currentProvider) {
        await currentProvider.request({ method: 'eth_requestAccounts' })
        const web3 = new Web3(currentProvider)
        setWeb3(web3)

        const userAccounts = await web3.eth.getAccounts()
        const userAccount = userAccounts[0]

        if (userAccount) {
          setAccount(userAccount)

          const ethBalance = await web3.eth.getBalance(userAccount)
          setBalance(Number(ethBalance))

          setIsConnected(true)
        }
      }
    } catch (err) {
      console.error('Error connecting to MetaMask:', err)
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
        <Account web3={web3} account={account} balance={balance} />
      )}
    </>
  )
}

export default Home
