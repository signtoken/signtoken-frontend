import { SIGN_TOKEN_CONTRACT_ADDRESS } from "../constants"
import SignTokenABI from "../constants/abis/SignToken.abi.json"

function useContract (web3) {
    return new web3.eth.Contract(SignTokenABI, SIGN_TOKEN_CONTRACT_ADDRESS)
}

export default useContract