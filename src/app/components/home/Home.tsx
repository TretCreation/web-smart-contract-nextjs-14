'use client'

import React, { useEffect } from 'react'

import styles from './Home.module.css'

import { useState } from 'react'
import Web3 from 'web3'
import { ConnectWallet, useAddress, useBalance } from '@thirdweb-dev/react'

import Account from '../account/Account'
import { useAccount, useReadContract } from 'wagmi'
import { ContractService } from '@/app/servers/contract.service'

const Home = () => {
  // const balance = useBalance()
  // const accAddress = useAddress()
  // const provider = useProv
  // const [account, setAccount] = useState<string>('')
  // const [isConnected, setIsConnected] = useState(false)
  // const [balance, setBalance] = useState<number>(0)
  // const [web3, setWeb3] = useState<any>({})

  // const detectCurrentProvider = () => {
  //   let provider: any

  //   if ((window as any).ethereum) {
  //     provider = (window as any).ethereum
  //   } else if ((window as any).web3) {
  //     provider = (window as any).web3.currentProvider
  //   } else {
  //     console.log('Non-ethereum browser detected. You should install Metamask')
  //   }

  //   return provider
  // }

  // const onConnect = async () => {
  //   const currentProvider = detectCurrentProvider()
  //   console.log('ttttt: ', currentProvider)
  // try {
  //   if (currentProvider) {
  //     await currentProvider.request({ method: 'eth_requestAccounts' })
  //     const web3 = new Web3(currentProvider)
  //     setWeb3(web3)

  //     const userAccounts = await web3.eth.getAccounts()
  //     const userAccount = userAccounts[0]

  //     if (userAccount) {
  //       setAccount(userAccount)

  //       const ethBalance = await web3.eth.getBalance(userAccount)
  //       setBalance(Number(ethBalance))

  //       setIsConnected(true)
  //     }
  //   }
  // } catch (err) {
  //   console.error('Error connecting to MetaMask:', err)
  // }
  // }

  // useEffect(() => {
  //   onConnect()
  // }, [accAddress])

  const account = useAccount()

  return (
    <div className={styles.wrapper}>
      {!account?.address ? (<w3m-button />): <Account account={account}/>}
      
      {/* <ConnectWallet /> */}
      {/* {!accAddress ? <ConnectWallet /> : <Account accAddress={accAddress} balance={balance} />} */}
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
