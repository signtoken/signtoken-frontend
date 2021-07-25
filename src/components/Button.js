import styled from "styled-components"

const Button = styled.button`
    background: #453630;
    border: none;
    color: white;
    font-size: 18px;
    padding: 10px;
    transition: .3s all ease-in-out;
    border: 1px solid transparent;
    display: block;
    margin: 20px auto 0px;

    &:hover {
        /* background: transparent; */
        border: 1px solid #453630;
        background-color: rgba(0, 0, 0, .2);
        backdrop-filter: blur(4px);
    }

    &:disabled {
        opacity: 0.7;
    }
`;

export default Button