import BlurOverlay from "./BlurOverlay"
import { RiCloseCircleFill } from "react-icons/ri"
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
    & .name {
        font-size: 28px;
    }
`;

function CheckSuccessOverlay(props) {

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
            <RightWrapper>
                <p className="name">Avocado</p>
            </RightWrapper>
        </BlurOverlayStyled>
    )
}

export default CheckSuccessOverlay