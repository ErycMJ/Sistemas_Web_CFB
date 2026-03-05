import styled from "styled-components"
import { colors } from "../../../shared/utils/Colors"

const FooterContainer = styled.footer`
    background-color: ${colors().lightgreen};
    color: ${colors().white};
    padding: 2rem 0;
    margin-top: 2rem;

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
}`

export { FooterContainer }
