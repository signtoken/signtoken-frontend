import { Container } from "react-bootstrap"
import LogoText from '../assests/img/logo-text.png'
import styled from "styled-components"

const Logo = styled.img`
    height: 100px;
    margin: 50px 0px;
`;

const ContainerCenter = styled(Container)`
    text-align: center;
`;

function Header() {
    return (
        <ContainerCenter>
            <Logo src={LogoText} alt="logo"></Logo>
        </ContainerCenter>
    )
}

export default Header