/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import React, { FC, useEffect, useState } from 'react'
import styles from './Account.module.css'
import { ContractService } from '@/app/servers/contract.service'

interface IAccount {
  web3: any
  account: any
  balance: any
}

const Account: FC<IAccount> = ({ web3, account, balance }) => {
  const defaultAddress: any = process.env.DEFAULT_CONTRACT_ADDRESS

  const [isContract, setIsContract] = useState<boolean>(false)
  const [contractMethods, setContractMethods] = useState<any>({})
  const [contractAddress, setContractAddress] = useState<string>(defaultAddress)
  const [abi, setAbi] = useState<any[]>([])
  const [writeContract, setWriteContract] = useState<any[]>([])
  const [readContract, setReadContract] = useState<any[]>([])

  const useContract = async () => {
    const contractAbi = await ContractService.getABI(contractAddress)
    console.log('contractAbi', contractAbi)
    const contract = new web3.eth.Contract(contractAbi, contractAddress)

    setAbi(contractAbi)
    setContractMethods(contract.methods)
    parseContracts()
    setIsContract(true)
  }

  const parseContracts = async () => {
    const readMethods: any = []
    const writeMethods: any = []
    console.log('abi', abi)

    abi.forEach((method: any) => {
      if (method.stateMutability === 'view') {
        readMethods.push(method.name)
      } else if (method.stateMutability !== 'nonpayable') {
        writeMethods.push(method.name)
      }
    })

    console.log('abi', abi)
    console.log('writeMethods', writeMethods)
    console.log('readMethods', readMethods)

    setReadContract(readMethods)
    setWriteContract(writeMethods)
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.account}>
          <h2>You are connected to Metamask.</h2>
          <div>
            <span>Balance: {balance}</span>
          </div>
        </div>
        <div className={styles.contract}>
          <input
            type='text'
            placeholder='Contract address'
            value={contractAddress}
            className={styles.input}
            onChange={e => setContractAddress(e.target.value)}
          />
          <button type='button' className={styles.btn} onClick={useContract}>
            Go!
          </button>
        </div>
      </div>
      <div className={styles.right}>
        {isContract ? (
          <>
            <div>
              <h2>Event #send()</h2>
              {Object.keys(writeContract).map((method: string) => (
                <p key={method}>{method}</p>
              ))}
            </div>
            <div>
              <h2>Function #call()#</h2>
              {Object.keys(readContract).map((method: string) => (
                <p key={method}>{method}</p>
              ))}
            </div>
          </>
        ) : (
          <div>Contract not found!</div>
        )}
      </div>
    </div>
  )
}

export default Account

// useEffect(() => {
//   const separateContracts = async () => {
//     const readMethods: any = []
//     const writeMethods: any = []

//     abi.forEach((method: any) => {
//       if (method.stateMutability === 'view') {
//         readMethods.push(method.name)
//       } else if (method.stateMutability !== 'nonpayable') {
//         writeMethods.push(method.name)
//       }
//     })

//     setWriteContract(writeMethods)
//     setReadContract(readMethods)
//   }
//   separateContracts()
// }, [contractMethods])

// const useMethod = (method: any) => {
//   contractMethods[method]().call()
//   contractMethods[method]().send({ from: account })
//   console.log(contractMethods)
//   console.log(contractMethods[method]().call())
//   console.log(contractMethods[method]().send())
// }
