import { useEffect, useRef, useState } from "react"
import Web3 from 'web3'
import { RPC_URL } from '../constants/index'

function useWallet() {
    const [available, setAvailable] = useState(false)
    const address = useRef(false)
    const [chainId, setChainId] = useState(false)
    const web3 = useRef(new Web3(new Web3.providers.HttpProvider(RPC_URL)))
    const [balance, setBalance] = useState(0)

    async function getBalance() {
        if (!address.current) return

        const balance = await web3.current.eth.getBalance(address.current)
        setBalance(parseFloat(web3.current.utils.fromWei(balance)).toFixed(8))
    }

    useEffect(() => {
        async function checkInjected() {
            if (window.ethereum) {
                setAvailable(true)
                web3.current = new Web3(window.ethereum)
                const rpcRequest = await web3.current.currentProvider.send("eth_requestAccounts")
                address.current = rpcRequest.result[0]
                const chainId = await web3.current.eth.getChainId()
                setChainId(chainId)
                getBalance()
    
                web3.current.currentProvider.on('accountsChanged', (accounts) => {
                    address.current = accounts[0]
                    getBalance()
                });
    
                web3.current.currentProvider.on('chainChanged', (chainId) => {
                    setChainId(web3.current.utils.hexToNumber(chainId))
                    getBalance()
                });
            }
        }

        checkInjected()
    }, []);

    return { available, address: address.current, balance, chainId, web3: web3.current }
}

export default useWallet