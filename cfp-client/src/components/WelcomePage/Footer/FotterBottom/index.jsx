import InternalLink from "../../../../shared/utils/InternalLink";
import { ParagraphContainer } from "../../../../shared/utils/Paragraph/style";
import { FooterBottomContainer } from "./style";

export default function FooterBottom() {
    return (
        <FooterBottomContainer>
            <ParagraphContainer>
                © 2024 Controle Financeiro. Todos os direitos reservados.
            </ParagraphContainer>
            <InternalLink href="/" text="Perguntas Frequentes" type="medium" />
        </FooterBottomContainer>
    )
}