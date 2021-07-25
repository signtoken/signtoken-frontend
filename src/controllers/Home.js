import Header from "../components/Header";
import styled from "styled-components";
import Background from '../assests/img/background.png'
import { Container, Row, Col } from "react-bootstrap";
import CheckNameCard from "../components/CheckNameCard";
import SignNameCard from "../components/SignNameCard";
import Note from "../components/Note";
import useWallet from "../hooks/useWallet";
import TopInfo from "../components/TopInfo";

const Wrapper = styled.section`
    background: url(${Background});
    min-height: 100vh;
    background-size: cover;
    font-family: 'Open Sans', sans-serif;
    color: white;
`;

const Description = styled.p`
    color: #9b7e4b;
    text-align: center;
`;

function App() {
    const wallet = useWallet()

    return (
        <Wrapper>
            <Header />
            <Container>
                <Description>Blockchain has the ability to permanently store your name. Try sign your name now!</Description>
                <TopInfo {...wallet}/>
                <Row style={{marginTop: wallet.address ? 0 : 30}}>
                    <Col md={5} xs={12}>
                        <CheckNameCard {...wallet}></CheckNameCard>
                    </Col>
                    <Col md={7} xs={12}>
                        <SignNameCard {...wallet}></SignNameCard>
                    </Col>
                    <Col md={{span: 7, offset: 5}}>
                        <Note></Note>
                    </Col>
                </Row>
            </Container>
        </Wrapper>
    );
}

export default App;
