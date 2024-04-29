import React, { FC } from 'react'

interface IAccount {
  wallet: any
}

const Account: FC<IAccount> = wallet => {
  return <div>Account</div>
}

export default Account
