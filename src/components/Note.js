import styled from "styled-components";
import { SIGN_TOKEN_CONTRACT_ADDRESS } from "../constants";

const NoteWrapper = styled.p`
    font-style: italic;
    text-align: left;
    color: white;
    opacity: 0.7;
    font-weight: 300;
    font-size: 12px;
    margin-top: 20px;

    & a {
        color: white;
    }

    & span {
        display: block;
        font-family: 'Courier New', Courier, monospace;
        margin: 5px 0px 5px 10px;
        font-size: 14px;
    }
`;

function Note() {
    return (
        <NoteWrapper>
            * SIGN token only works on BSC Network (Binance Smart Chain) <br />
            <span>Contract Address: {SIGN_TOKEN_CONTRACT_ADDRESS}</span>
            * There will be 1 SIGN minted every 1 block. When 10,072,021 SIGN is reached, no more can be minted <br />
            * You will get 1 Productivity Point when you sign a name on blockchain. The more Productivity Points you have, the more SIGN you can claim<br />
            * Click "Claim SIGN" to get your SIGN. Amount SIGN you can claim will be calculated according to the standard formula <a href="https://eips.ethereum.org/EIPS/eip-2917" target="_blank" rel="noreferrer">EIP-2917</a> <br/>
            * 0.01 BNB is the fee to pay per sign. When the total fee reaches 1 BNB will use it to buy SIGN on pancakeswap <br/>
            * Amount SIGN bought can't be transferred to another wallet
        </NoteWrapper>
    )
}

export default Note