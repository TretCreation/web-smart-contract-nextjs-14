'use client'

import React, { FC, useEffect, useState } from 'react'
import styles from './Account.module.css'
import { ContractService } from '@/app/servers/contract.service'
import { useReadContract, useWriteContract } from 'wagmi'

const Account: FC = () => {
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
  const [trigger, setTrigger] = useState<boolean>(false)

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
      console.log('result', data)
    }
  }, [data])

  useEffect(() => {
    if (methodName) {
      setTrigger(!trigger)
    }
  }, [methodName])

  const parseContracts = async () => {
    const readMethods: string[] = []
    const writeMethods: string[] = []
    const payableMethods: string[] = []

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

  const handleReadMethodClick = (nameMethod: string) => {
    setMethodName('')
    setTimeout(() => {
      setMethodName(nameMethod)
    }, 0)
  }

  const handleWriteMethodClick = (nameMethod: string) => {
    writeContract({
      abi,
      address: contractAddress,
      functionName: nameMethod,
      args: []
    })
  }

  const handlePayableMethodClick = (nameMethod: string) => {
    writeContract({
      abi,
      address: contractAddress,
      functionName: nameMethod,
      args: [],
      value: inputValue
    })
  }

  return (
    <>
      <div className={styles.wallet}>
        <w3m-account-button />
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
      </div>
      {isContract ? (
        <>
          <div className={styles.contract}>
            <div className={styles.read}>
              <h2>Read</h2>
              <div>
                {readContracts.map((nameMethod: string) => (
                  <button
                    type='button'
                    key={nameMethod}
                    className={styles['btn-methods']}
                    onClick={() => handleReadMethodClick(nameMethod)}
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
                    onClick={() => handleWriteMethodClick(nameMethod)}
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
                      onClick={() => handlePayableMethodClick(nameMethod)}
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
          <div className={styles.contract}>Result: {result}</div>
        </>
      ) : (
        <div>Contract not found!</div>
      )}
    </>
  )
}

export default Account
