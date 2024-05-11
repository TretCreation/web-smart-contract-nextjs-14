'use client'

import React, { FC, useEffect, useState } from 'react'
import styles from './Account.module.css'
import abi from '../../data/data'

interface IAccount {
  web3: any
  account: any
  balance: any
}

const Account: FC<IAccount> = ({ web3, account, balance }) => {
  const [isContract, setIsContract] = useState<boolean>(false)
  const [contractMethods, setContractMethods] = useState<any>([])
  const [contractAddress, setContractAddress] = useState<string>(
    '0x6631a73B266296eFf7657dCFc3D1568Ec2057Ef3'
  )

  const checkContract = async () => {
    const contract = new web3.eth.Contract(abi, contractAddress)
    try {
      if (contract) {
        setContractMethods(contract.methods)
        setIsContract(true)
      }
    } catch (error) {
      throw error
    }
  }

  const useMethod = (method: any) => {
    // contractMethods[method]().call()
    contractMethods[method]().send({ from: account })
    // console.log(contractMethods[method]().call())
    console.log(contractMethods[method]().send())
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.account}>
          <h2> You are connected to metamask.</h2>
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
          <button type='button' className={styles.btn} onClick={checkContract}>
            Go!
          </button>
        </div>
      </div>
      <div className={styles.right}>
        {isContract ? (
          Object.keys(contractMethods).map((method: any) => (
            // eslint-disable-next-line react-hooks/rules-of-hooks
            <button className={styles.btn} key={method} onClick={() => useMethod(method)}>
              {method}
            </button>
          ))
        ) : (
          <div>Contract not found!</div>
        )}
      </div>
    </div>
  )
}

export default Account
