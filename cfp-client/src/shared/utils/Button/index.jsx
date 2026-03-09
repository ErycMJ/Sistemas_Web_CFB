import PropTypes from "prop-types"
import { ButtonContainer } from "./style"

export default function Button({ onClick, text, type }) {
    return (
        <ButtonContainer onClick={onClick} type={type}>
            {text}
        </ButtonContainer>
    )
}

Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    type: PropTypes.string
}
