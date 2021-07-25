import styled, { keyframes } from "styled-components";

const zoomIn = keyframes`
    0% {
        transform: scale(0,0);
    }
    100% {
        transform: scale(1,1);
    }
`;

const zoomOut = keyframes`
    0% {
        transform: scale(1,1);
    }
    100% {
        transform: scale(0,0);
    }
`;

const BlurOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${$props => $props.background || "rgba(0, 0, 0, .2)"};
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    animation: ${props => props.animation === "zoomIn" ? zoomIn : (props.animation === "zoomOut" ? zoomOut : "")} 0.3s ease-out forwards;
`;

export default BlurOverlay