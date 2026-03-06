import { styled } from '@stitches/react';

const ButtonContainer = styled("button", {
    backgroundColor: (props) => props.color ? props.color : "transparent",
    color: "white",
    padding: "10px",
    fontSize: "16px",
    fontWeight: 900,
    display: "block",
    textAlign: "center",
    width: "150px",
    borderRadius: "5px",
    margin: "5px",

    "&:hover": {
        backgroundColor: (props) => props.hoverColor ? props.hoverColor : "transparent",
        cursor: "pointer"
    }
})

export { ButtonContainer }