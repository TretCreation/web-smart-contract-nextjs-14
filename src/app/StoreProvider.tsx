'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect
} from '@thirdweb-dev/react'

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
    // storeRef.current.dispatch()
  }

  return (
    <ThirdwebProvider
      supportedWallets={[
        metamaskWallet({
          recommended: true
        }),
        coinbaseWallet(),
        walletConnect()
      ]}
      clientId='<your_client_id>'
    >
      <Provider store={storeRef.current}>{children}</Provider>
    </ThirdwebProvider>
  )
}
