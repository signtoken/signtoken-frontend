import styled from "styled-components"
import Card from "./Card"
import Input from "./Input";
import Button from "./Button";
import BlurOverlay from "./BlurOverlay";
import Metamask from "../assests/img/metamask.svg";
import { CHAIN_ID } from "../constants";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import useContract from "../hooks/useContract";
import SignSuccessOverlay from "./SignSuccessOverlay";

const InputTitle = styled.p`
    color: white;
    font-weight: 300;

    & span {
        opacity: 0.7;
        font-style: italic;
        font-size: 14px;
    }
`;

const CardBody = styled.div`
    text-align: center;
    padding: 20px;
`;

const SignCardBody = styled(CardBody)`
    position: relative;
    padding: 0;
`;

const ButtonWithIcon = styled(Button)`
    margin-top: 0px;
    text-decoration: none;
    & img {
        margin-right: 10px;
        margin-top: -3px;
    }
`

function SignNameCard(props) {
    const { available, address, chainId, web3 } = props
    const [inputName, setinputName] = useState("");
    const [signedData, setsignedData] = useState(null);
    const [loading, setloading] = useState(false);
    const { addToast } = useToasts()
    const contract = useContract(web3)

    function addBSCNetwork() {
        const params = [{
            chainId: '0x38',
            chainName: 'Binance Smart Chain Mainnet',
            nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18
            },
            rpcUrls: ['https://bsc-dataseed1.binance.org/'],
            blockExplorerUrls: ['https://bscscan.com/']
        }]

        web3.currentProvider.request({ method: 'wallet_addEthereumChain', params })
            .then(() => console.log('Success'))
            .catch((error) => console.log("Error", error.message));
    }

    async function sign() {
        if(inputName.length < 5 || inputName > 255) {
            return addToast("Name must be more than 5 characters and less than 255 characters in length", {appearance: "error"})
        }

        const signId = await contract.methods.nextSignId().call()

        const params = {
            from: address,
            value: web3.utils.toWei("0.01")
        }

        contract.methods.sign(inputName).estimateGas(params).then(gasLimit => {
            setloading(true)
            contract.methods.sign(inputName).send(params).then(tx => {
                setsignedData({
                    name: inputName,
                    signId,
                    txid: tx.transactionHash
                })   
            }).catch(error => {
                setloading(false)
                addToast(error.message, {appearance: "error"})
            })
        }).catch(error => {
            const errorParsed = JSON.parse(error.message.substring(error.message.indexOf("{"), error.message.length))
            addToast(errorParsed.message, {appearance: "error"})
        })
    }

    function onClose() {
        setloading(false)
        setinputName("")
        setsignedData(null)
    }

    return (
        <Card header="Sign your name on Blockchain (BSC)">
            <SignCardBody>
                <CardBody>
                    <InputTitle>Type your name: <span>(Max 255 characters)</span></InputTitle>
                    <Input placeholder="John Kayan" style={{ width: "80%" }} onChange={(e) => setinputName(e.target.value)} value={inputName}></Input>
                    <Button onClick={sign} disabled={loading}>{loading ? "LOADING..." : "SEND TRANSACTION"}</Button>
                </CardBody>

                {(!available || !address || chainId !== CHAIN_ID) && <BlurOverlay>
                    {!available && <ButtonWithIcon as="a" href="https://metamask.io/download" target="_blank"><img src={Metamask} alt="metamask" width="24" />CONNECT WITH METAMASK</ButtonWithIcon>}
                    {(available && !address) && <ButtonWithIcon><img src={Metamask} alt="metamask" width="24" />CONNECTING...</ButtonWithIcon>}
                    {(available && address && chainId !== CHAIN_ID) && <p style={{ color: "#c0392b" }}>Wrong Network !!!</p>}
                    {(available && address && chainId !== CHAIN_ID) && <ButtonWithIcon onClick={addBSCNetwork}><img src={Metamask} alt="metamask" width="24" />ADD BSC NETWORK</ButtonWithIcon>}
                </BlurOverlay> }

                {signedData && <SignSuccessOverlay {...signedData} onClose={onClose}/>}

            </SignCardBody>
        </Card>
    )
}

export default SignNameCard