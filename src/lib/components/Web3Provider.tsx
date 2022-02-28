import { initializeConnector } from '@web3-react/core'
import { EIP1193 } from '@web3-react/eip1193'
import { Actions, Connector, Provider as Eip1193Provider } from '@web3-react/types'
import { Url } from '@web3-react/url'
import { SetStateAction } from 'jotai'
import { RESET, useUpdateAtom } from 'jotai/utils'
import { injectedAtom, urlAtom, Web3ReactState } from 'lib/state/web3'
import { ReactNode, useEffect } from 'react'

interface Web3ProviderProps {
  jsonRpcEndpoint?: string
  provider?: Eip1193Provider
  children: ReactNode
}

function useConnector<T extends { new (actions: Actions, initializer: I): Connector }, I>(
  Connector: T,
  initializer: I | undefined,
  setContext: (update: typeof RESET | SetStateAction<Web3ReactState>) => void
) {
  return useEffect(() => {
    if (initializer) {
      const state = initializeConnector((actions) => new Connector(actions, initializer))
      state[0].activate()
      setContext(state)
    } else {
      setContext(RESET)
    }
  }, [Connector, initializer, setContext])
}

export default function Web3Provider({ jsonRpcEndpoint, provider, children }: Web3ProviderProps) {
  const setUrl = useUpdateAtom(urlAtom)
  useConnector(Url, jsonRpcEndpoint, setUrl)

  const setInjected = useUpdateAtom(injectedAtom)
  useConnector(EIP1193, provider, setInjected)

  return <>{children}</>
}
