/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import React, { FC, useEffect, useState } from 'react'
import styles from './Account.module.css'
import { ContractService } from '@/app/servers/contract.service'
import { useReadContract, useWriteContract } from 'wagmi'

interface IAccount {
  account: any
}

const Account: FC<IAccount> = ({ account }) => {
  const defaultAddress: string = '0xeDb8b1d5aFc39303eD70a0aDDf4781DA17515703'
  const { writeContract } = useWriteContract()

  const [abi, setAbi] = useState<any>([])
  const [isContract, setIsContract] = useState<boolean>(false)
  const [contractAddress, setContractAddress] = useState<string>(defaultAddress)
  const [writeContracts, setWriteContracts] = useState<any[]>([])
  const [readContracts, setReadContracts] = useState<any[]>([])
  const [payableContract, setPayableContract] = useState<any[]>([])
  const [inputValue, setInputValue] = useState<any>()
  const [result, setResult] = useState<any>()
  const [methodName, setMethodName] = useState<string>('')

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
    functionName: methodName
  })

  useEffect(() => {
    if (data !== undefined) {
      setResult(String(data))
    }
  }, [data])

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
    setReadContracts(readMethods)
    setWriteContracts(writeMethods)
  }

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
                {readContracts.map((nameMethod: string) => (
                  <button
                    type='button'
                    key={nameMethod}
                    className={styles['btn-methods']}
                    onClick={() => setMethodName(nameMethod)}
                  >
                    {nameMethod}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.write}>
              <h2>Write</h2>
              <div>
                {writeContracts.map((nameMethod: string) => (
                  <button
                    type='button'
                    key={nameMethod}
                    className={styles['btn-methods']}
                    onClick={() =>
                      writeContract({
                        abi,
                        address: contractAddress,
                        functionName: nameMethod,
                        args: []
                      })
                    }
                  >
                    {nameMethod}
                  </button>
                ))}
              </div>
              <div className={styles.payable}>
                {payableContract.map(nameMethod => (
                  <div key={nameMethod}>
                    <button
                      type='button'
                      key={nameMethod}
                      className={styles['btn-methods']}
                      onClick={() =>
                        writeContract({
                          abi,
                          address: contractAddress,
                          functionName: nameMethod,
                          args: [],
                          value: inputValue
                        })
                      }
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
