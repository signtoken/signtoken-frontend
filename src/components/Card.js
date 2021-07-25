
import styled from "styled-components"

const CardWrapper = styled.div`
    background: ${props => props.background || "#9b7e4b70"};
    border-radius: 8px;
    box-shadow: ${props => props.hideBoxShadow ? "0px -32px 30px -10px rgba(0,0,0,0.19)" : "0px 32px 30px -10px rgba(0,0,0,0.19)"};
    margin-top: 20px;
`;

const CardHeader = styled.p`
    color: white;
    text-align: center;
    border-bottom: 1px dashed #453630;
    padding: 10px 0px;
    font-size: 24px;
    margin-bottom: 0px;
`;

function Card (props) {
    return (
        <CardWrapper {...props}>
            {props.header && <CardHeader>{props.header}</CardHeader>}
            {props.children}
        </CardWrapper>
    )
}

export default Card