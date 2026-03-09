import InternalLink from "../../../../shared/utils/InternalLink"
import ExternalLink from "../../../../shared/utils/ExternalLink"
import { FooterHeaderContainer } from "./style"

export default function FooterHeader() {
    return (
        <FooterHeaderContainer>
            <InternalLink href="/" text="CFP" type="bold" />
            <ExternalLink href="https://taylor-teixeira.vercel.app/" text="desenvolvido por T&T" />
        </FooterHeaderContainer>
    )
}

