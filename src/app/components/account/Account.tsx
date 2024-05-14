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
  // const defaultAddress: any = process.env.DEFAULT_CONTRACT_ADDRESS
  const defaultAddress: string = '0xeDb8b1d5aFc39303eD70a0aDDf4781DA17515703'

  const [isContract, setIsContract] = useState<boolean>(false)
  const [contractMethods, setContractMethods] = useState<any>({})
  const [contractAddress, setContractAddress] = useState<string>(defaultAddress)
  const [abi, setAbi] = useState<any[]>([])
  const [writeContract, setWriteContract] = useState<any[]>([])
  const [readContract, setReadContract] = useState<any[]>([])
  const [payableContract, setPayableContract] = useState<any[]>([])
  const [inputValue, setInputValue] = useState<any>()

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
    const payableMethods: any = []

    console.log('abi', abi)

    abi.forEach((method: any) => {
      if (method.stateMutability === 'view') {
        readMethods.push(method.name)
      } else if (method.stateMutability === 'nonpayable') {
        writeMethods.push(method.name)
      } else if (method.stateMutability === 'payable') {
        payableMethods.push(method.name)
      }
    })

    console.log('abi', abi)
    console.log('writeMethods', writeMethods)
    console.log('readMethods', readMethods)
    console.log('payableMethods', payableMethods)

    setPayableContract(payableMethods)
    setReadContract(readMethods)
    setWriteContract(writeMethods)
  }

  const writeMethod = (nameMethod: any) => {
    contractMethods[nameMethod]().send({ from: account })
  }

  const readMethods = (nameMethod: any) => {
    console.log(contractMethods[nameMethod]().call())
    contractMethods[nameMethod]().call()
  }

  const payableMethods = (nameMethod: any, count: number) => {
    contractMethods[nameMethod]().send({ from: account, value: count })
    // console.log(contractMethods[nameMethod]().send({ from: account, value: count }))
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
              <h2>Event</h2>
              {writeContract.map((nameMethod: string) => (
                <button type='button' key={nameMethod} onClick={() => writeMethod(nameMethod)}>
                  {nameMethod}
                </button>
              ))}
            </div>
            <div>
              <h2>Function</h2>
              {readContract.map((nameMethod: string) => (
                <button type='button' key={nameMethod} onClick={() => readMethods(nameMethod)}>
                  {nameMethod}
                </button>
              ))}
            </div>
            <div>
              <h2>Payable</h2>
              {payableContract.map(nameMethod => (
                <button
                  type='button'
                  key={nameMethod}
                  onClick={() => payableMethods(nameMethod, inputValue)}
                >
                  {nameMethod}
                </button>
              ))}
              <input type='text' value={inputValue} onChange={e => setInputValue(e.target.value)} />
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
