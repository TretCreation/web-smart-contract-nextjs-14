/* eslint-disable react-hooks/rules-of-hooks */
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
  const [writeContract, setWriteContract] = useState<any>([])
  const [readContract, setReadContract] = useState<any>([])
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
    // contractMethods[method]().send({ from: account })
    console.log(contractMethods)
    // console.log(contractMethods[method]().send())
  }

  useEffect(() => {
    const separateContracts = async () => {
      const readMethods: any = []
      const writeMethods: any = []

      abi.forEach(method => {
        if (method.stateMutability === 'view') {
          readMethods.push(method.name)
        } else if (method.stateMutability !== 'nonpayable') {
          writeMethods.push(method.name)
        }
      })

      setWriteContract(writeMethods)
      setReadContract(readMethods)
    }

    separateContracts()
  }, [contractMethods])

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
          <>
            <div>
              <h2>Event (send())</h2>
              {writeContract.map((contract: any) => (
                <p key={contract}>{contract}</p>
              ))}
            </div>
            <div>
              <h2>Func (call())</h2>
              {readContract.map((contract: any) => (
                <p key={contract}>{contract}</p>
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

// {isContract ? (
//   Object.keys(contractMethods).map((method: any) => (
//     <div key={method}>
//       {!method.options && (
//         <button className={styles.btn} onClick={() => useMethod(method)}>
//           {method} (call)
//         </button>
//       )}
//       {!method.address && (
//         <button className={styles.btn} onClick={() => useMethod(method)}>
//           {method} (send)
//         </button>
//       )}
//     </div>
//   ))
// ) : (
//   <div>Contract not found!</div>
// )}
