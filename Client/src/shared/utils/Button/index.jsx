import PropTypes from "prop-types"
import { ButtonContainer } from "./style"

export default function Button({ onClick, text, color, hoverColor }) {
    console.log("Button props:", { onClick, text, color, hoverColor })
    return (
        <ButtonContainer onClick={onClick} color={color} hoverColor={hoverColor}>
            {text}
        </ButtonContainer>
    )
}

Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    color: PropTypes.string,
    hoverColor: PropTypes.string
}