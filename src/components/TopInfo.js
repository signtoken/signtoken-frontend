import { Col, Row } from "react-bootstrap"
import styled from "styled-components"
import Card from "./Card"
import { RiWallet3Fill, RiParkingBoxFill, RiHandCoinFill } from "react-icons/ri"
import SignLogo from "../assests/img/logo50x50.png"
import Button from "./Button"
import { CHAIN_ID } from "../constants"
import { useEffect, useRef, useState } from "react"
import useContract from "../hooks/useContract"
import AnimatedNumber from "react-animated-numbers"
import { useToasts } from "react-toast-notifications"

const CardBody = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
`;

const WrapperText = styled.div`
    text-align: right;
    width: 80%;

    & .address {
        font-weight: 300;
        margin-bottom: 5px;
    }

    & .balance {
        font-weight: 300;
        margin-bottom: 0;
    }

    & .title {
        margin-bottom: 5px;
    }
`;

const AnimatedNumberWrapper = styled.div`
    & > div {
        display: inline-flex !important;
        margin-right: 5px;
    }
`;

const ButtonStyled = styled(Button)`
    margin: 0;
    display: inline-block;
    font-size: 12px;
    padding: 5px 20px;
`;

function TopInfo(props) {
    const { address, chainId, balance, web3 } = props
    const [signBalance, setsignBalance] = useState(0);
    const [productivity, setproductivity] = useState(0);
    const [canClaim, setcanClaim] = useState(0);
    const [loading, setloading] = useState(false);
    const contract = useContract(web3)
    const interval = useRef(null)

    const {addToast} = useToasts()

    useEffect(() => {
        async function getInfo() {
            if (!address) return;

            const signBalance = await contract.methods.balanceOf(address).call()
            setsignBalance(web3.utils.fromWei(signBalance))

            const productivity = await contract.methods.getProductivity(address).call()
            setproductivity(parseInt(productivity["0"]))

            const canClaim = await contract.methods.takeWithAddress(address).call()
            setcanClaim(web3.utils.fromWei(canClaim))

            if(parseInt(productivity["0"]) > 0) {
                interval.current = setInterval(async () => {
                    const canClaim = await contract.methods.takeWithAddress(address).call()
                    setcanClaim(web3.utils.fromWei(canClaim))
                }, 3000)
            }
        }

        getInfo()

        return () => {
            if(interval.current) clearInterval(interval.current)
        };
    }, [address, contract, web3]);

    async function claim () {
        if(parseFloat(canClaim) <= 0) return addToast("Not enough SIGN to claim", {appearance: "error"})

        setloading(true)

        contract.methods.claim().send({
            from: address
        }).then(tx => {
            setloading(false)
            const claimedAmount = web3.utils.fromWei(tx.events.Claim.returnValues.amount)
            addToast(`Claimed ${claimedAmount} SIGN`, {appearance: "success"})
        }).catch(error => {
            setloading(false)
            addToast(error.message, {appearance: "error"})
        })
    }

    if (!address || chainId !== CHAIN_ID) return null

    return (
        <Row>
            <Col md={5} xs={12}>
                <Card hideBoxShadow={true}>
                    <CardBody>
                        <RiWallet3Fill size={50} color="#be9a5c" />
                        <WrapperText>
                            <p className="address text-truncate">{address}</p>
                            <p className="balance text-truncate">{balance} BNB</p>
                        </WrapperText>
                    </CardBody>
                </Card>
            </Col>
            <Col md={7} xs={12}>
                <Row>
                    <Col md={4} xs={12}>
                        <Card hideBoxShadow={true}>
                            <CardBody>
                                <img src={SignLogo} alt="sign-logo"></img>
                                <WrapperText>
                                    <p className="title text-truncate">SIGN Balance</p>
                                    <p className="balance text-truncate">{signBalance} SIGN</p>
                                </WrapperText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4} xs={12}>
                        <Card hideBoxShadow={true}>
                            <CardBody>
                                <RiParkingBoxFill size={50} color="#be9a5c" />
                                <WrapperText>
                                    <p className="title text-truncate">Productivity Points</p>
                                    <p className="balance text-truncate">{productivity}</p>
                                </WrapperText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4} xs={12}>
                        <Card hideBoxShadow={true}>
                            <CardBody>
                                <RiHandCoinFill size={50} color="#be9a5c" />
                                <WrapperText>
                                    <AnimatedNumberWrapper>
                                        <AnimatedNumber
                                            fontStyle={{ fontStyle: "Open Sans", fontSize: 16 }}
                                            animateToNumber={parseFloat(canClaim).toFixed(2)}
                                            includeComma
                                            config={{ tension: 89, friction: 40 }}
                                            animationType={"calm"}
                                        />
                                        <span className="afterAnimatedNumber">SIGN</span>
                                    </AnimatedNumberWrapper>
                                    <ButtonStyled onClick={claim} disabled={loading}>{loading ? "Loading..." : "Claim SIGN"}</ButtonStyled>
                                </WrapperText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default TopInfo