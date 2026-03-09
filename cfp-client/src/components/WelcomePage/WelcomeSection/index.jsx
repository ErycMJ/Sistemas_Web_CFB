import Button from "../../../shared/utils/Button"
import InternalLink from "../../../shared/utils/InternalLink"
import { ParagraphContainer } from "../../../shared/utils/Paragraph/style"
import { TitleContainer } from "../../../shared/utils/Title/style"
import { WelcomeSectionContainer } from "./style"

export default function WelcomeSection() {
    return (
        <WelcomeSectionContainer>
            <TitleContainer>
                Bem-vindo ao CFP
            </TitleContainer>

            <ParagraphContainer>
                Gerencie suas finanças sem esforço e mantenha-se no controle de suas
                despesas com nossa plataforma fácil de usar.
            </ParagraphContainer>

            <InternalLink href="/signup">
                <Button onClick={() => { }} text={"Comece Agora"} type={"greenButton"} />
            </InternalLink>
        </WelcomeSectionContainer>
    )
}
