import styled from "styled-components"

const Input = styled.input`
    width: 100%;
    background: transparent;
    border: none;
    color: white;
    border: 1px solid #be9a5c;
    border-radius: 8px;
    padding: 5px;
    text-align: center;
    font-size: 32px;
    margin: auto;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        appearance: none;
        -webkit-appearance: none;
    }

    &:focus {
        outline: none;
    }

    & span {
        opacity: 0.7;
        font-style: italic;
        font-size: 14px;
    }
`;

export default Input