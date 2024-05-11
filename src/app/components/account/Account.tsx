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
  const [contractMethods, setContractMethods] = useState<any>([])
  const [contractAddress, setContractAddress] = useState<string>(
    '0x6631a73B266296eFf7657dCFc3D1568Ec2057Ef3'
  )

  const useContract = async () => {
    const contract = new web3.eth.Contract(abi, contractAddress)
    setContractMethods(contract.methods)
  }

  return (
    <div>
      <h2> You are connected to metamask.</h2>
      <div>
        <span>Balance: {balance}</span>
      </div>
      <button type='button' className={styles.btn} onClick={useContract}>
        Contract
      </button>
      {Object.keys(contractMethods).map((method: any) => (
        <div key={method}>{method}</div>
      ))}
    </div>
  )
}

export default Account
