/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import React, { FC, useEffect, useState } from 'react'
import styles from './Account.module.css'
import { ContractService } from '@/app/servers/contract.service'
import { useReadContract } from 'wagmi'

interface IAccount {
  // web3: any
  // accAddress: any
  // balance: any
  account: any
}

const Account: FC<IAccount> = ({ account }) => {
  const defaultAddress: string = '0xeDb8b1d5aFc39303eD70a0aDDf4781DA17515703'

  // const [updBalance, setUpdBalance] = useState<any>(balance)
  const [abi, setAbi] = useState<any>([])

  const [isContract, setIsContract] = useState<boolean>(false)
  // const [contractMethods, setContractMethods] = useState<any>({})
  const [contractAddress, setContractAddress] = useState<string>(defaultAddress)
  const [writeContract, setWriteContract] = useState<any[]>([])
  const [readContract, setReadContract] = useState<any[]>([])
  const [payableContract, setPayableContract] = useState<any[]>([])
  const [inputValue, setInputValue] = useState<any>()
  const [result, setResult] = useState<any>()
  // const [web3, setWeb3] = useState<any>()

  const [resWriteContract, setResWriteContract] = useState<any>()
  const [resReadContract, setResReadContract] = useState<any>()

  const useContract = async () => {
    const abiContract = await ContractService.getABI(contractAddress)
    if (abiContract) {
      setAbi(abiContract)
      setIsContract(true)
      parseContracts()
    }
  }

  const { data } = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getCount'
  })

  const getResult = () => {
    setResult(String(data))
  }

  const parseContracts = async () => {
    const readMethods: any = []
    const writeMethods: any = []
    const payableMethods: any = []

    abi.forEach((method: any) => {
      if (method.stateMutability === 'view') {
        readMethods.push(method.name)
      } else if (method.stateMutability === 'nonpayable') {
        writeMethods.push(method.name)
      } else if (method.stateMutability === 'payable') {
        payableMethods.push(method.name)
      }
    })

    setPayableContract(payableMethods)
    setReadContract(readMethods)
    setWriteContract(writeMethods)
  }

  // const writeMethod = (nameMethod: any) => {
  //   const res = contractMethods[nameMethod]().send({ from: accAddress })
  //   setResWriteContract(res)
  // }

  // const readMethods = async (nameMethod: any) => {
  //   const res = await contractMethods[nameMethod]().call()
  //   console.log('response', res)
  //   setResReadContract(res)
  // }

  // const payableMethods = async (nameMethod: any, count: number) => {
  //   contractMethods[nameMethod]().send({ from: accAddress, value: count })

  //TODO: make upd balance after payment
  //   const ethBalance = await web3.eth.getBalance(accAddress)
  //   setUpdBalance(Number(ethBalance))
  // }

  return (
    <>
      <div className={styles.wallet}>
        <w3m-button />
      </div>
      <div className={styles.search}>
        <input
          type='text'
          placeholder='Contract address'
          value={contractAddress}
          className={styles.input}
          onChange={e => setContractAddress(e.target.value)}
        />
        <button type='button' className={styles.btn} onClick={useContract}>
          Start
        </button>
        {isContract ? (
          <div className={styles.contract}>
            <div className={styles.show}>Result: {result}</div>
            <div className={styles.read}>
              <h2>Read</h2>
              <div>
                {readContract.map((nameMethod: string) => (
                  <button
                    type='button'
                    key={nameMethod}
                    className={styles['btn-methods']}
                    onClick={() => getResult()}
                  >
                    {nameMethod}
                  </button>
                ))}
              </div>
              {/* <div>Response: {resReadContract}</div> */}
            </div>
            <div className={styles.write}>
              <h2>Write</h2>
              <div>
                {writeContract.map((nameMethod: string) => (
                  <button
                    type='button'
                    key={nameMethod}
                    className={styles['btn-methods']}
                    onClick={() => getResult()}
                    // onClick={() => writeMethod(nameMethod)}
                  >
                    {nameMethod}
                  </button>
                ))}
              </div>
              {/* <div>Response: {resWriteContract}</div> */}
              <div className={styles.payable}>
                {payableContract.map(nameMethod => (
                  <div key={nameMethod}>
                    <button
                      type='button'
                      key={nameMethod}
                      className={styles['btn-methods']}
                      onClick={() => getResult()}
                      // onClick={() => payableMethods(nameMethod, inputValue)}
                    >
                      {nameMethod}
                    </button>
                    <input
                      type='text'
                      value={inputValue}
                      className={styles['input-methods']}
                      onChange={e => setInputValue(e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>Contract not found!</div>
        )}
      </div>
    </>
  )
}

export default Account
