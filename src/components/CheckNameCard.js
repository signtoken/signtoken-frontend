import styled from "styled-components"
import Card from "./Card"
import Input from "./Input";
import Button from "./Button";
import CheckSuccessOverlay from "./CheckSuccessOverlay";
import useContract from "../hooks/useContract";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";

const CardBody = styled.div`
    text-align: center;
    padding: 20px;
`;

const InputTitle = styled.p`
    color: white;
    font-weight: 300;

    & span {
        opacity: 0.7;
        font-style: italic;
        font-size: 14px;
    }
`;

function CheckNameCard(props) {

    const {web3} = props

    const [inputSignId, setinputSignId] = useState("");
    const [loading, setloading] = useState(false);
    const [result, setresult] = useState(null);
    const { addToast } = useToasts()
    const contract = useContract(web3)

    async function check() {
        if(!inputSignId) {
            return addToast("Please enter signId", {appearance: "error"})
        }

        setloading(true)
        const result = await contract.methods.getNameBySignId(inputSignId).call()

        if(!result) {
            setloading(false)
            return addToast(`signId ${inputSignId} not exists`, {appearance: "error"})
        }

        setresult(result)
    }

    function close () {
        setloading(false)
        setresult(false)
    }


    return (
        <Card header="Check your name on Blockchain">
            <CardBody style={{position: "relative"}}>
                <InputTitle>Type your sign ID:</InputTitle>
                <Input style={{letterSpacing: 5, width: 125}} type="number" placeholder="1234" onChange={e => setinputSignId(e.target.value)} value={inputSignId}></Input>
                <Button style={{width: 125}} onClick={check} disabled={loading}>{loading ? "LOADING..." : "CHECK"}</Button>
                {result && <CheckSuccessOverlay onClose={close}/>}
            </CardBody>
        </Card>
    )
}

export default CheckNameCard