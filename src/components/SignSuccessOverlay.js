import BlurOverlay from "./BlurOverlay"
import { RiCheckDoubleFill, RiCloseCircleFill } from "react-icons/ri"
import styled from "styled-components"
import { useState } from "react";

const BlurOverlayStyled = styled(BlurOverlay)`
    transform: scale(0,0);
    justify-content: space-evenly;
    flex-direction: row;
`;

const CloseIcon = styled(RiCloseCircleFill)`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;

const RightWrapper = styled.div`
    text-align: center;
    & .signId {
        font-size: 32px;
    }

    & a {
        font-size: 12px;
        color: white;
    }
`;

function SignSuccessOverlay(props) {

    const [animation, setanimation] = useState("zoomIn");

    function close () {
        setanimation("zoomOut")
        setTimeout(() => {
            if(props.onClose) props.onClose()
        }, 300)
    }

    return (
        <BlurOverlayStyled animation={animation} background="rgba(0, 0, 0, .2)">
            <CloseIcon size="25" onClick={close} />
            <RiCheckDoubleFill size="100" color="rgb(54, 179, 126)" />
            <RightWrapper>
                <p className="title">"{props.name}" has been signed to the blockchain. SIGN ID:</p>
                <p className="signId">{props.signId}</p>
                <a href={`https://bscscan.com/tx/${props.txid}`} rel="noreferrer" target="_blank">{props.txid}</a>
            </RightWrapper>
        </BlurOverlayStyled>
    )
}

export default SignSuccessOverlay