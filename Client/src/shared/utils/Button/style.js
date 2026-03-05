import styled from "styled-components";

const ButtonContainer = styled.button`
    background-color: ${(props) => props.color ? props.color : "transparent"};
    color: white;
    padding: 10px;
    font-size: 16px;
    font-weight: 900;
    display: block;
    text-align: center;
    width: 150px;
    border-radius: 5px;
    margin: 5px;

    &:hover {
        background-color: ${(props) => props.hoverColor ? props.hoverColor : "transparent"};
        cursor: pointer;
    }
`

export { ButtonContainer }