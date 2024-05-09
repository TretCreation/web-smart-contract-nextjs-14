'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { RootState } from '@reduxjs/toolkit/query'
import React, { FC, useEffect, useState } from 'react'

import Web3 from 'web3'

const Account: FC = () => {
  // const [balance, useBallance] = useState<number>(0)
  const [ethBalance, setEthBalance] = useState<any>('')

  const account = useAppSelector((state: any) => state.account.items)
  const dispatch = useAppDispatch()
  console.log(account)

  useEffect(() => {
    const data = () => {
      // let ethBalance = await web3.eth.getBalance(account)
      setEthBalance(Number(ethBalance))
    }
  }, [])
  return (
    <div>
      <h2> You are connected to metamask.</h2>
      <div>{/* <span>Balance: {Number(bbbb)}</span> */}</div>
    </div>
  )
}

export default Account
